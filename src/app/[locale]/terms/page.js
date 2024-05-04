import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import { email, pageName } from '@/data';

export default function Terms() {
  return (
    <main>
      <Navbar />

      <section className='container mx-auto px-4 my-20 md:my-24 flex flex-col gap-3'>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Terms and Conditions
        </h1>

        <div className='flex flex-col gap-4 text-secondary'>
          <p>
            Please read these Terms and Conditions carefully before using the{' '}
            {pageName} website (&quot;we,&quot; &quot;our,&quot; or &quot;{pageName}&quot;). By accessing or using our website, you agree to
            comply with these Terms and Conditions. If you do not agree with any
            of the terms below, please do not use our website.
          </p>

          <h6 className='text-black font-medium'>1. Website Usage</h6>

          <p>
            1.1. Access and Registration: To access certain features of our
            website, registration and providing personal information may be
            necessary. You are responsible for maintaining the confidentiality
            of your login information and all activities that occur in your
            account.
          </p>
          <p>
            1.2. User Content: By uploading, posting, or submitting content to
            our website, you warrant that you have the necessary rights to such
            content and grant {pageName} a non-exclusive license to use,
            modify, display, and distribute such content in connection with our
            services.
          </p>

          <h6 className='text-black font-medium'>2. User Behavior</h6>

          <p>
            2.1. Proper Use: You agree to use our website properly and in
            compliance with all applicable laws and regulations. You must not
            use our website for illegal, fraudulent, or harmful activities.
          </p>
          <p>
            2.2. Prohibitions: Using our website for any purpose that could
            damage, overload, or disrupt its operation is prohibited. The use of
            any device, software, or routine that interferes with or attempts to
            interfere with the proper functioning of the site is also
            prohibited.
          </p>

          <h6 className='text-black font-medium'>
            3. Content and Intellectual Property
          </h6>

          <p>
            3.1. Property Rights: All intellectual property rights on our
            website and its content (including text, graphics, logos, images,
            and software) are owned by {pageName} or licensed third parties.
            You agree not to copy, reproduce, modify, distribute, or otherwise
            use such content without our consent.
          </p>
          <p>
            3.2. Trademarks: All trademarks, trade names, and logos used on our
            website are the property of {pageName} or third parties. You are
            not granted any rights to use these marks without our written
            consent.
          </p>

          <h6 className='text-black font-medium'>4. Privacy Policy</h6>

          <p>
            The use of our website is subject to our Privacy Policy, which
            describes how we collect, use, and protect your personal
            information. Please read our Privacy Policy to understand how we
            handle your data.
          </p>

          <h6 className='text-black font-medium'>5. Changes to the Terms</h6>

          <p>
            {pageName} reserves the right to modify these Terms and Conditions at any
            time. Any changes will be posted on our website and will become
            effective immediately upon publication. We recommend reviewing these
            terms periodically.
          </p>

          <h6 className='text-black font-medium'>6. Termination</h6>

          <p>
            {pageName} reserves the right to suspend or terminate your access to our
            website at any time and for any reason, without prior notice.
          </p>

          <h6 className='text-black font-medium'>7. Applicable Law</h6>

          <p>
            These Terms and Conditions are governed by the laws of Mexico, and
            any dispute arising from these terms will be subject to the
            exclusive jurisdiction of the courts of Mexico.
          </p>

          <p>
            Thank you for trusting {pageName}. Your privacy is important to
            us, and we are committed to protecting it responsibly.
          </p>

          <h6 className='text-black font-medium'>8. Contact</h6>

          <p>
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at {email}.
          </p>

          <p>
            Thank you for using {pageName}. These terms and conditions are
            designed to ensure proper and fair use of our website.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
