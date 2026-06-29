import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. What Are Cookies?',
    content: `Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.
    
    Cookies set by the website owner (in this case, ChordsAndCoffee) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., payment processing and interactive audio players).`,
  },
  {
    title: '2. Why Do We Use Cookies?',
    content: `We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform. Third parties serve cookies through our website for payment processing (Stripe), analytics (Google Analytics), and security.`,
  },
  {
    title: '3. Types of Cookies We Use',
    content: `The specific types of first and third-party cookies served through our website and the purposes they perform are described below:
    
    • Essential Website Cookies: These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as accessing secure areas (e.g., logging in, retaining session info).
    • Performance and Functionality Cookies: These cookies are used to enhance the performance and functionality of our website but are non-essential to their use (e.g., remembering your theme selector or audio player settings).
    • Analytics and Customization Cookies: These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
    • Advertising Cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.`,
  },
  {
    title: '4. How Can I Control Cookies?',
    content: `You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
    
    As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.`,
  },
  {
    title: '5. Updates to This Policy',
    content: `We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.`,
  },
  {
    title: '6. More Information',
    content: `If you have any questions about our use of cookies or other technologies, please email us at privacy@chordsandcoffee.com or write to:
    
    ChordsAndCoffee
    Attn: Cookie Policy / Privacy Team
    123 Mission Street, San Francisco, CA 94102`,
  },
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-coffee/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-coffee" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">Cookie Policy</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Last updated: June 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-stone max-w-none dark:prose-invert">
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              This Cookie Policy explains how ChordsAndCoffee ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <div className="space-y-10">
              {sections.map((section, idx) => (
                <div key={idx} className="border-b border-border/60 pb-8 last:border-0 last:pb-0">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4">{section.title}</h2>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line space-y-4">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
