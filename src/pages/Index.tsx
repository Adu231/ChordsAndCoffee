import { Link } from 'react-router-dom';
import {
  Play, ArrowRight, Music, Coffee, Users, Star, Calendar, BookOpen,
  Mic2, Globe, TrendingUp, CheckCircle, ChevronDown, Quote, Zap,
  ShieldCheck, Award, Heart, MapPin, Clock, DollarSign, ChevronRight, X
} from 'lucide-react';
import heroImg from '@/assets/hero-bg.jpg';
import performanceImg from '@/assets/performance.jpg';
import dashboardImg from '@/assets/dashboard-preview.jpg';
import AnimatedCounter from '@/components/features/AnimatedCounter';
import MusicPlayer from '@/components/features/MusicPlayer';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const features = [
  { icon: Music, title: 'Music Discovery', desc: 'Explore trending artists, new releases, and curated playlists tailored to your taste.', color: 'text-amber-500' },
  { icon: Mic2, title: 'Live Performances', desc: 'Discover open mic events, book tickets, and register your own performances at local cafés.', color: 'text-coffee' },
  { icon: Coffee, title: 'Café Marketplace', desc: 'Find the perfect venue — browse café listings, check availability, and make reservations.', color: 'text-amber-700' },
  { icon: Users, title: 'Artist Collaboration', desc: 'Form bands, schedule jam sessions, share demos, and find your creative collaborators.', color: 'text-emerald-600' },
  { icon: BookOpen, title: 'Learning Academy', desc: 'Take guitar, piano, vocal, and music theory courses taught by verified professionals.', color: 'text-violet-600' },
  { icon: DollarSign, title: 'Creator Monetization', desc: 'Sell tickets, memberships, digital music, and merchandise — all in one place.', color: 'text-blue-600' },
];

const workflow = [
  { step: '01', title: 'Create Your Profile', desc: 'Build your artist identity — showcase your portfolio, genres, and instruments.' },
  { step: '02', title: 'Discover & Connect', desc: 'Find cafés, fellow musicians, and events in your city or anywhere worldwide.' },
  { step: '03', title: 'Perform & Collaborate', desc: 'Book gigs, schedule jam sessions, and collaborate on creative projects.' },
  { step: '04', title: 'Grow & Monetize', desc: 'Sell music, offer courses, earn from memberships, and track your growth analytics.' },
];

const benefits = [
  { icon: Zap, title: 'AI Music Assistant', desc: 'Get chord suggestions, lyric ideas, setlist generation, and music theory guidance.' },
  { icon: Globe, title: 'Global Community', desc: 'Connect with musicians, venues, and fans across 50+ countries.' },
  { icon: ShieldCheck, title: 'Verified Artists', desc: 'Build trust with creator verification and portfolio authentication.' },
  { icon: TrendingUp, title: 'Growth Analytics', desc: 'Understand your audience with deep engagement and revenue tracking.' },
  { icon: Award, title: 'Certification Programs', desc: 'Earn recognized credentials from accredited music education programs.' },
  { icon: Heart, title: 'Fan Memberships', desc: 'Build loyal fan bases with exclusive content, early access, and direct connections.' },
];

const testimonials = [
  {
    name: 'Maya Chen', role: 'Acoustic Guitarist, Portland', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    text: 'ChordsAndCoffee completely transformed how I find gigs. I booked 12 café performances in my first month and my follower count tripled.',
    rating: 5,
  },
  {
    name: 'James Okafor', role: 'Jazz Bassist, Chicago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    text: 'The collaboration tools are incredible. I found my current band through the musician discovery feature — we just released our first EP.',
    rating: 5,
  },
  {
    name: 'Priya Nair', role: 'Café Owner & Event Host', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
    text: "Our café's live music nights are now sold out every weekend. The event management tools saved us hours of manual work.",
    rating: 5,
  },
  {
    name: 'Luca Bianchi', role: 'Music Teacher, NYC', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    text: "I launched my online guitar course here and enrolled 340 students in 3 months. The platform's reach is unmatched.",
    rating: 5,
  },
];

const plans = [
  {
    name: 'Listener', price: { monthly: 0, annual: 0 }, desc: 'For music lovers who want to discover and attend events.',
    features: ['Discover artists & music', 'Browse café events', 'Attend 2 free events/mo', 'Join communities', 'Basic profile'],
    cta: 'Get Started Free', highlight: false,
  },
  {
    name: 'Artist', price: { monthly: 12, annual: 9 }, desc: 'For musicians and performers ready to grow.',
    features: ['Everything in Listener', 'Artist profile + portfolio', 'Book unlimited gigs', 'AI music assistant', 'Analytics dashboard', 'Fan memberships', 'Sell digital music'],
    cta: 'Start Creating', highlight: true,
  },
  {
    name: 'Venue', price: { monthly: 29, annual: 22 }, desc: 'For cafés and event venues building an audience.',
    features: ['Everything in Artist', 'Venue listing & booking', 'Event management tools', 'Artist booking system', 'Reservation management', 'Revenue analytics', 'Priority support'],
    cta: 'List Your Venue', highlight: false,
  },
];

