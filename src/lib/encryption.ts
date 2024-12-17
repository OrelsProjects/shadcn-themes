import forge from "node-forge";

/**
 * Encrypts data using the public key
 * @param data
 * @throws {Error} if the public key is not set or is invalid
 */
export function encrypt(data: string) {
  const publicKeyPem = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedData = publicKey.encrypt(data, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });

  return forge.util.encode64(encryptedData);
}

/**
 * Decrypts data using the private key
 * @param data
 * @throws {Error} if the private key is not set or is invalid
 */
export function decrypt(data: string) {
  const privateKeyPem = process.env.DECRYPTION_KEY as string;
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encryptedBytes = forge.util.decode64(data);
  const decryptedData = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });
  return decryptedData;
}
