import forge from "node-forge";

/**
 * Encrypts data using the public key
 * @param data
 * @throws {Error} if the public key is not set or is invalid
 */
export function encrypt(data: string): {
  encryptedKey: string;
  iv: string;
  encryptedData: string;
} {
  const publicKeyPem = process.env.NEXT_PUBLIC_DECRYPTION_PUBLIC_KEY as string;
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  // Generate random AES key
  const aesKey = forge.random.getBytesSync(32); // 32 bytes = 256 bits

  // Encrypt the data using AES
  const iv = forge.random.getBytesSync(16); // AES initialization vector
  const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  const encryptedData = cipher.output.getBytes();

  // Encrypt the AES key using RSA
  const encryptedKey = publicKey.encrypt(aesKey, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });

  // Return encrypted key, IV, and encrypted data in Base64 format
  return {
    encryptedKey: forge.util.encode64(encryptedKey),
    iv: forge.util.encode64(iv),
    encryptedData: forge.util.encode64(encryptedData),
  };
}
/**
 * Decrypts data using the private key
 * @param data
 * @throws {Error} if the private key is not set or is invalid
 */
export function decrypt(
  encryptedKey: string,
  iv: string,
  encryptedData: string,
): string {
  const privateKeyPem = process.env
    .NEXT_PUBLIC_ENCRYPTION_PRIVATE_KEY as string;
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  // Decrypt the AES key using RSA
  const aesKey = privateKey.decrypt(
    forge.util.decode64(encryptedKey),
    "RSA-OAEP",
    {
      md: forge.md.sha256.create(),
    },
  );

  // Decrypt the data using AES
  const decipher = forge.cipher.createDecipher("AES-CBC", aesKey);
  decipher.start({ iv: forge.util.decode64(iv) });
  decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData)));
  const success = decipher.finish();

  if (!success) {
    throw new Error("Decryption failed");
  }

  return decipher.output.toString();
}
