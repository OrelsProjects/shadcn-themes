"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const COMPANY_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const WEBSITE_URL = process.env.NEXT_PUBLIC_APP_URL;
const POLICY_EFFECTIVE_DATE = "16 Dec 2024";

const TermsOfServiceAndPolicy: React.FC = () => {
  const router = useRouter();
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md text-gray-800">
      <Button className="sticky top-0 mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Terms of Service and Privacy Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Terms of Service</h2>
        <p className="text-gray-700">
          Welcome to {COMPANY_NAME}! By using our service at
          <a href={WEBSITE_URL} className="text-blue-500 underline">
            {" "}
            {WEBSITE_URL}
          </a>
          , you agree to the following terms:
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>
            You may explore, preview, and copy the themes we provide solely
            through the designated "Copy" button on our website.
          </li>
          <li>
            Accessing or extracting themes or data via unauthorized methods,
            such as using APIs or automated scripts, is strictly prohibited.
          </li>
          <li>
            We reserve the right to terminate access to our service for users
            who violate these terms.
          </li>
          <li>
            All themes are provided "as-is," and {COMPANY_NAME} is not
            responsible for any misuse or unintended consequences of their use.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Privacy Policy</h2>
        <p className="text-gray-700">
          Your privacy is important to us. It is {COMPANY_NAME}'s policy to
          respect your privacy regarding any information we may collect from you
          across our website,
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
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use, or
          modification.
        </p>
      </section>

      <section className="mb-6">
        <p className="text-gray-700">
          We don’t share any personally identifying information publicly or with
          third parties, except when required to by law.
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

export default TermsOfServiceAndPolicy;