const faqs = [
  { q: 'How do I get started as a musician?', a: "Simply create a free account, build your artist profile, and start exploring events, venues, and collaborators in your area. You can upgrade anytime to unlock the full Artist toolkit." },
  { q: 'Can I sell my music directly on the platform?', a: 'Yes! Artist and Venue plan members can sell digital music, albums, merchandise, and event tickets directly to fans without any hidden commissions.' },
  { q: 'How does the café venue booking work?', a: 'Cafés list their performance spaces with availability calendars. Musicians can browse, request bookings, and manage all communication through the platform.' },
  { q: 'Is there a mobile app?', a: "We're mobile-first! Our web platform is fully optimized for all devices. Dedicated iOS and Android apps are coming in Q3 2025." },
  { q: 'What is the AI Music Assistant?', a: 'Our AI assistant helps with chord progressions, lyric writing, setlist generation, music theory questions, and practice recommendations — powered by the latest AI models.' },
];

export default function Index() {
  const { user } = useAuth();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[hsl(220,27%,10%)]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Now live in 50+ cities worldwide
              </div>

              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Where Music
                <span className="block text-gold">Meets Coffee</span>
              </h1>

              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
                The community platform for musicians, cafés, and music lovers. Perform, collaborate, learn, and grow — all over a perfect cup.
              </p>

              <div className="flex flex-wrap gap-3 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[hsl(220,27%,12%)] font-semibold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5"
                >
                  {user ? "Go to Dashboard" : "Start for Free"} <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDemoVideo(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 glass text-white font-medium rounded-xl hover:bg-white/15 transition-all"
                >
                  <Play className="w-4 h-4" /> Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { value: '50K+', label: 'Artists' },
                  { value: '2,400+', label: 'Venues' },
                  { value: '180K+', label: 'Events' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Music Player */}
            <div className="lg:block animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="max-w-sm mx-auto lg:ml-auto">
                <MusicPlayer />
              </div>
            </div>
          </div>
        </div>

        <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors animate-float">
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* Stats Bar */}
      <section className="bg-[hsl(220,27%,12%)] py-10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 50000, suffix: '+', label: 'Active Artists' },
              { end: 2400, suffix: '+', label: 'Partner Venues' },
              { end: 180000, suffix: '+', label: 'Events Hosted' },
              { end: 98, suffix: '%', label: 'Satisfaction Rate' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold text-gold mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
              <Music className="w-4 h-4" /> Everything You Need
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              One Platform, Endless<br />
              <span className="text-coffee">Creative Possibilities</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From live performances to music education, artist collaborations to venue management — ChordsAndCoffee brings it all together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <Link to="/features" className="inline-flex items-center gap-1 text-sm text-coffee font-medium mt-4 hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/features" className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-white rounded-xl font-semibold hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5">
              View All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Product Workflow Section */}
      <section className="py-20 lg:py-28 bg-[hsl(220,27%,10%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
                <Zap className="w-4 h-4" /> How It Works
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">
                Your Creative Journey<br />
                <span className="text-gold">Starts Here</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                From building your first profile to performing at your dream venue — every step of your musical journey, streamlined.
              </p>

              <div className="space-y-6">
                {workflow.map((step, i) => (
                  <div key={step.step} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                      <span className="font-display font-bold text-gold text-sm">{step.step}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex items-center gap-2 px-6 py-3.5 mt-8 bg-gold text-[hsl(220,27%,12%)] rounded-xl font-semibold hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5"
              >
                {user ? "Go to Dashboard" : "Begin Your Journey"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-warm-lg">
                <img src={performanceImg} alt="Live performance at café" className="w-full object-cover" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Tonight's Open Mic</p>
                    <p className="text-white/60 text-xs">12 artists registered · 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
              <Award className="w-4 h-4" /> Why Choose Us
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              Built for Every<br />
              <span className="text-coffee">Music Maker</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Whether you're a bedroom musician, a café owner, or a touring artist — our tools grow with you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 bg-card rounded-2xl border border-border hover:shadow-warm hover:-translate-y-0.5 transition-all">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-coffee/10 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-coffee" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1.5">{b.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dashboard Preview Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
                <TrendingUp className="w-4 h-4" /> Artist Dashboard
              </div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-6">
                Your Creative <br />
                <span className="text-coffee">Control Center</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Manage your performances, track earnings, analyze fan engagement, and discover growth opportunities — all from one powerful dashboard.
              </p>
              <ul className="space-y-3 mb-8">
                {['Real-time audience analytics', 'Revenue tracking & payouts', 'Event performance reports', 'Fan engagement metrics', 'Streaming statistics'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4.5 h-4.5 text-coffee flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={user ? "/dashboard" : "/register"} className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-white rounded-xl font-semibold hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5">
                View Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-warm-lg border border-border">
                <img src={dashboardImg} alt="Dashboard preview" className="w-full object-cover" />
              </div>
              {/* Stat Cards */}
              <div className="absolute -top-5 -right-4 bg-card border border-border rounded-xl p-4 shadow-warm">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-semibold">+24% this month</span>
                </div>
                <div className="text-xl font-display font-bold text-foreground">$2,840</div>
                <div className="text-xs text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
              <Heart className="w-4 h-4" /> Loved by Creators
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              Stories From Our<br />
              <span className="text-coffee">Community</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl border border-border p-6 hover:shadow-warm hover:-translate-y-1 transition-all">
                <Quote className="w-8 h-8 text-gold/40 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-coffee text-sm font-semibold uppercase tracking-widest mb-4">
              <DollarSign className="w-4 h-4" /> Pricing
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              Simple, Transparent<br />
              <span className="text-coffee">Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Start free. Upgrade when you're ready to grow.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-muted rounded-xl p-1 gap-1">
              {(['monthly', 'annual'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === b ? 'bg-card text-foreground shadow-warm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {b === 'monthly' ? 'Monthly' : 'Annual'}
                  {b === 'annual' && <span className="ml-2 text-xs text-emerald-600 font-semibold">Save 25%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col transition-all ${
                  plan.highlight
                    ? 'bg-[hsl(220,27%,12%)] border-gold/50 shadow-gold relative'
                    : 'bg-card border-border hover:shadow-warm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gold text-[hsl(220,27%,12%)] text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-display font-bold text-2xl mb-1 ${plan.highlight ? 'text-white' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className={`text-sm leading-relaxed mb-4 ${plan.highlight ? 'text-white/60' : 'text-muted-foreground'}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-display font-bold ${plan.highlight ? 'text-gold' : 'text-foreground'}`}>
                      ${plan.price[billing]}
                    </span>
                    {plan.price[billing] > 0 && (
                      <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-muted-foreground'}`}>/mo</span>
                    )}
                    {plan.price[billing] === 0 && <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-muted-foreground'}`}>forever</span>}
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? 'text-white/75' : 'text-muted-foreground'}`}>
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-gold' : 'text-coffee'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={user ? "/confirm-payment" : "/register"}
                  state={user ? { artist: `ChordsAndCoffee Plan: ${plan.name}`, amount: plan.price[billing] } : undefined}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-gold text-[hsl(220,27%,12%)] hover:bg-[hsl(43,87%,55%)] shadow-gold hover:-translate-y-0.5'
                      : 'bg-muted text-foreground hover:bg-[hsl(var(--muted))] hover:shadow-warm border border-border'
                  }`}
                >
                  {user ? `Select ${plan.name} Plan` : plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. No credit card required.{' '}
            <Link to="/pricing" className="text-coffee hover:underline font-medium">Compare all features →</Link>
          </p>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-4">
              Frequently Asked<br />
              <span className="text-coffee">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about ChordsAndCoffee.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            Still have questions?{' '}
            <Link to="/contact" className="text-coffee font-semibold hover:underline">Contact our team →</Link>
          </p>
        </div>
      </section>

      {/* 9. CTA Banner Section */}
      <section className="py-20 lg:py-24 bg-[hsl(220,27%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coffee rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Join 50,000+ musicians today
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
            Ready to Tune Into<br />
            <span className="text-gold">Something Beautiful?</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create your free artist profile, discover local venues, find collaborators, and start sharing your music with the world — today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-[hsl(220,27%,12%)] font-bold rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-all hover:-translate-y-0.5 text-base"
            >
              {user ? "Go to Dashboard" : "Start for Free"} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-all text-base"
            >
              Learn More
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">Free forever plan · No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* 10. Footer is rendered from layout */}
      {/* Demo Video Modal Popup */}
      {showDemoVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl max-w-3xl w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                <Play className="w-4 h-4 text-coffee fill-coffee" />
                Chords & Coffee Platform Tour
              </h3>
              <button
                type="button"
                onClick={() => setShowDemoVideo(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-border bg-black aspect-video relative">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground leading-relaxed flex justify-between items-center">
              <span>Duration: 0:15 • Live Open Mic Café Demonstration</span>
              <button
                type="button"
                onClick={() => setShowDemoVideo(false)}
                className="px-4 py-1.5 bg-coffee text-white font-semibold rounded-lg hover:opacity-90"
              >
                Close Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
