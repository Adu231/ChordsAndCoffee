import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Tag, ArrowRight, ChevronRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const posts = [
  {
    id: 1, category: 'Artist Tips', tag: 'Performance',
    title: '10 Ways to Book More Café Gigs This Season',
    excerpt: 'Discover proven strategies for connecting with café owners, crafting compelling pitches, and building a sustainable live performance calendar.',
    author: 'Maya Chen', authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 28, 2026', readTime: '5 min read', featured: true,
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=350&fit=crop',
  },
  {
    id: 2, category: 'Music Tech', tag: 'AI',
    title: 'How AI is Changing the Way Musicians Write Songs',
    excerpt: 'From chord generators to lyric assistants, AI tools are becoming indispensable creative collaborators for modern musicians.',
    author: 'Marcus Lee', authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 22, 2026', readTime: '7 min read', featured: false,
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=240&fit=crop',
  },
  {
    id: 3, category: 'Community', tag: 'Events',
    title: 'Open Mic Culture: Why Cafés Are the New Music Venues',
    excerpt: 'Exploring the resurgence of intimate café performances and how they\'re reshaping how local music scenes discover new talent.',
    author: 'Priya Sharma', authorImg: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 18, 2026', readTime: '4 min read', featured: false,
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=240&fit=crop',
  },
  {
    id: 4, category: 'Education', tag: 'Learning',
    title: 'The Beginner\'s Guide to Music Theory for Guitarists',
    excerpt: 'Everything you need to understand scales, chord construction, and harmony — even if you\'ve never taken a music class before.',
    author: 'James Osei', authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 14, 2026', readTime: '9 min read', featured: false,
    img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=240&fit=crop',
  },
  {
    id: 5, category: 'Monetization', tag: 'Revenue',
    title: 'Building a Fan Membership That Actually Earns',
    excerpt: 'A step-by-step guide to creating compelling membership tiers, pricing your fanbase access, and delivering consistent value to your most loyal supporters.',
    author: 'Sofia Mendez', authorImg: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 10, 2026', readTime: '6 min read', featured: false,
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=240&fit=crop',
  },
  {
    id: 6, category: 'Collaboration', tag: 'Community',
    title: 'How to Find the Perfect Musical Collaborator',
    excerpt: 'Whether you\'re forming a band or looking for a producer, here\'s how to identify compatible collaborators and build productive creative partnerships.',
    author: 'Maya Chen', authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    date: 'Jun 5, 2026', readTime: '5 min read', featured: false,
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=240&fit=crop',
  },
];

const ARTICLE_BODY: Record<number, string[]> = {
  1: [
    "Booking café gigs is one of the most effective ways for independent artists to build a local fanbase, test new material, and earn steady performance income. However, cafés operate differently than traditional music venues.",
    "First, customize your pitch. Café owners are busy running a business; they want to know that you are professional, reliable, and will bring a pleasant vibe to their establishment. Send a short, personalized email with links to 2-3 live performance videos rather than studio files.",
    "Second, respect the volume limit. Cafés are social hubs where people read, study, and converse. Acoustic sets with low-profile amplifiers or completely unplugged performances are highly preferred.",
    "Lastly, build a consistent schedule. Performing at the same café on a recurring basis (e.g., the first Thursday of every month) helps build a loyal audience that knows exactly when to expect you."
  ],
  2: [
    "Artificial intelligence is no longer just a futuristic concept; it is actively reshaping the songwriting process for creative artists around the globe.",
    "Modern tools like chord progression generators, melody suggestion engines, and lyric brainstorming assistants are helping songwriters overcome writer's block and explore new musical directions.",
    "AI is best viewed as a collaborator, not a replacement. By feeding a generator a simple prompt or mood, you can receive hundreds of variations that spark new human creativity.",
    "As we move forward, the most successful creators will be those who learn to harness these technical tools to augment their unique artistic voice."
  ],
  3: [
    "Open mic events have long been a staple of local music scenes, but recently, independent cafés have taken over as the primary venues for these creative gatherings.",
    "Unlike traditional bar venues, cafés offer a warm, sober, and community-focused atmosphere where the music is the central focus, rather than background noise.",
    "This intimate environment encourages experimental singer-songwriters to debut raw material and receive real-time, constructive reactions from listeners.",
    "For communities looking to foster artistic collaboration, starting a weekly café open mic is the single best way to bring local musicians together."
  ],
  4: [
    "Music theory can seem intimidating with all its sheet music and classical terminology, but for guitarists, understanding a few basic concepts can unlock the fretboard completely.",
    "Start with the Major Scale. Almost all harmony in western music is derived from it. Understanding the intervals (whole steps and half steps) is key to chord construction.",
    "Next, learn how chords are built. A standard triad consists of the root, third, and fifth notes of a scale. By knowing where these intervals lie on your fretboard, you can build any chord anywhere on the neck.",
    "Practicing simple harmonic analysis of your favorite songs will help you write better progressions and improvise solos with absolute confidence."
  ],
  5: [
    "Monetizing an independent music career is tough, but a direct fan membership program offers recurring monthly revenue that keeps you sustainable.",
    "To succeed, keep your tiers simple. Offer high-value, exclusive rewards like behind-the-scenes demos, early access to tickets, or monthly Q&As.",
    "Price your membership access reasonably. A $5/month tier is highly accessible and can add up quickly with just a few dozen supporters.",
    "Consistency is the key to retention. Keep your community engaged with regular posts, updates, and expressions of gratitude for their support."
  ],
  6: [
    "Fostering collaboration with other musicians is one of the quickest ways to expand your creative horizons and cross-pollinate fanbases.",
    "Look for collaborators who complement your skill set. If you are a strong lyricist but struggle with production, team up with an electronic beatmaker.",
    "Establish clear boundaries and expectations early. Agree on songwriting splits, session times, and credit before starting work.",
    "Most importantly, stay open-minded. The magic of collaboration lies in the unexpected ideas that arise when two creative minds meet."
  ]
};

