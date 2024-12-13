import { Event } from "@/models/payment";

export const welcomeTemplate = (paid: boolean, to: string) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Vote of Confidence</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333333;
            line-height: 1.6;
            padding: 0;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }
        .button-container {
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4Cea70;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
            font-weight: bold;
        }
        .footer {
            font-size: 12px;
            color: #777777;
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
        }
        .divider {
            margin-top: 30px;
            border-top: 1px solid #dddddd;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">Thank you for your vote of confidence</h1>
        
        ${
          paid
            ? `<p><strong>Payment Confirmation:</strong> Thank you for your payment! Your support means a lot, and I’m excited to have you here!</p>`
            : ""
        }

        <p>Hey, this is Orel, and I want to “officially” welcome you to my world.</p>
        
        <p>About 7 years ago I built my first ever website while I was in the army (A basic todo). And from a thing that I must do, it became my obsession.</p>
        
        <p>During this time I developed almost everything, from a website with basic HTML, CSS through a fullstack website to a Unity game and about a dozen more things in between.</p>
        
        <p>I am not going to talk about those here… those are my playground where I test new ways of thinking and find great opportunities.</p>
        
        <p>And after so many projects, I found that one of the best places to find success is SaaS businesses. They require almost 0$ and can generate TONS of value.</p>
        
        <p>My goal with this product is to help you transfer the ideas from your head to a functional website with a beautiful landing page to test your ideas.</p>
        
        <p>${
          paid
            ? `<strong>In fact, by paying up front and giving me your FULL confidence, you grabbed a spot in the TOP-SECRET list. It’s a very small group of people that will get many FREE stuff and EXTREMELY good deals in the future.</strong>`
            : `In fact, you signing up boosts my moral and will make the product come out that much faster!`
        }</p>
        
        <p>In the following weeks I’ll keep you updated about the progress and send you your landing page ASAP.</p>
        
        <p>Talk to you soon,</p>
        <p>Orel</p>

        <p><strong>P.S.</strong></p>
        ${
          paid
            ? `Your feedback or features requests are very important to me!<br/> Please do hit reply and let me know about them.`
            : `
        <p>Seems like you didn’t go for the full GitHub repository plan, and only for the landing page.<br/> I’d highly recommend you go and grab it fast (spots are limited) so you can ship in minutes and get awesome bonuses!</p>
        
        <div class="button-container">
            <a href="https://www.buildquick.app/?repository=true&to=${encodeURIComponent(
              to
            )}" class="button">Get Full Repository NOW</a>
        </div>
        `
        }
        
        <div class="divider"></div>

        <footer class="footer">
            <p>Created with ❤️ by Orel</p>
            <p>If you didn’t enjoy this email, feel free to reply and let me know why.</p>
            <p>In case you really hate emails from me, you can always <a href="%unsubscribe_url%" style="color: #4CAF50; text-decoration: none;">unsubscribe here</a>.</p>
        </footer>
    </div>
</body>
</html>
`;

export function generatePaymentProcessingIssueEmail() {
  const content = `
    <h2>Important Notice: Payment Processing Issue</h2>
    <p>Hey there!</p>
    <p>We hope this email finds you well.<br/> We wanted to inform you that we've encountered an issue while processing your recent payment.</p>
    <p>Our team is actively working on resolving this matter, and we apologize for any inconvenience this may cause. During this time, you may notice that some of our services are temporarily unavailable.</p>
    <p>Please note:</p>
    <ul>
      <li>If you haven't noticed any issues with our services, you can safely disregard this email.</li>
      <li>No additional action is required from you at this time.</li>
      <li>We will notify you once the issue has been resolved.</li>
    </ul>
    <p>We appreciate your patience and understanding as we work to rectify this situation. If you have any questions or concerns, please don't hesitate to reach out to our customer support team.</p>
    <p>Thank you for your continued trust in our services.</p>
    `;
  // <a href="https://your-support-url.com" class="button">Contact Support</a>
  return baseEmailTemplate(content);
}

export function generateWebhookFailureEmail(
  event: Event,
  eventTime: Date,
  failedWebhooks: number,
) {
  const envPath = process.env.NODE_ENV === "production" ? "" : "test/";

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webhook Failure Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
          }
          .header h1 {
            margin: 0;
            color: #4a00e0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
          }
          .content p {
            margin: 10px 0;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            text-decoration: none;
            background-color: #635bff;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
          }
          .button:hover {
            background-color: #5144d3;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Webhook Failure Alert</h1>
          </div>
          <div class="content">
            <p><strong>Event:</strong> ${event.id}</p>
            <p><strong>Occurred At:</strong> ${eventTime}</p>
            <p><strong>Failed Webhooks:</strong> ${failedWebhooks}</p>
            <p><strong>Type:</strong> ${event.type}</p>
            <p>
              The webhook for this event failed to process successfully. Please review the event details in your Stripe dashboard.
            </p>
          </div>
          <div class="button-container">
            <a
              href="https://dashboard.stripe.com/${envPath}workbench/events/${event.id}"
              class="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Event in Stripe
            </a>
          </div>
          <div class="footer">
            <p>This is an automated notification from your Stripe webhook handler.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}

export function baseEmailTemplate(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stripe Guard Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: hsl(0, 0%, 3.9%);
          background-color: hsl(0, 0%, 98%);
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: hsl(0, 0%, 100%);
          border: 1px solid hsl(0, 0%, 89.8%);
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: hsl(221.2, 83.2%, 53.3%);
          color: hsl(210, 40%, 98%);
          padding: 20px;
          text-align: center;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .content {
          padding: 20px;
        }
        .button {
          display: inline-block;
          background-color: hsl(221.2, 83.2%, 53.3%);
          color: hsl(210, 40%, 98%);
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 0.25rem;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: hsl(0, 0%, 45.1%);
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Stripe Guard</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>This is an automated message from Stripe Guard. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateInvoicePaymentFailedEmail(
  invoiceId: string,
  amount: number,
  currency: string,
) {
  const content = `
    <h2>Failed Payment</h2>
    <p>We were unable to process your payment for invoice ${invoiceId}.</p>
    <p>Amount due: ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</p>
    <p>Please update your payment method to avoid any interruption in your service.</p>
    <a href="https://dashboard.stripe.com/invoices/${invoiceId}" class="button">View Invoice</a>
  `;
  return baseEmailTemplate(content);
}

export function generateSubscriptionCanceledEmail(subscriptionId: string) {
  const content = `
    <h2>Subscription Canceled</h2>
    <p>Your subscription ${subscriptionId} has been canceled.</p>
    <p>We're sorry to see you go. If you have any feedback or questions, please don't hesitate to contact us.</p>
    <p>You can reactivate your subscription at any time from your account dashboard.</p>
    <a href="https://your-app-url.com/account" class="button">Manage Account</a>
  `;
  return baseEmailTemplate(content);
}
export function generateSubscriptionTrialEndingEmail(
  subscriptionId: string,
  trialEndDate: Date,
) {
  const content = `
    <h2>Your Trial is Ending Soon</h2>
    <p>Your trial for subscription ${subscriptionId} will end on ${trialEndDate.toLocaleDateString()}.</p>
    <p>To continue enjoying our services, please ensure you have a valid payment method on file.</p>
    <a href="https://dashboard.stripe.com/subscriptions/${subscriptionId}" class="button">Manage Subscription</a>
  `;
  return baseEmailTemplate(content);
}
