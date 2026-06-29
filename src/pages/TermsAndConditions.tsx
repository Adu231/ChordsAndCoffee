import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using ChordsAndCoffee ("the Platform," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Platform.
    
    We reserve the right to modify these terms at any time. We will notify registered users of material changes via email or platform notification. Your continued use after changes constitutes acceptance.`,
  },
  {
    title: '2. Eligibility and Account Registration',
    content: `To use ChordsAndCoffee, you must be at least 13 years of age. Users between 13 and 18 must have parental consent.
    
    When creating an account, you agree to:
    • Provide accurate, current, and complete information
    • Maintain and update your information to keep it accurate
    • Keep your password confidential and not share account access
    • Notify us immediately of any unauthorized account use
    • Accept responsibility for all activity that occurs under your account`,
  },
  {
    title: '3. Artist and Creator Accounts',
    content: `Artist and Venue accounts are subject to additional terms:
    
    • Verification: We may require identity or credential verification for Artist and Venue badges
    • Content ownership: You retain ownership of all original content you upload
    • Content license: By uploading content, you grant ChordsAndCoffee a non-exclusive license to display, distribute, and promote your content on the Platform
    • Revenue sharing: Platform transaction fees apply to all paid content (outlined in your account settings)
    • Prohibited content: Uploading content you don't own or have rights to is strictly prohibited`,
  },
  {
    title: '4. Prohibited Conduct',
    content: `You agree not to:
    
    • Violate any applicable law, regulation, or third-party rights
    • Upload, post, or transmit content that is illegal, harmful, or infringes intellectual property rights
    • Impersonate any person or entity or misrepresent your affiliation
    • Harvest or collect user information without explicit consent
    • Use automated tools to scrape, crawl, or interact with the Platform
    • Attempt to gain unauthorized access to systems or user accounts
    • Engage in harassment, bullying, or abusive behavior toward other users
    • Spam, solicit, or advertise to other users without authorization`,
  },
  {
    title: '5. Content and Intellectual Property',
    content: `ChordsAndCoffee respects intellectual property rights:
    
    • Platform content (logos, design, code) is owned by ChordsAndCoffee and protected by copyright
    • User-generated content remains the property of its creator
    • You grant us a license to use, display, and distribute your public content on the Platform
    • You represent that you have all necessary rights to content you upload
    • We will respond to valid DMCA takedown notices within 48 hours
    • Repeat infringers will have their accounts terminated`,
  },
  {
    title: '6. Payments and Subscriptions',
    content: `For paid plans and in-platform transactions:
    
    • All prices are in USD unless otherwise specified
    • Subscription fees are billed in advance on a monthly or annual basis
    • Paid plans include a 14-day free trial; cancellation before trial end incurs no charge
    • Refunds are available within 7 days of any charge if requested via support
    • Revenue from ticket sales, music sales, and memberships is subject to a platform processing fee (displayed at checkout)
    • Payouts to creators are processed on a monthly basis to verified payment accounts`,
  },
  {
    title: '7. Termination',
    content: `We reserve the right to suspend or terminate your account for:
    
    • Violation of these Terms of Service or our Community Guidelines
    • Fraudulent, abusive, or illegal activity
    • Repeated intellectual property violations
    • Non-payment of fees owed
    
    You may terminate your account at any time via Settings > Privacy & Security. Upon termination, your right to use the Platform ceases immediately.`,
  },
  {
    title: '8. Disclaimer of Warranties',
    content: `The Platform is provided "as is" and "as available" without warranties of any kind, express or implied. ChordsAndCoffee does not warrant that the Platform will be uninterrupted, error-free, secure, or free of harmful components.
    
    We do not warrant the accuracy, completeness, or usefulness of any content on the Platform, including user-generated content, artist information, or event listings.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `To the maximum extent permitted by law, ChordsAndCoffee shall not be liable for:
    
    • Indirect, incidental, special, consequential, or punitive damages
    • Loss of profits, data, revenue, goodwill, or other intangible losses
    • Damages resulting from unauthorized access to your account
    • Any conduct or content of third parties on the Platform
    
    Our total liability for any claim related to the Platform shall not exceed the amount you paid us in the 12 months prior to the claim.`,
  },
  {
    title: '10. Governing Law and Disputes',
    content: `These Terms are governed by the laws of the State of California, United States, without regard to conflict of law provisions.
    
    Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration administered by JAMS in San Francisco, CA, except that either party may seek injunctive relief in court for intellectual property violations.
    
    If you are a consumer in the EU/EEA, you may also refer disputes to your local consumer protection authority or use the EU Online Dispute Resolution platform.`,
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-16 bg-[hsl(220,27%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Terms of Service</h1>
          <p className="text-white/60">Last updated: June 29, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-coffee/5 border border-coffee/20 rounded-2xl p-6 mb-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please read these Terms of Service carefully before using ChordsAndCoffee. These terms constitute a legally binding agreement between you and ChordsAndCoffee, Inc. By using our platform, you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
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
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy →
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
