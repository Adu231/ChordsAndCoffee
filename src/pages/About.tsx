import { Link } from 'react-router-dom';
import { Coffee, Music, Users, Heart, Award, Globe, ArrowRight, Target, Lightbulb, Zap } from 'lucide-react';
import AnimatedCounter from '@/components/features/AnimatedCounter';

const team = [
  { name: 'Sofia Mendez', role: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', bio: 'Former music producer and community builder with 10+ years in the creative industry.' },
  { name: 'Marcus Lee', role: 'Co-Founder & CTO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', bio: 'Full-stack engineer passionate about building tools that empower artists.' },
  { name: 'Priya Sharma', role: 'Head of Community', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', bio: 'Music therapist turned community architect. Connects artists across 40+ cities.' },
  { name: 'James Osei', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', bio: 'Product designer who has shipped features used by millions of music creators.' },
];

const values = [
  { icon: Heart, title: 'Community First', desc: 'Every feature we build starts with listening to musicians, venues, and fans.' },
  { icon: Lightbulb, title: 'Creative Freedom', desc: 'We believe every artist deserves a platform that celebrates their unique voice.' },
  { icon: Globe, title: 'Inclusive Access', desc: 'Music has no borders. Our platform is designed for artists everywhere.' },
  { icon: Zap, title: 'Relentless Innovation', desc: 'We combine AI, community, and music to create something truly transformative.' },
];

const milestones = [
  { year: '2021', title: 'ChordsAndCoffee Founded', desc: 'Started as a weekend project at a local coffee shop in San Francisco.' },
  { year: '2022', title: 'First 1,000 Artists', desc: 'Launched beta and welcomed our first thousand musicians and café partners.' },
  { year: '2023', title: 'Series A Funding', desc: 'Raised $4.2M to build the AI Music Assistant and expand internationally.' },
  { year: '2024', title: 'Global Expansion', desc: 'Reached 50+ cities across 20 countries with 50,000+ registered artists.' },
];

export default function About() {
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
            <Coffee className="w-3.5 h-3.5 text-gold" /> Our Story
          </div>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-white mb-6">
            Born in a Coffee Shop,<br />
            <span className="text-gold">Built for Every Stage</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl mx-auto">
            We're a team of musicians, engineers, and music lovers who believe the best creative moments happen when artists and communities come together — over good music and great coffee.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 50000, suffix: '+', label: 'Active Artists' },
              { end: 2400, suffix: '+', label: 'Partner Venues' },
              { end: 20, suffix: '+', label: 'Countries' },
              { end: 180000, suffix: '+', label: 'Events Hosted' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-display font-bold text-coffee mb-1">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
                <Target className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-6">
                Giving Every Artist a<br />
                <span className="text-coffee">Stage to Shine</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We built ChordsAndCoffee because talented musicians deserve more than algorithmic obscurity. Real art deserves real community — the kind that gathers at cafés, cheers at open mics, and supports artists not just with streams but with presence.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our platform bridges the gap between digital discovery and authentic human connection, giving artists the tools to perform, collaborate, learn, and earn — all in one place.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3.5 bg-coffee text-white rounded-xl font-semibold hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5">
                Join Our Community <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(v => (
                <div key={v.title} className="bg-muted rounded-2xl p-5 hover:shadow-warm hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-coffee/10 flex items-center justify-center mb-3">
                    <v.icon className="w-5 h-5 text-coffee" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">{v.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">From a café napkin sketch to a global community platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex gap-6 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2 lg:px-10">
                    <div className={`bg-card rounded-2xl border border-border p-5 shadow-warm ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                      <span className="inline-block px-3 py-1 bg-coffee/10 text-coffee text-sm font-bold rounded-lg mb-2">{m.year}</span>
                      <h4 className="font-display font-semibold text-foreground mb-1">{m.title}</h4>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-coffee border-4 border-background top-6" />
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              Meet the <span className="text-coffee">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg">Musicians, engineers, and community builders united by a love of music.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(t => (
              <div key={t.name} className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-warm hover:-translate-y-1 transition-all">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 border-2 border-border" />
                <h4 className="font-display font-semibold text-foreground mb-0.5">{t.name}</h4>
                <p className="text-xs text-coffee font-medium mb-3">{t.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[hsl(220,27%,10%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">
            Be Part of the <span className="text-gold">Story</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">Join 50,000+ artists and music lovers building something beautiful together.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[hsl(220,27%,12%)] font-bold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5">
            Start for Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
