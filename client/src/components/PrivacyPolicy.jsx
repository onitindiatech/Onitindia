import React from "react";
import SEO from "./SEO";

const PrivacyPolicy = () => {
  return (
    <section className="h-screen bg-white text-gray-800 flex flex-col justify-start pt-24 pb-16 px-6 md:px-20">
      <SEO
        title="Privacy Policy"
        description="Read OnIT India's privacy policy. We prioritize your data security and transparency."
        canonical="https://onitindia.com/privacy-policy"
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-green-600">
        Privacy Policy
      </h2>

      <div className="space-y-8 max-w-4xl mx-auto text-justify leading-relaxed">
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Data We Collect</h3>
          <p>
            Personal details (name, email, phone, address), task preferences and
            performance data, and location (for nearby task matching).
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. How We Use Data</h3>
          <p>
            To connect seekers and performers effectively, improve user
            experience, and ensure safety and fraud prevention.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Data Sharing</h3>
          <p>
            We never sell or rent your data. Limited sharing happens only with
            trusted partners like payment gateways under strict compliance.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">4. Security</h3>
          <p>
            We use SSL encryption, secure storage, and anonymization for
            sensitive data protection.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">5. User Rights</h3>
          <p>
            You can access, correct, or delete your data anytime through the app
            or by contacting support.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">6. Cookies & Tracking</h3>
          <p>
            Cookies are used to enhance experience and personalize task
            listings.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">7. Policy Updates</h3>
          <p>
            This policy may be updated periodically. Continued use of the app
            implies acceptance of any changes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
