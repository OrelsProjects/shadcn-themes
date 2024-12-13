import React from "react";

const COMPANY_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const WEBSITE_URL = process.env.NEXT_PUBLIC_APP_URL;
const POLICY_EFFECTIVE_DATE = "07 Nov 2024";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <section className="mb-6">
        <p className="text-gray-700">
          Your privacy is important to us. It is {COMPANY_NAME}&apos;s policy to
          respect your privacy regarding any information we may collect from you
          across our website,{" "}
          <a href={WEBSITE_URL} className="text-blue-500 underline">
            {WEBSITE_URL}
          </a>
          , and other sites we own and operate.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we&apos;re collecting
          it and how it will be used.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store,
          we&apos;ll protect within commercially acceptable means to prevent
          loss and theft, as well as unauthorized access, disclosure, copying,
          use, or modification.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We don&apos;t share any personally identifying information publicly or
          with third parties, except when required to by law.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through {COMPANY_NAME} and the
          services in terms of the applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR).
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
      </section>

      <footer className="text-sm text-gray-500 mt-4">
        This policy is effective as of {POLICY_EFFECTIVE_DATE}.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
