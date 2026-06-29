import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, build an artist profile, make a purchase, or contact support. This includes:
    
    • Account information: name, email address, password, and profile details
    • Profile data: bio, location, genres, instruments, photos, and portfolio items
    • Payment information: processed securely through Stripe (we don't store card numbers)
    • Communications: messages, support requests, and feedback you send us
    • Usage data: how you interact with our platform, features you use, and content you engage with`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
    
    • Provide, maintain, and improve our platform and services
    • Process transactions and send related information
    • Send you technical notices, updates, and support messages
    • Respond to your comments, questions, and customer service requests
    • Send marketing communications (you can opt out at any time)
    • Monitor and analyze trends, usage, and activities in connection with our services
    • Personalize your experience and deliver content relevant to your interests`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:
    
    • Service providers who assist in our operations (e.g., payment processors, cloud hosting)
    • Other users when you create a public artist or venue profile (only the information you choose to make public)
    • Law enforcement or government agencies when required by law
    • Business partners in connection with services you've specifically requested
    
    Any third-party partners are contractually obligated to protect your data and use it only for the specified purpose.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures to protect your personal information:
    
    • All data transmitted between your browser and our servers is encrypted via TLS/SSL
    • Passwords are hashed using bcrypt with salt rounds
    • We store data on SOC 2 Type II compliant infrastructure
    • Regular security audits and penetration testing are performed
    • We maintain incident response procedures for potential breaches
    
    Despite our best efforts, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: '5. Cookies and Tracking',
    content: `We use cookies and similar tracking technologies to track activity and improve your experience:
    
    • Essential cookies: required for the platform to function correctly
    • Preference cookies: remember your settings and personalization choices
    • Analytics cookies: help us understand how users interact with the platform
    • Marketing cookies: deliver relevant advertisements (only with your consent)
    
    You can control cookie settings through your browser preferences. Disabling certain cookies may affect functionality.`,
  },
  {
    title: '6. Your Rights and Choices',
    content: `Depending on your location, you may have the following rights:
    
    • Access: request a copy of the personal data we hold about you
    • Correction: update or correct inaccurate personal information
    • Deletion: request that we delete your personal data
    • Portability: receive your data in a structured, machine-readable format
    • Objection: object to certain processing activities
    • Withdrawal: withdraw consent at any time where processing is based on consent
    
    To exercise these rights, contact us at privacy@chordsandcoffee.com.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal, tax, or regulatory purposes.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `ChordsAndCoffee is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will promptly delete it. If you believe we may have information from a child under 13, please contact us.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically. Your continued use of the platform after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact Us',
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at:
    
    ChordsAndCoffee Privacy Team
    Email: privacy@chordsandcoffee.com
    Address: 123 Mission Street, San Francisco, CA 94102
    
    For EU/EEA residents, you also have the right to lodge a complaint with your local data protection authority.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 bg-[hsl(220,27%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60">Last updated: June 29, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-coffee/5 border border-coffee/20 rounded-2xl p-6 mb-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              At ChordsAndCoffee, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you use our platform.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i} id={`section-${i}`}>
                <h2 className="font-display font-bold text-xl text-foreground mb-4">{section.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
                {i < sections.length - 1 && <div className="mt-10 border-b border-border" />}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-coffee text-sm font-medium hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service →
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
