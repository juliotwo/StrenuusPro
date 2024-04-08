import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import { email, pageName } from '@/data'

export default function Policy() {
  return (
    <main>
      <Navbar />

      <section className='container mx-auto px-4 my-20 md:my-24 flex flex-col gap-3'>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Privacy Policy
        </h1>

        <div className='flex flex-col gap-4 text-secondary'>
          <p>
            At {pageName}, we take the protection of your privacy and the
            security of your personal data very seriously. This Privacy Policy
            aims to provide you with clear and transparent information about how
            we collect, use, share, and protect your personal data when you
            visit our website or use our services. Please read this policy
            carefully and review it periodically, as we may update it to reflect
            changes in our privacy practices.
          </p>

          <h6 className='text-black font-medium'>1. Information We Collect</h6>

          <p>
            1.1. Personal Information: We collect personal information that you
            provide to us directly, such as your name, email address, phone
            number, and other information necessary to provide our services,
            such as enrolling in courses or subscribing to newsletters.
          </p>
          <p>
            1.2. Usage Information: We collect information about how you use our
            website, including browsing data, pages visited, time spent on our
            site, and similar information.
          </p>
          <p>
            1.3. Device Information: We may collect information about the device
            you use to access our website, such as IP address, browser type,
            operating system, and device identification.
          </p>

          <h6 className='text-black font-medium'>2. Use of Information</h6>

          <p>We use the information we collect for the following purposes:</p>
          <p>
            2.1. Service Provision: We use your personal data to provide our
            services, such as course enrollment, payment processing, and the
            delivery of relevant content.
          </p>
          <p>
            2.2. Communication: We may use your information to send you
            communications related to our services, such as enrollment
            confirmations, updates, and newsletters.
          </p>
          <p>
            2.3. Improvement of Our Services: We use the collected information
            to analyze and enhance our services, including personalizing your
            experience on our website.
          </p>

          <h6 className='text-black font-medium'>3. Sharing Information</h6>

          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your information in the following situations:
          </p>
          <p>
            3.1. Service Providers: We work with third-party service providers
            who assist us in providing our services, such as payment processors
            and web hosting services. These providers have limited access to
            your information and use it only for agreed-upon purposes.
          </p>
          <p>
            3.2. Legal Compliance: We may disclose your information if we are
            legally obligated to do so to comply with legal requirements, court
            orders, or legal processes.
          </p>

          <h6 className='text-black font-medium'>4. Data Security</h6>

          <p>
            We take reasonable measures to protect your personal data and
            maintain its confidentiality. We use appropriate technical and
            organizational security measures to safeguard your information
            against loss, unauthorized use, or disclosure.
          </p>

          <h6 className='text-black font-medium'>5. Your Rights</h6>

          <p>
            You have rights regarding your personal data, including access,
            rectification, deletion, and objection to processing. You can
            exercise these rights by sending a written request to the address
            provided in the contact section.
          </p>

          <h6 className='text-black font-medium'>
            6. Changes to the Privacy Policy
          </h6>

          <p>
            We reserve the right to modify this Privacy Policy at any time.
            Changes will become effective as soon as they are published on our
            website. We recommend checking this policy regularly to stay
            informed about any updates.
          </p>

          <h6 className='text-black font-medium'>7. Contact</h6>

          <p>
            If you have any questions or concerns about our Privacy Policy or
            how we handle your personal data, please contact us at{' '}
            {email}.
          </p>

          <p>
            Thank you for trusting {pageName}. Your privacy is important to
            us, and we are committed to protecting it responsibly.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
