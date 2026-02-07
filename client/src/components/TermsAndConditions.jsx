import React from "react";
import SEO from "./SEO";

const TermsAndConditions = () => {
  return (
    <section className="h-screen bg-white text-gray-800 flex flex-col justify-start pt-24 pb-16 px-6 md:px-20">
      <SEO
        title="Terms & Conditions"
        description="Review the Terms and Conditions for using OnIT India's platform and services."
        canonical="https://onitindia.com/terms-and-conditions"
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-green-600">
        Terms & Conditions
      </h2>

      <div className="space-y-8 max-w-4xl mx-auto text-justify leading-relaxed">
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
          <p>
            Welcome to <strong>OnIt</strong>, a hyperlocal task-based platform
            connecting individuals who need help with those ready to assist —
            from errands to tutoring and deliveries. By using OnIt, users agree
            to follow our legal terms and community standards.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. User Eligibility</h3>
          <p>
            You must be at least 18 years old to use the platform. Users are
            responsible for the accuracy of information they provide while
            registering as a task seeker or task performer.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. User Accounts</h3>
          <p>
            All users must register with valid details. Task performers must
            provide accurate skill and task preferences. Users are responsible
            for maintaining the confidentiality of their login credentials.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">4. Listing and Payments</h3>
          <p>
            Task seekers list their tasks and set budgets. Task performers
            complete tasks and receive <strong>100% of the listed amount</strong>,
            with no platform commission. OnIt may enable secure third-party
            payment gateways for transactions.
          </p>
        </div>




      </div>
    </section>
  );
};

export default TermsAndConditions;
