import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Music, Coffee, DollarSign, Shield, Users, Zap, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Questions', icon: Search },
  { id: 'general', label: 'General', icon: Coffee },
  { id: 'artist', label: 'For Artists', icon: Music },
  { id: 'venue', label: 'For Venues', icon: Coffee },
  { id: 'billing', label: 'Billing', icon: DollarSign },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'tech', label: 'Technical', icon: Zap },
];

const faqs = [
  { cat: 'general', q: 'What is ChordsAndCoffee?', a: 'ChordsAndCoffee is a music and café community platform where artists perform, collaborate, teach, host events, sell music, and connect with fans. We bring together musicians, venues, teachers, and music lovers in one creative ecosystem.' },
  { cat: 'general', q: 'Is ChordsAndCoffee available in my city?', a: "We're currently live in 50+ cities across 20+ countries and expanding rapidly. Sign up for free and explore events and artists near you. New cities are added every month." },
  { cat: 'artist', q: 'How do I get started as a musician?', a: "Create a free account, choose the 'Musician' role during onboarding, and build your artist profile. Add your portfolio, genres, and instruments. Then start discovering events, venues, and collaborators in your area." },
  { cat: 'artist', q: 'Can I sell my music directly on the platform?', a: 'Yes! Artist and Venue plan members can sell digital music, albums, merchandise, and event tickets directly to fans. No hidden commissions — what you earn, you keep (minus standard payment processing fees).' },
  { cat: 'artist', q: 'What is the AI Music Assistant?', a: 'Our AI assistant helps with chord progressions, lyric writing, setlist generation, music theory questions, and practice recommendations. It\'s available 24/7 and powered by cutting-edge AI models.' },
  { cat: 'artist', q: 'How do fan memberships work?', a: "You can create tiered membership plans (e.g., $5/month, $15/month) that give fans exclusive perks like early access to music, private livestreams, behind-the-scenes content, and direct messaging with you." },
  { cat: 'venue', q: 'How do I list my café as a performance venue?', a: "Sign up with the 'Café/Venue' role, complete your venue profile with photos, capacity, and performance space details, and set your availability calendar. Artists can then discover and book your space directly." },
  { cat: 'venue', q: 'How does the artist booking system work?', a: "Artists browse venue listings and submit booking requests for specific dates and time slots. You review requests, communicate through the platform, and confirm bookings. The system handles contracts and payment logistics." },
  { cat: 'billing', q: 'Is there a free trial for paid plans?', a: 'All paid plans (Artist and Venue) include a 14-day free trial. No credit card required to start. You\'ll only be charged after the trial ends if you choose to continue.' },
  { cat: 'billing', q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Cancel anytime from your Settings > Billing page. You\'ll retain access to paid features until the end of your current billing period. No cancellation fees.' },
  { cat: 'billing', q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as Apple Pay and Google Pay. Payments are processed securely through Stripe.' },
  { cat: 'privacy', q: 'Is my personal data safe?', a: 'We take data privacy seriously. Your data is encrypted in transit and at rest, stored on SOC 2 compliant infrastructure, and never sold to third parties. Read our full Privacy Policy for details.' },
  { cat: 'privacy', q: 'Can I delete my account and data?', a: "Yes. Go to Settings > Privacy & Security and click 'Delete Account'. All your data will be permanently deleted within 30 days. This action is irreversible." },
  { cat: 'tech', q: 'Is there a mobile app?', a: "Our web platform is fully responsive and works great on all mobile devices. Dedicated iOS and Android apps are in development and expected in Q3 2025. Sign up for our newsletter to be notified at launch." },
  { cat: 'tech', q: 'What browsers are supported?', a: 'ChordsAndCoffee works best on modern browsers: Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience.' },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === 'all' || f.cat === activeCategory;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 bg-[hsl(220,27%,10%)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-5xl text-white mb-4">
            How Can We <span className="text-gold">Help?</span>
          </h1>
          <p className="text-white/65 text-lg mb-8">Find answers to common questions about ChordsAndCoffee.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 text-base"
              placeholder="Search frequently asked questions..."
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  activeCategory === cat.id
                    ? 'bg-coffee text-white shadow-warm'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-coffee/40'
                )}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
                <span className="text-xs opacity-70">{cat.id === 'all' ? faqs.length : faqs.filter(f => f.cat === cat.id).length}</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">No results found.</p>
              <p className="text-sm text-muted-foreground">Try different keywords or <Link to="/contact" className="text-coffee hover:underline">contact us directly</Link>.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-warm transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-start justify-between w-full px-6 py-5 text-left gap-4"
                  >
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{faq.q}</span>
                    <ChevronDown className={cn('w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform', openFaq === i && 'rotate-180')} />
                  </button>
                  <div className={cn('overflow-hidden transition-all duration-300', openFaq === i ? 'max-h-60' : 'max-h-0')}>
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 p-8 bg-muted rounded-2xl">
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-sm mb-5">Our support team is available Monday–Friday, 9AM–6PM PST.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
