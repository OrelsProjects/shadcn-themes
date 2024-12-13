import axios from "axios";

export const sendMail = async (
  to: string,
  from: string,
  subject: string,
  template: string,
  cc: string[] = [],
) => {
  const formData = new FormData();
  formData.append("from", from + " " + "<alert@mail.stripe-guard.com>");
  formData.append("to", to);
  for (const c of cc) {
    formData.append("to", c);
  }
  formData.append("subject", subject);
  formData.append("html", template);

  try {
    const response = await axios.post(
      `https://api.mailgun.net/v3/${process.env.MAILGUN_ORG}/messages`,
      formData,
      {
        auth: {
          username: "api",
          password: process.env.MAILGUN_API_KEY || "",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log("Mail sent successfully:", response.data);
  } catch (error: any) {
    throw new Error(`Error sending mail: ${error.message}`);
  }
};