const allCategories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const featured = posts.find(p => p.featured);
  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && !p.featured;
  });

  // If user selected a post, render the full article reader view
  if (selectedPost) {
    const paragraphs = ARTICLE_BODY[selectedPost.id] || ["Article content coming soon..."];
    return (
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb & Back */}
          <button
            onClick={() => { setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-coffee hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>

          {/* Category Badge & Clock */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-coffee/10 text-coffee text-xs font-semibold rounded-full">{selectedPost.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{selectedPost.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
            {selectedPost.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 border-b border-border mb-8">
            <img src={selectedPost.authorImg} alt={selectedPost.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{selectedPost.author}</p>
              <p className="text-xs text-muted-foreground">Published on {selectedPost.date}</p>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-8 border border-border shadow-warm">
            <img src={selectedPost.img} alt={selectedPost.title} className="w-full h-auto object-cover max-h-[400px]" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-sm text-foreground/90 leading-relaxed font-sans">
            {paragraphs.map((p, i) => (
              <p key={i} className="first-letter:text-3xl first-letter:font-bold first-letter:text-coffee first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                {i === 0 ? p : p.replace(/^[^a-zA-Z]*/, '')}
              </p>
            ))}
          </div>

          {/* Back button at footer */}
          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <button
              onClick={() => { setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 border border-border text-xs font-semibold rounded-xl text-foreground hover:bg-muted transition-all"
            >
              Close Article
            </button>
            <span className="text-xs text-muted-foreground">Thank you for reading ChordsAndCoffee!</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-16 bg-[hsl(220,27%,10%)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-5xl text-white mb-4">
            Music, <span className="text-gold">Stories & Ideas</span>
          </h1>
          <p className="text-white/65 text-lg mb-8">Tips, tutorials, and community stories from the ChordsAndCoffee team.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
              placeholder="Search articles..."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featured && !search && activeCategory === 'All' && (
            <div className="mb-14">
              <p className="text-xs font-semibold text-coffee uppercase tracking-widest mb-5">Featured Article</p>
              <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl border border-border overflow-hidden shadow-warm-lg hover:shadow-gold/20 transition-all hover:-translate-y-1">
                <div className="aspect-video lg:aspect-auto">
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-coffee/10 text-coffee text-xs font-semibold rounded-full">{featured.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4 leading-tight">{featured.title}</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={featured.authorImg} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{featured.author}</p>
                        <p className="text-xs text-muted-foreground">{featured.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setSelectedPost(featured); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-1.5 text-coffee text-sm font-semibold hover:gap-2.5 transition-all cursor-pointer"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-coffee text-white shadow-warm' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-coffee/40'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <article
                  key={post.id}
                  onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-warm hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-coffee/10 text-coffee text-xs font-semibold rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 leading-snug group-hover:text-coffee transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2.5 pt-4 border-t border-border">
                      <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-coffee transition-colors" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-[hsl(220,27%,12%)] rounded-2xl p-8 lg:p-10 text-center">
            <h3 className="font-display font-bold text-2xl text-white mb-3">Never Miss an Article</h3>
            <p className="text-white/60 text-sm mb-6">Get the latest music tips, platform updates, and community stories delivered to your inbox.</p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold/60" />
              <button type="submit" className="px-5 py-3 bg-gold text-[hsl(220,27%,12%)] font-semibold text-sm rounded-xl hover:bg-[hsl(43,87%,55%)] shadow-gold transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
