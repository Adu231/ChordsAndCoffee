import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, ArrowRight, Zap, Globe, Shield, Users, BarChart3, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const plans = [
  {
    name: 'Listener',
    price: { monthly: 0, annual: 0 },
    desc: 'For music lovers who want to discover and attend events.',
    cta: 'Get Started Free',
    highlight: false,
    features: [
      { text: 'Discover artists & music', included: true },
      { text: 'Browse café events', included: true },
      { text: 'Attend 2 free events/month', included: true },
      { text: 'Join 3 communities', included: true },
      { text: 'Basic profile page', included: true },
      { text: 'Artist profile & portfolio', included: false },
      { text: 'Book gigs & performances', included: false },
      { text: 'AI music assistant', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Sell music & tickets', included: false },
      { text: 'Fan memberships', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Artist',
    price: { monthly: 12, annual: 9 },
    desc: 'For musicians and performers ready to grow their career.',
    cta: 'Start Creating',
    highlight: true,
    features: [
      { text: 'Everything in Listener', included: true },
      { text: 'Artist profile + portfolio', included: true },
      { text: 'Book unlimited gigs', included: true },
      { text: 'AI music assistant', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Sell music & event tickets', included: true },
      { text: 'Fan memberships', included: true },
      { text: 'Unlimited communities', included: true },
      { text: 'Merchandise store', included: false },
      { text: 'Venue management', included: false },
      { text: 'Advanced event tools', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Venue',
    price: { monthly: 29, annual: 22 },
    desc: 'For cafés and event venues building a live music audience.',
    cta: 'List Your Venue',
    highlight: false,
    features: [
      { text: 'Everything in Artist', included: true },
      { text: 'Venue listing & booking page', included: true },
      { text: 'Event management dashboard', included: true },
      { text: 'Artist booking system', included: true },
      { text: 'Reservation management', included: true },
      { text: 'Revenue & ticket analytics', included: true },
      { text: 'Merchandise store', included: true },
      { text: 'Unlimited staff accounts', included: true },
      { text: 'White-label event pages', included: true },
      { text: 'Custom domain support', included: true },
      { text: 'API access', included: true },
      { text: 'Priority 24/7 support', included: true },
    ],
  },
];

const comparisons = [
  { feature: 'Artist profile & portfolio', listener: false, artist: true, venue: true },
  { feature: 'Performance bookings', listener: false, artist: 'Unlimited', venue: 'Unlimited' },
  { feature: 'Open mic registrations', listener: '2/month', artist: 'Unlimited', venue: 'Unlimited' },
  { feature: 'AI music assistant', listener: false, artist: true, venue: true },
  { feature: 'Analytics dashboard', listener: 'Basic', artist: 'Full', venue: 'Advanced' },
  { feature: 'Music sales', listener: false, artist: true, venue: true },
  { feature: 'Fan memberships', listener: false, artist: true, venue: true },
  { feature: 'Community access', listener: '3 groups', artist: 'Unlimited', venue: 'Unlimited' },
  { feature: 'Event ticket sales', listener: false, artist: true, venue: true },
  { feature: 'Venue listing', listener: false, artist: false, venue: true },
  { feature: 'Reservation management', listener: false, artist: false, venue: true },
  { feature: 'API access', listener: false, artist: false, venue: true },
  { feature: 'Priority support', listener: false, artist: false, venue: true },
];

export default function Pricing() {
  const { user } = useAuth();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
            <DollarSign className="w-4 h-4" /> Simple Pricing
          </div>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-6">
            Start Free,<br />
            <span className="text-coffee">Grow Without Limits</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            No hidden fees. No complicated tiers. Choose the plan that fits where you are in your musical journey.
          </p>
          <div className="inline-flex items-center bg-muted rounded-xl p-1 gap-1">
            {(['monthly', 'annual'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${billing === b ? 'bg-card text-foreground shadow-warm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual billing'}
                {b === 'annual' && <span className="ml-2 text-xs text-emerald-600 font-semibold">Save 25%</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl border flex flex-col relative ${plan.highlight ? 'bg-[hsl(220,27%,12%)] border-gold/50 shadow-gold' : 'bg-card border-border shadow-warm'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gold text-[hsl(220,27%,12%)] text-xs font-bold rounded-full uppercase tracking-wider shadow-gold">Most Popular</span>
                  </div>
                )}
                <div className="p-8 pb-6 border-b border-border/40">
                  <h3 className={`font-display font-bold text-2xl mb-2 ${plan.highlight ? 'text-white' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-5 ${plan.highlight ? 'text-white/60' : 'text-muted-foreground'}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-display font-bold ${plan.highlight ? 'text-gold' : 'text-foreground'}`}>
                      ${plan.price[billing]}
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-muted-foreground'}`}>
                      {plan.price[billing] > 0 ? '/month' : '/ forever'}
                    </span>
                  </div>
                  {billing === 'annual' && plan.price.annual > 0 && (
                    <p className={`text-xs mt-1 ${plan.highlight ? 'text-white/50' : 'text-muted-foreground'}`}>
                      Billed ${plan.price.annual * 12}/year
                    </p>
                  )}
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${f.included ? (plan.highlight ? 'text-gold' : 'text-coffee') : 'text-muted-foreground/30'}`} />
                        <span className={f.included ? (plan.highlight ? 'text-white/80' : 'text-muted-foreground') : 'text-muted-foreground/40 line-through'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    to={user ? "/confirm-payment" : "/register"}
                    state={user ? { artist: `ChordsAndCoffee Plan: ${plan.name}`, amount: plan.price[billing] } : undefined}
                    className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      plan.highlight
                        ? 'bg-gold text-[hsl(220,27%,12%)] hover:bg-[hsl(43,87%,55%)] shadow-gold hover:-translate-y-0.5'
                        : 'bg-coffee text-white hover:bg-[hsl(25,40%,26%)] shadow-warm hover:-translate-y-0.5'
                    }`}
                  >
                    {user ? `Select ${plan.name} Plan` : plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            All paid plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground text-center mb-10">
            Full Feature <span className="text-coffee">Comparison</span>
          </h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-warm">
            <div className="grid grid-cols-4 border-b border-border">
              <div className="p-4 text-sm font-semibold text-muted-foreground">Feature</div>
              {['Listener', 'Artist', 'Venue'].map(p => (
                <div key={p} className="p-4 text-center">
                  <span className="font-display font-bold text-foreground">{p}</span>
                </div>
              ))}
            </div>
            {comparisons.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/30'}`}>
                <div className="p-4 text-sm text-foreground">{row.feature}</div>
                {[row.listener, row.artist, row.venue].map((v, j) => (
                  <div key={j} className="p-4 text-center">
                    {typeof v === 'boolean' ? (
                      v ? <CheckCircle className="w-4 h-4 text-coffee mx-auto" /> : <span className="text-muted-foreground/30 text-lg">—</span>
                    ) : (
                      <span className="text-xs font-medium text-coffee">{v}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-10">Pricing Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time. You\'ll retain access until the end of your billing period.' },
              { q: 'Is there a free trial for paid plans?', a: 'All paid plans include a 14-day free trial. No credit card required to start.' },
              { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your settings page.' },
              { q: 'Do you offer refunds?', a: 'We offer a full refund within 7 days of purchase if you\'re not satisfied. Contact support@chordsandcoffee.com.' },
            ].map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5">
                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[hsl(220,27%,10%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">
            Start Your Free Account Today
          </h2>
          <p className="text-white/60 mb-8 text-lg">Join thousands of artists already growing on ChordsAndCoffee.</p>
          <Link to={user ? "/dashboard" : "/register"} className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[hsl(220,27%,12%)] font-bold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5">
            {user ? "Go to Dashboard" : "Get Started Free"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
