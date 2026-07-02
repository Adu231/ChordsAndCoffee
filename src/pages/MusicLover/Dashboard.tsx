import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Search, Headphones, BookOpen, Calendar, Users, Heart,
  DollarSign, Send, X, ArrowLeft, ShieldCheck, CreditCard, Lock, Play, Pause, Radio, Flame, Music
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Search, label: 'Discover Artists', id: 'discover' },
  { icon: Headphones, label: 'Discover Music', id: 'discover-music' },
  { icon: BookOpen, label: 'Learn Music', id: 'learn' },
  { icon: Calendar, label: 'Attend Events', id: 'events' },
  { icon: Users, label: 'Join Communities', id: 'community' },
  { icon: Heart, label: 'Support Creators', id: 'support' },
];

export default function MusicLoverDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ----------------------------------------------------
  // MUSIC LOVER STATES
  // ----------------------------------------------------
  const [followedArtists, setFollowedArtists] = useState<string[]>(['Alex Rivera']);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['Acoustic Fans']);
  const [tipsSent, setTipsSent] = useState<{ artist: string; amount: number }[]>([]);
  const [customTipAmount, setCustomTipAmount] = useState('10');
  const [selectedTipArtist, setSelectedTipArtist] = useState('Alex Rivera');
  const [artistSearchQuery, setArtistSearchQuery] = useState('');
  const [joinedCourses, setJoinedCourses] = useState<number[]>([1]);
  const [joinedWorkshops, setJoinedWorkshops] = useState<number[]>([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [viewingCourseDetails, setViewingCourseDetails] = useState<any | null>(null);

  // Discover Music States
  const [musicSearchQuery, setMusicSearchQuery] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState('All');
  const [nowPlaying, setNowPlaying] = useState<null | { id: number; title: string; artist: string; genre: string; duration: string; cover: string }>(null);
  const [likedTracks, setLikedTracks] = useState<number[]>([2, 5]);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Event Booking & Details States
  const [bookingEvent, setBookingEvent] = useState<{ id: number; title: string; venue: string; date: string; time: string; price: string; desc: string; address: string; lineup: string } | null>(null);
  const [viewingEvent, setViewingEvent] = useState<{ id: number; title: string; venue: string; date: string; time: string; price: string; desc: string; address: string; lineup: string } | null>(null);
  const [ticketName, setTicketName] = useState(user?.name || '');
  const [ticketEmail, setTicketEmail] = useState(user?.email || '');
  const [ticketQty, setTicketQty] = useState('1');
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'Dave', text: "Loved Alex's performance last week! Anyone going to the next one?", community: 'Acoustic Fans' },
    { id: 2, author: 'Clara', text: 'The Grind Cafe has the best acoustics in town.', community: 'Acoustic Fans' },
  ]);
  const [newPostText, setNewPostText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('Acoustic Fans');
  const [joiningCommunity, setJoiningCommunity] = useState<{ name: string; members: string; desc: string; rules: string } | null>(null);

  // Academic mock databases
  const [teacherCourses, setTeacherCourses] = useState([
    { id: 1, title: 'Acoustic Guitar 101', level: 'Beginner', students: 12, price: '$49' },
    { id: 2, title: 'Piano Improvisation Basics', level: 'Intermediate', students: 8, price: '$79' },
  ]);
  const [teacherWorkshops, setTeacherWorkshops] = useState([
    { id: 1, title: 'Jazz Chords Mastery', date: 'Jul 12', seatsLeft: 5, price: '$15' },
    { id: 2, title: 'Folk Songwriting Tips', date: 'Jul 28', seatsLeft: 12, price: '$20' },
  ]);

  // Listen to redirect state from payment verification page
  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.activeTab === 'events' && state.bookedEventId) {
        setActiveTab('events');
        if (!registeredEvents.includes(state.bookedEventId)) {
          setRegisteredEvents(prev => [...prev, state.bookedEventId]);
        }
        toast.success(`Reserved ${state.ticketQty || 1} ticket(s) for "${state.title}" successfully! 🎟️`);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, registeredEvents]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Music Lover"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Followed Artists', value: followedArtists.length, change: '', icon: Heart, color: 'text-rose-500' },
              { label: 'Events Attending', value: registeredEvents.length, change: '', icon: Calendar, color: 'text-violet-500' },
              { label: 'Communities Joined', value: joinedCommunities.length, change: '', icon: Users, color: 'text-blue-500' },
              { label: 'Total Tips Sent', value: `$${tipsSent.reduce((sum, tip) => sum + tip.amount, 0)}`, change: '', icon: DollarSign, color: 'text-emerald-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-warm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Flow Card */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Your Experience Flow</h3>
              <div className="flex flex-col gap-5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
                {[
                  { step: '1', title: 'Register', desc: 'Create your account & set preferences' },
                  { step: '2', title: 'Discover Artists', desc: 'Browse trending music and follow profiles' },
                  { step: '3', title: 'Attend Events', desc: 'Reserve seats at local acoustic and gig venues' },
                  { step: '4', title: 'Join Communities', desc: 'Engage in active discussions in fan clubs' },
                  { step: '5', title: 'Support Creators', desc: 'Send tips and subscribe to support your favorites' },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 relative items-start">
                    <span className="w-6 h-6 rounded-full bg-coffee text-white text-xs font-bold flex items-center justify-center relative z-10 flex-shrink-0 shadow-sm">{item.step}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discover Spotlight */}
            <div className="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Trending Artist Spotlight</h3>
                <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl mb-4 border border-border">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Alex Rivera</p>
                    <p className="text-xs text-muted-foreground">Acoustic, Indie Folk</p>
                  </div>
                  <button
                    onClick={() => {
                      if (followedArtists.includes('Alex Rivera')) {
                        setFollowedArtists(followedArtists.filter(a => a !== 'Alex Rivera'));
                        toast.info('Unfollowed Alex Rivera');
                      } else {
                        setFollowedArtists([...followedArtists, 'Alex Rivera']);
                        toast.success('Followed Alex Rivera! 🎵');
                      }
                    }}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-coffee text-white text-xs font-semibold rounded-lg hover:opacity-90"
                  >
                    {followedArtists.includes('Alex Rivera') ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Recent Tips Sent</h4>
                {tipsSent.length === 0 ? (
                  <p className="text-xs text-muted-foreground">You haven't tipped any artists yet. Support them under the Tip tab!</p>
                ) : (
                  <div className="space-y-2">
                    {tipsSent.map((tip, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-muted/30 p-2 rounded-lg border border-border">
                        <span> Sent coffee to <strong>{tip.artist}</strong></span>
                        <strong className="text-emerald-600 font-semibold">{`$${tip.amount}`}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="bg-card rounded-2xl border border-border p-5 text-left animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-semibold text-foreground">Discover Local Artists</h3>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name or genre..."
                value={artistSearchQuery}
                onChange={(e) => setArtistSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl text-xs focus:outline-none focus:border-coffee/50"
              />
            </div>
          </div>

          {/* Grid */}
          {(() => {
            const allArtists = [
              { name: 'Alex Rivera', genre: 'Acoustic / Folk', followers: '1,247', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
              { name: 'Lana Vibe', genre: 'Ambient Synth', followers: '890', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
              { name: 'Marcus Chen', genre: 'Jazz Piano', followers: '2.1K', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
              { name: 'Clara Woods', genre: 'Indie Pop', followers: '940', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
              { name: 'Dave Groove', genre: 'Funk Bass', followers: '1.5K', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
              { name: 'Sarah Synth', genre: 'Techno / Lo-Fi', followers: '3K', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' }
            ];
            
            const filtered = allArtists.filter(artist => 
              artist.name.toLowerCase().includes(artistSearchQuery.toLowerCase()) ||
              artist.genre.toLowerCase().includes(artistSearchQuery.toLowerCase())
            );

            if (filtered.length === 0) {
              return (
                <div className="text-center py-10">
                  <p className="text-sm text-muted-foreground">No artists found matching "{artistSearchQuery}"</p>
                </div>
              );
            }

            return (
              <div className="grid gap-4 md:grid-cols-3">
                {filtered.map(artist => (
                  <div key={artist.name} className="border border-border p-4 rounded-xl flex flex-col justify-between items-center text-center bg-muted/20 hover:shadow-warm hover:-translate-y-0.5 transition-all">
                    <img src={artist.img} className="w-16 h-16 rounded-full object-cover border-2 border-coffee/30 mb-3" />
                    <h4 className="font-semibold text-sm text-foreground">{artist.name}</h4>
                    <p className="text-xs text-muted-foreground mb-4">{artist.genre} • {artist.followers} fans</p>
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          if (followedArtists.includes(artist.name)) {
                            setFollowedArtists(followedArtists.filter(a => a !== artist.name));
                            toast.info(`Unfollowed ${artist.name}`);
                          } else {
                            setFollowedArtists([...followedArtists, artist.name]);
                            toast.success(`Followed ${artist.name}! 🎵`);
                          }
                        }}
                        className={cn(
                          "w-full py-1.5 text-xs font-semibold rounded-lg transition-colors",
                          followedArtists.includes(artist.name) ? "bg-muted text-muted-foreground" : "bg-coffee text-white hover:opacity-90"
                        )}
                      >
                        {followedArtists.includes(artist.name) ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {activeTab === 'discover-music' && (() => {
        const allTracks = [
          { id: 1,  title: 'Café Mornings',       artist: 'Alex Rivera',  genre: 'Acoustic',   duration: '3:42', plays: '12.4K', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop', trending: true  },
          { id: 2,  title: 'Neon Drift',          artist: 'Lana Vibe',    genre: 'Synth',      duration: '4:08', plays: '8.9K',  cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop', trending: true  },
          { id: 3,  title: 'Blue Groove',         artist: 'Marcus Chen',  genre: 'Jazz',       duration: '5:15', plays: '21K',   cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=80&h=80&fit=crop', trending: false },
          { id: 4,  title: 'Golden Hours',        artist: 'Alex Rivera',  genre: 'Acoustic',   duration: '3:55', plays: '9.2K',  cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop', trending: false },
          { id: 5,  title: 'City Rain',           artist: 'Clara Woods',  genre: 'Indie Pop',  duration: '3:28', plays: '6.1K',  cover: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=80&h=80&fit=crop', trending: true  },
          { id: 6,  title: 'Slap Bass 101',       artist: 'Dave Groove',  genre: 'Funk',       duration: '4:33', plays: '4.7K',  cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop', trending: false },
          { id: 7,  title: 'Lo-Fi Sunday',        artist: 'Sarah Synth',  genre: 'Lo-Fi',      duration: '2:58', plays: '31K',   cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop', trending: true  },
          { id: 8,  title: 'Midnight Jazz',       artist: 'Marcus Chen',  genre: 'Jazz',       duration: '6:02', plays: '7.8K',  cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=80&h=80&fit=crop', trending: false },
          { id: 9,  title: 'Petal Storm',         artist: 'Clara Woods',  genre: 'Indie Pop',  duration: '3:11', plays: '5.4K',  cover: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=80&h=80&fit=crop', trending: false },
          { id: 10, title: 'Signal Pulse',        artist: 'Lana Vibe',    genre: 'Synth',      duration: '4:50', plays: '10.2K', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop', trending: true  },
          { id: 11, title: 'Acoustic Sunrise',    artist: 'Alex Rivera',  genre: 'Acoustic',   duration: '4:20', plays: '15.3K', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop', trending: false },
          { id: 12, title: 'Funky Chicken',       artist: 'Dave Groove',  genre: 'Funk',       duration: '3:47', plays: '3.2K',  cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop', trending: false },
        ];

        const genres = ['All', 'Acoustic', 'Jazz', 'Synth', 'Indie Pop', 'Funk', 'Lo-Fi'];

        const filtered = allTracks.filter(t => {
          const matchGenre = selectedGenreFilter === 'All' || t.genre === selectedGenreFilter;
          const q = musicSearchQuery.toLowerCase();
          const matchSearch = t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.genre.toLowerCase().includes(q);
          return matchGenre && matchSearch;
        });

        const trending = allTracks.filter(t => t.trending);

        const handlePlay = (track: typeof allTracks[0]) => {
          if (playingId === track.id) {
            setPlayingId(null);
            setNowPlaying(null);
          } else {
            setPlayingId(track.id);
            setNowPlaying(track);
            toast.success(`Now playing: ${track.title} by ${track.artist} 🎵`);
          }
        };

        const handleLike = (id: number, title: string) => {
          if (likedTracks.includes(id)) {
            setLikedTracks(likedTracks.filter(l => l !== id));
            toast.info(`Removed "${title}" from your likes.`);
          } else {
            setLikedTracks([...likedTracks, id]);
            toast.success(`Liked "${title}"! ❤️`);
          }
        };

        return (
          <div className="space-y-6 text-left animate-in fade-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-br from-[hsl(220,27%,13%)] to-[hsl(25,35%,20%)] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-coffee rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-5 h-5 text-gold" />
                    <h3 className="font-display font-bold text-xl">Discover Music</h3>
                  </div>
                  <p className="text-xs text-white/60">Stream tracks from independent artists on ChordsAndCoffee</p>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                  <Radio className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-xs font-medium">{allTracks.length} tracks available</span>
                </div>
              </div>
            </div>

            {/* Search + Genre Filters */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search songs, artists, genres..."
                    value={musicSearchQuery}
                    onChange={e => setMusicSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl text-xs focus:outline-none focus:border-coffee/50"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {genres.map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenreFilter(g)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-[10px] font-semibold transition-colors',
                        selectedGenreFilter === g
                          ? 'bg-coffee text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending row */}
              {!musicSearchQuery && selectedGenreFilter === 'All' && (
                <div className="mb-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wide">Trending Now</span>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {trending.map(track => (
                      <div
                        key={track.id}
                        className="flex-shrink-0 w-36 bg-muted/40 border border-border rounded-xl p-3 cursor-pointer hover:border-coffee/50 hover:shadow-warm transition-all group"
                        onClick={() => handlePlay(track)}
                      >
                        <div className="relative mb-2">
                          <img src={track.cover} alt={track.title} className="w-full h-24 object-cover rounded-lg" />
                          <div className="absolute inset-0 rounded-lg bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {playingId === track.id
                              ? <Pause className="w-7 h-7 text-white" />
                              : <Play className="w-7 h-7 text-white" fill="white" />
                            }
                          </div>
                          {playingId === track.id && (
                            <div className="absolute top-1.5 right-1.5 flex gap-0.5 items-end h-4">
                              {[3,5,4,6,3].map((h,i) => (
                                <div key={i} className="w-0.5 bg-coffee rounded-full animate-bounce" style={{ height: `${h * 2}px`, animationDelay: `${i * 0.1}s` }} />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] font-semibold text-foreground truncate">{track.title}</p>
                        <p className="text-[9px] text-muted-foreground truncate">{track.artist}</p>
                        <p className="text-[9px] text-coffee font-medium mt-0.5">{track.plays} plays</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Track List */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Music className="w-4 h-4 text-coffee" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wide">
                    {musicSearchQuery || selectedGenreFilter !== 'All' ? `Results (${filtered.length})` : 'All Tracks'}
                  </span>
                </div>

                {filtered.length === 0 ? (
                  <div className="text-center py-10">
                    <Headphones className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No tracks found for "{musicSearchQuery}"</p>
                    <button onClick={() => { setMusicSearchQuery(''); setSelectedGenreFilter('All'); }} className="mt-2 text-xs text-coffee hover:underline">
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filtered.map((track, idx) => (
                      <div
                        key={track.id}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl border transition-all group cursor-pointer',
                          playingId === track.id
                            ? 'bg-coffee/10 border-coffee/40 shadow-warm'
                            : 'border-border hover:bg-muted/40 hover:border-coffee/20'
                        )}
                      >
                        {/* Track number */}
                        <div className="w-7 text-center flex-shrink-0">
                          {playingId === track.id ? (
                            <div className="flex gap-0.5 items-end justify-center h-4">
                              {[3,5,4].map((h,i) => (
                                <div key={i} className="w-0.5 bg-coffee rounded-full animate-bounce" style={{ height: `${h * 2}px`, animationDelay: `${i * 0.12}s` }} />
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-muted-foreground group-hover:hidden">{idx + 1}</span>
                          )}
                        </div>

                        {/* Cover + play on hover */}
                        <div className="relative flex-shrink-0" onClick={() => handlePlay(track)}>
                          <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="absolute inset-0 rounded-lg bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {playingId === track.id
                              ? <Pause className="w-4 h-4 text-white" />
                              : <Play className="w-4 h-4 text-white" fill="white" />
                            }
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0" onClick={() => handlePlay(track)}>
                          <p className={cn('text-xs font-semibold truncate', playingId === track.id ? 'text-coffee' : 'text-foreground')}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
                        </div>

                        {/* Genre */}
                        <span className="hidden sm:inline-flex px-2 py-0.5 bg-muted text-muted-foreground text-[9px] font-semibold rounded-full flex-shrink-0">
                          {track.genre}
                        </span>

                        {/* Plays */}
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 w-12 text-right">{track.plays}</span>

                        {/* Duration */}
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 w-8 text-right">{track.duration}</span>

                        {/* Like button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleLike(track.id, track.title); }}
                          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <Heart
                            className={cn('w-4 h-4 transition-colors', likedTracks.includes(track.id) ? 'text-rose-500 fill-rose-500' : 'text-muted-foreground')}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Liked Tracks Summary */}
            {likedTracks.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-xs font-bold text-foreground">Your Liked Tracks ({likedTracks.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTracks.filter(t => likedTracks.includes(t.id)).map(t => (
                    <div key={t.id} className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-1.5 text-xs">
                      <img src={t.cover} className="w-5 h-5 rounded object-cover" />
                      <span className="font-medium text-foreground">{t.title}</span>
                      <span className="text-muted-foreground">— {t.artist}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Now Playing Bar */}
            {nowPlaying && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl bg-[hsl(220,27%,12%)] border border-white/10 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-4 text-white">
                <img src={nowPlaying.cover} alt={nowPlaying.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{nowPlaying.title}</p>
                  <p className="text-[10px] text-white/50 truncate">{nowPlaying.artist} • {nowPlaying.genre}</p>
                </div>
                <div className="flex gap-0.5 items-end h-5 flex-shrink-0">
                  {[4,7,5,8,6,4,7].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-coffee rounded-full animate-bounce"
                      style={{ height: `${h * 2}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-white/40 flex-shrink-0">{nowPlaying.duration}</span>
                <button
                  onClick={() => { setPlayingId(null); setNowPlaying(null); }}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setPlayingId(null); setNowPlaying(null); }}
                  className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        );
      })()}

      {activeTab === 'learn' && (
        <div className="space-y-6 text-left max-w-4xl mx-auto animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-coffee" />
                Music Academy
              </h3>
              <p className="text-xs text-muted-foreground">Search independent courses and live session workshops to master new instruments.</p>
            </div>
            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses or level..."
                value={courseSearchQuery}
                onChange={(e) => setCourseSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:border-coffee/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Courses */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h4 className="font-display font-semibold text-base text-foreground">Available Courses</h4>
              <div className="space-y-3.5">
                {teacherCourses
                  .filter(course =>
                    course.title.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
                    course.level.toLowerCase().includes(courseSearchQuery.toLowerCase())
                  )
                  .map(course => {
                    const isEnrolled = joinedCourses.includes(course.id);
                    return (
                      <div key={course.id} className="p-4 border border-border bg-muted/10 hover:bg-muted/20 rounded-xl transition-all flex justify-between items-center text-xs gap-3">
                        <div className="space-y-1 text-left">
                          <p className="font-semibold text-foreground text-sm">{course.title}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Level: <strong className="text-foreground">{course.level}</strong> • Price: <strong className="text-coffee">{course.price}</strong> • Enrolled: {course.students}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingCourseDetails({
                              id: course.id,
                              title: course.title,
                              level: course.level,
                              price: course.price,
                              instructor: 'Sarah Jenkins (M.Mus)',
                              schedule: 'Tuesdays & Thursdays • 6:00 PM - 7:30 PM EST',
                              duration: '10 Weeks (30 Total Hours)',
                              syllabus: 'Complete acoustic fundamentals, chord configurations, rhythm coordination exercises, and classical repertoire playthroughs.',
                              isWorkshop: false
                            })}
                            className="px-2.5 py-1.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px] whitespace-nowrap"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              if (isEnrolled) {
                                toast.info('You are already enrolled in this course.');
                                return;
                              }
                              setJoinedCourses([...joinedCourses, course.id]);
                              setTeacherCourses(teacherCourses.map(c => c.id === course.id ? { ...c, students: c.students + 1 } : c));
                              toast.success(`Successfully enrolled in "${course.title}"! `);
                            }}
                            className={cn(
                              "px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors",
                              isEnrolled ? "bg-muted text-muted-foreground" : "bg-coffee text-white hover:opacity-90"
                            )}
                          >
                            {isEnrolled ? 'Enrolled' : 'Join Course'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Workshops */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h4 className="font-display font-semibold text-base text-foreground">Live Masterclass Workshops</h4>
              <div className="space-y-3.5">
                {teacherWorkshops
                  .filter(ws =>
                    ws.title.toLowerCase().includes(courseSearchQuery.toLowerCase())
                  )
                  .map(ws => {
                    const isRegistered = joinedWorkshops.includes(ws.id);
                    return (
                      <div key={ws.id} className="p-4 border border-border bg-muted/10 hover:bg-muted/20 rounded-xl transition-all flex justify-between items-center text-xs gap-3">
                        <div className="space-y-1 text-left">
                          <p className="font-semibold text-foreground text-sm">{ws.title}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Date: <strong className="text-foreground">{ws.date}</strong> • Price: <strong className="text-coffee">{ws.price}</strong> • Seats Left: {ws.seatsLeft}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewingCourseDetails({
                              id: ws.id,
                              title: ws.title,
                              level: 'All Levels Welcome',
                              price: ws.price,
                              instructor: 'Sarah Jenkins (M.Mus)',
                              schedule: `Date: ${ws.date} • 7:00 PM EST`,
                              duration: '2 Hours Live Webinar',
                              syllabus: 'Live presentation, interactive chord progression demonstrations, styling techniques, and student Q&A.',
                              isWorkshop: true,
                              seatsLeft: ws.seatsLeft
                            })}
                            className="px-2.5 py-1.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px] whitespace-nowrap"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              if (isRegistered) {
                                toast.info('You are already registered for this session.');
                                return;
                              }
                              if (ws.seatsLeft <= 0) {
                                toast.error('This session is sold out.');
                                return;
                              }
                              setJoinedWorkshops([...joinedWorkshops, ws.id]);
                              setTeacherWorkshops(teacherWorkshops.map(w => w.id === ws.id ? { ...w, seatsLeft: w.seatsLeft - 1 } : w));
                              toast.success(`Successfully registered for "${ws.title}"! `);
                            }}
                            className={cn(
                              "px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors",
                              isRegistered ? "bg-muted text-muted-foreground" : "bg-coffee text-white hover:opacity-90"
                            )}
                          >
                            {isRegistered ? 'Registered' : 'Join Session'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Upcoming Local Events</h3>
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  title: 'Open Mic Night',
                  venue: 'The Grind Café',
                  date: 'Jul 05',
                  time: '8:00 PM - 11:00 PM',
                  price: 'Free',
                  desc: 'Join us for our weekly open mic night! Both experienced performers and beginners are welcome. Sign-up sheet opens at 7:30 PM. Café serves special pour-overs all night.',
                  address: '123 Brew St, Austin, TX',
                  lineup: 'Local community sign-ups, hosted by Alex Rivera.'
                },
                {
                  id: 2,
                  title: 'Acoustic Set Live',
                  venue: 'Brew & Strum',
                  date: 'Jul 12',
                  time: '7:30 PM - 10:00 PM',
                  price: '$10',
                  desc: 'An intimate evening of acoustic tunes featuring local folk songwriters. Tickets include a free espresso beverage of your choice. Seating is first-come, first-served.',
                  address: '456 Chord Ave, Austin, TX',
                  lineup: 'Alex Rivera, Lana Vibe, and special guests.'
                },
                {
                  id: 3,
                  title: 'Jazz Evening Special',
                  venue: 'Notes & Beans',
                  date: 'Jul 19',
                  time: '6:30 PM - 9:30 PM',
                  price: '$15',
                  desc: 'Experience premium jazz trios in a cozy lounge atmosphere. Tapas and signature espresso cocktails will be available for purchase. Reservation highly recommended.',
                  address: '789 Rhythm Blvd, Austin, TX',
                  lineup: 'Marcus Chen Jazz Trio.'
                },
              ].map(event => (
                <div key={event.id} className="flex flex-wrap items-center justify-between gap-4 p-4 border border-border rounded-xl bg-muted/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-coffee/10 flex flex-col items-center justify-center font-bold text-coffee">
                      <span className="text-[10px] leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-sm leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.venue} • {event.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingEvent(event)}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    >
                      View Details
                    </button>
                    {registeredEvents.includes(event.id) ? (
                      <button
                        onClick={() => {
                          setRegisteredEvents(registeredEvents.filter(id => id !== event.id));
                          toast.info(`Booking cancelled for ${event.title}`);
                        }}
                        className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                      >
                        Attending
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setTicketName(user.name);
                          setTicketEmail(user.email);
                          setTicketQty('1');
                          setBookingEvent(event);
                        }}
                        className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-coffee text-white hover:opacity-90 transition-colors"
                      >
                        Reserve Ticket
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Card */}
          {bookingEvent && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-semibold text-lg text-foreground"> Reserve Tickets for {bookingEvent.title}</h4>
                <button onClick={() => setBookingEvent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              {(() => {
                const priceVal = bookingEvent.price === 'Free' ? 0 : parseFloat(bookingEvent.price.replace('$', ''));
                const qty = parseInt(ticketQty, 10) || 1;
                const totalPrice = priceVal * qty;
                return (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!ticketName.trim() || !ticketEmail.trim()) {
                        toast.error('Name and Email are required.');
                        return;
                      }
                      setBookingEvent(null);
                      navigate('/confirm-payment', {
                        state: {
                          isBooking: true,
                          eventId: bookingEvent.id,
                          ticketQty: ticketQty,
                          title: bookingEvent.title,
                          amount: totalPrice,
                          artist: bookingEvent.venue
                        }
                      });
                    }}
                    className="space-y-4"
                  >
                    <div className="p-3 bg-muted/30 border border-border rounded-xl mb-4 text-xs flex justify-between items-center">
                      <div>
                        <span className="block text-[10px] text-muted-foreground uppercase font-bold">Ticket Price</span>
                        <span className="text-foreground font-semibold">{bookingEvent.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-muted-foreground uppercase font-bold">Subtotal ({qty} ticket(s))</span>
                        <span className="text-coffee font-bold text-sm">
                          {bookingEvent.price === 'Free' ? 'Free' : `$${totalPrice.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={ticketName}
                          onChange={e => setTicketName(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={ticketEmail}
                          onChange={e => setTicketEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Number of Tickets</label>
                      <select
                        value={ticketQty}
                        onChange={e => setTicketQty(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      >
                        <option value="1">1 Ticket</option>
                        <option value="2">2 Tickets</option>
                        <option value="3">3 Tickets</option>
                        <option value="4">4 Tickets</option>
                        <option value="5">5 Tickets</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2.5 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90">
                        Confirm & Pay {bookingEvent.price === 'Free' ? 'Free' : `$${totalPrice.toFixed(2)}`}
                      </button>
                      <button type="button" onClick={() => setBookingEvent(null)} className="px-5 py-2.5 border border-border text-xs rounded-xl text-muted-foreground hover:bg-muted">
                        Cancel
                      </button>
                    </div>
                  </form>
                );
              })()}
            </div>
          )}

          {/* Details Card */}
          {viewingEvent && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-semibold text-lg text-foreground"> Event Details: {viewingEvent.title}</h4>
                <button onClick={() => setViewingEvent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <p className="text-muted-foreground leading-relaxed">{viewingEvent.desc}</p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <strong className="text-foreground"> Venue & Address:</strong>
                    <p className="text-muted-foreground mt-0.5">{viewingEvent.venue} ({viewingEvent.address})</p>
                  </div>
                  <div>
                    <strong className="text-foreground"> Timing & Cost:</strong>
                    <p className="text-muted-foreground mt-0.5">{viewingEvent.date} · {viewingEvent.time} · {viewingEvent.price}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <strong className="text-foreground"> Lineup:</strong>
                  <p className="text-muted-foreground mt-0.5">{viewingEvent.lineup}</p>
                </div>
                <button onClick={() => setViewingEvent(null)} className="mt-4 px-4 py-2 border border-border text-foreground hover:bg-muted rounded-xl transition-all">
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Club Selector */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Fan Communities</h3>
              <div className="space-y-2">
                {[
                  {
                    name: 'Acoustic Fans',
                    members: '1.2K members',
                    desc: 'The official group for acoustic, unplugged, and indie folk lovers. Share your favorite tracks, discuss local open mic events, and talk about instruments.',
                    rules: 'Be respectful, stay on topic (acoustic music), and no self-promotion spam outside the weekly promo thread.'
                  },
                  {
                    name: 'Jazz Lounge',
                    members: '840 members',
                    desc: 'A sophisticated gathering place for jazz fusion, bebop, and classic swing enthusiasts. Share vinyl recommendations and local jazz café gigs.',
                    rules: 'Encourage constructive musical debate. Respect copyright and only link official streaming sources.'
                  },
                  {
                    name: 'Singer-Songwriters',
                    members: '2.1K members',
                    desc: 'A creative workspace and feedback circle for active writers. Post lyrics, share demo recordings, and collaborate on acoustic compositions.',
                    rules: 'Provide feedback on at least one other member\'s work for every demo you post. Keep critiques supportive and constructive.'
                  }
                ].map(club => (
                  <div
                    key={club.name}
                    onClick={() => setSelectedCommunity(club.name)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer",
                      selectedCommunity === club.name ? "border-coffee bg-coffee/5 text-coffee" : "border-border hover:bg-muted/50 text-foreground"
                    )}
                  >
                    <span>💬 {club.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setJoiningCommunity(club);
                      }}
                      className={cn(
                        "px-2.5 py-1 text-[9px] rounded-full font-bold transition-all border",
                        joinedCommunities.includes(club.name)
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                          : "bg-coffee text-white border-coffee hover:opacity-90"
                      )}
                    >
                      {joinedCommunities.includes(club.name) ? 'Joined' : 'Join'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Board */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 flex flex-col h-[400px]">
              <h3 className="font-semibold text-foreground mb-3"> {selectedCommunity} Chat</h3>
              <div className="flex-1 overflow-y-auto border border-border rounded-xl p-3 bg-muted/20 space-y-3 mb-3">
                {communityPosts
                  .filter(p => p.community === selectedCommunity)
                  .map(post => (
                    <div key={post.id} className="text-xs bg-card p-2.5 rounded-lg border border-border/80 shadow-sm">
                      <span className="font-semibold text-coffee block mb-0.5">@{post.author}</span>
                      <p className="text-foreground">{post.text}</p>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPostText}
                  onChange={e => setNewPostText(e.target.value)}
                  placeholder={`Post to #${selectedCommunity}...`}
                  className="flex-1 px-3 py-2 border border-border rounded-xl bg-card text-xs focus:outline-none focus:ring-1 focus:ring-coffee"
                />
                <button
                  onClick={() => {
                    if (!newPostText.trim()) return;
                    setCommunityPosts([...communityPosts, { id: Date.now(), author: user.name.split(' ')[0], text: newPostText, community: selectedCommunity }]);
                    setNewPostText('');
                    toast.success('Posted message to community feed!');
                  }}
                  className="px-3 py-2 bg-coffee text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center gap-1"
                >
                  Send <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Community Join Detail Modal */}
          {joiningCommunity && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-semibold text-lg text-foreground"> Community Hub: {joiningCommunity.name}</h4>
                <button onClick={() => setJoiningCommunity(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="px-2.5 py-0.5 bg-coffee/10 text-coffee rounded-full font-bold text-[10px]">{joiningCommunity.members}</span>
                </div>
                <div>
                  <strong className="text-foreground">About Community:</strong>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{joiningCommunity.desc}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl border border-border">
                  <strong className="text-foreground block mb-1">Community Guidelines & Rules:</strong>
                  <p className="text-muted-foreground leading-relaxed">{joiningCommunity.rules}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  {joinedCommunities.includes(joiningCommunity.name) ? (
                    <>
                      <button
                        onClick={() => {
                          setJoinedCommunities(joinedCommunities.filter(c => c !== joiningCommunity.name));
                          setJoiningCommunity(null);
                          toast.info(`Left community: ${joiningCommunity.name}`);
                        }}
                        className="px-4 py-2.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors"
                      >
                        Leave Community
                      </button>
                      <button
                        type="button"
                        onClick={() => setJoiningCommunity(null)}
                        className="px-4 py-2.5 border border-border text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setJoinedCommunities([...joinedCommunities, joiningCommunity.name]);
                          setJoiningCommunity(null);
                          toast.success(`Welcome to the ${joiningCommunity.name} community! `);
                        }}
                        className="px-4 py-2.5 bg-coffee text-white font-semibold rounded-xl hover:opacity-90 transition-colors"
                      >
                        Join Community
                      </button>
                      <button
                        type="button"
                        onClick={() => setJoiningCommunity(null)}
                        className="px-4 py-2.5 border border-border text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'support' && (
        <div className="bg-card rounded-2xl border border-border p-6 max-w-lg mx-auto text-left animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <Heart className="w-10 h-10 text-rose-500 mx-auto mb-2" />
            <h3 className="font-display font-bold text-xl text-foreground">Support Independent Artists</h3>
            <p className="text-xs text-muted-foreground mt-1">Send a direct micro-donation (tip) to help creators fund their coffee, chords, and music.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Select Artist</label>
              <select
                value={selectedTipArtist}
                onChange={e => setSelectedTipArtist(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              >
                <option value="Alex Rivera">Alex Rivera (Acoustic Folk)</option>
                <option value="Lana Vibe">Lana Vibe (Ambient Synth)</option>
                <option value="Marcus Chen">Marcus Chen (Jazz Piano)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Tip Amount ($ USD)</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['5', '10', '25', '50'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCustomTipAmount(val)}
                    className={cn(
                      "py-2 rounded-lg text-xs font-semibold border transition-all",
                      customTipAmount === val ? "border-coffee bg-coffee/10 text-coffee" : "border-border bg-card text-foreground"
                    )}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customTipAmount}
                onChange={e => setCustomTipAmount(e.target.value)}
                placeholder="Or enter custom amount"
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                const amt = parseFloat(customTipAmount);
                if (isNaN(amt) || amt <= 0) {
                  toast.error('Please enter a valid tip amount.');
                  return;
                }
                navigate('/confirm-payment', { state: { artist: selectedTipArtist, amount: amt } });
              }}
              className="w-full py-3 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90 shadow-warm flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-white" /> Send Tip ($ {customTipAmount})
            </button>
          </div>
        </div>
      )}

      {/* Global Course Details Modal Overlay */}
      {viewingCourseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold flex items-center gap-1.5">
                <BookOpen className="w-4.5 h-4.5 text-coffee" />
                {viewingCourseDetails.title}
              </h4>
              <button onClick={() => setViewingCourseDetails(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Course Syllabus & Scope</p>
                <p className="text-muted-foreground leading-relaxed">{viewingCourseDetails.syllabus}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Schedule</span>
                  <span className="text-foreground font-semibold">{viewingCourseDetails.schedule}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Duration</span>
                  <span className="text-foreground font-semibold">{viewingCourseDetails.duration}</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    if (viewingCourseDetails.isWorkshop) {
                      if (joinedWorkshops.includes(viewingCourseDetails.id)) {
                        toast.info('You are already registered for this session.');
                        setViewingCourseDetails(null);
                        return;
                      }
                      setJoinedWorkshops([...joinedWorkshops, viewingCourseDetails.id]);
                      setTeacherWorkshops(teacherWorkshops.map(w => w.id === viewingCourseDetails.id ? { ...w, seatsLeft: w.seatsLeft - 1 } : w));
                      toast.success(`Successfully registered for "${viewingCourseDetails.title}"! `);
                    } else {
                      if (joinedCourses.includes(viewingCourseDetails.id)) {
                        toast.info('You are already enrolled in this course.');
                        setViewingCourseDetails(null);
                        return;
                      }
                      setJoinedCourses([...joinedCourses, viewingCourseDetails.id]);
                      setTeacherCourses(teacherCourses.map(c => c.id === viewingCourseDetails.id ? { ...c, students: c.students + 1 } : c));
                      toast.success(`Successfully enrolled in "${viewingCourseDetails.title}"! `);
                    }
                    setViewingCourseDetails(null);
                  }}
                  className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1 hover:opacity-90 transition-opacity"
                >
                  {viewingCourseDetails.isWorkshop 
                    ? (joinedWorkshops.includes(viewingCourseDetails.id) ? 'Registered' : `Join Workshop • ${viewingCourseDetails.price}`)
                    : (joinedCourses.includes(viewingCourseDetails.id) ? 'Enrolled' : `Enroll Now • ${viewingCourseDetails.price}`)
                  }
                </button>
                <button
                  onClick={() => setViewingCourseDetails(null)}
                  className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Close Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
