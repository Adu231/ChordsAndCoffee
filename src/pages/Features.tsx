import { Link } from 'react-router-dom';
import {
  Music, Mic2, Coffee, Users, BookOpen, DollarSign, Zap, BarChart3,
  Globe, Shield, Star, Play, Calendar, MessageSquare, ShoppingBag,
  ArrowRight, CheckCircle, ChevronRight
} from 'lucide-react';

const featureGroups = [
  {
    id: 'discovery',
    icon: Music,
    title: 'Music Discovery',
    subtitle: 'Find Your Next Favorite Artist',
    color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600',
    desc: 'Explore artists, genres, trending tracks, and curated playlists with AI-powered recommendations tailored to your taste.',
    features: ['Artist directory with advanced search', 'Genre-based browsing', 'Trending music & charts', 'AI-powered recommendations', 'Playlist creation & sharing', 'Local artist discovery'],
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=300&fit=crop',
  },
  {
    id: 'performance',
    icon: Mic2,
    title: 'Live Performances',
    subtitle: 'Book, Manage & Attend Events',
    color: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600',
    desc: 'Full-featured event management for open mics, live performances, and café sessions — from booking to post-show analytics.',
    features: ['Open mic registration', 'Live event scheduling', 'Artist booking system', 'Performance calendar', 'Ticket sales & QR check-in', 'Venue management tools'],
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
  },
  {
    id: 'ai',
    icon: Zap,
    title: 'AI Music Assistant',
    subtitle: 'Your Creative Companion',
    color: 'bg-violet-50 dark:bg-violet-950/30 text-violet-600',
    desc: 'Intelligent tools that assist with composition, theory, and practice — available 24/7 whenever creative inspiration strikes.',
    features: ['Chord progression generator', 'Lyric writing assistance', 'Music theory explanations', 'Practice recommendations', 'AI setlist generator', 'Songwriting collaboration AI'],
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=300&fit=crop',
  },
  {
    id: 'academy',
    icon: BookOpen,
    title: 'Music Learning Academy',
    subtitle: 'Level Up Your Skills',
    color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600',
    desc: 'Structured courses, live workshops, and certification programs taught by verified music professionals.',
    features: ['Guitar, piano & vocal courses', 'Music theory fundamentals', 'Live interactive workshops', 'Certification programs', 'Progress tracking', 'Practice schedules'],
    img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&h=300&fit=crop',
  },
  {
    id: 'venue',
    icon: Coffee,
    title: 'Café & Venue Marketplace',
    subtitle: 'Connect Artists With Spaces',
    color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700',
    desc: 'A dedicated marketplace matching musicians with performance-ready venues — from cozy cafés to concert halls.',
    features: ['Verified venue listings', 'Real-time availability', 'Direct booking system', 'Café reviews & ratings', 'Event hosting tools', 'Reservation management'],
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop',
  },
  {
    id: 'monetization',
    icon: DollarSign,
    title: 'Creator Monetization',
    subtitle: 'Turn Passion Into Income',
    color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600',
    desc: 'Multiple revenue streams designed specifically for musicians — from ticket sales to fan subscriptions and digital downloads.',
    features: ['Ticket & event sales', 'Fan membership tiers', 'Digital music sales', 'Merchandise store', 'Live streaming tips', 'Sponsorship opportunities'],
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-[hsl(220,27%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-coffee rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <Star className="w-3.5 h-3.5 text-gold" /> Everything You Need to Create & Grow
          </div>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-white mb-6">
            Every Feature Built for<br />
            <span className="text-gold">Music Makers</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            From live performances to AI composition assistance, venue booking to fan monetization — ChordsAndCoffee gives you a complete creative ecosystem.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[hsl(220,27%,12%)] font-bold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Feature Groups */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {featureGroups.map((group, i) => (
            <div
              key={group.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold mb-4 ${group.color}`}>
                  <group.icon className="w-4 h-4" />
                  {group.subtitle}
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-5">{group.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{group.desc}</p>
                <ul className="space-y-3 mb-8">
                  {group.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-coffee flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center gap-2 text-coffee font-semibold hover:gap-3 transition-all">
                  Start using {group.title} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-warm-lg border border-border">
                  <img src={group.img} alt={group.title} className="w-full object-cover h-64 lg:h-80" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional features grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              And Much <span className="text-coffee">More</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Users, title: 'Collaboration Network', desc: 'Find bandmates, co-writers, and creative partners.' },
              { icon: BarChart3, title: 'Deep Analytics', desc: 'Understand your audience with detailed metrics.' },
              { icon: ShoppingBag, title: 'Merch Marketplace', desc: 'Sell physical & digital goods to your fans.' },
              { icon: MessageSquare, title: 'Community Forums', desc: 'Engage in genre-focused discussion communities.' },
              { icon: Globe, title: 'Global Discovery', desc: 'Reach music lovers in 50+ countries.' },
              { icon: Shield, title: 'Creator Protection', desc: 'Verified profiles and content ownership tools.' },
              { icon: Calendar, title: 'Event Calendar', desc: 'Plan your performance schedule with ease.' },
              { icon: Play, title: 'Live Streaming', desc: 'Broadcast performances to fans worldwide.' },
            ].map(f => (
              <div key={f.title} className="bg-card rounded-2xl border border-border p-5 hover:shadow-warm hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-coffee/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-coffee" />
                </div>
                <h4 className="font-semibold text-foreground mb-1.5">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[hsl(220,27%,10%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">
            Ready to Access All Features?
          </h2>
          <p className="text-white/60 mb-8 text-lg">Start free. No credit card required. Upgrade anytime.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[hsl(220,27%,12%)] font-bold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5">
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
