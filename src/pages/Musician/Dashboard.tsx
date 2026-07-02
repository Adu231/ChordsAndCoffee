import { useState } from 'react';
import {
  LayoutDashboard, Music, ShoppingBag, Calendar, Users, DollarSign,
  Heart, Trash2, X, Send
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Music, label: 'Upload Portfolio', id: 'portfolio' },
  { icon: ShoppingBag, label: 'Digital Storefront', id: 'storefront' },
  { icon: Calendar, label: 'Book Performances', id: 'booking' },
  { icon: Users, label: 'Collaborate', id: 'collab' },
  { icon: DollarSign, label: 'Monetize Music', id: 'monetize' },
];

const chartData = [
  { month: 'Jan', revenue: 1200, streams: 2400, impressions: 18000 },
  { month: 'Feb', revenue: 1800, streams: 3100, impressions: 22000 },
  { month: 'Mar', revenue: 1500, streams: 2800, impressions: 25000 },
  { month: 'Apr', revenue: 2400, streams: 4200, impressions: 38000 },
  { month: 'May', revenue: 2900, streams: 4900, impressions: 45000 },
  { month: 'Jun', revenue: 3500, streams: 6100, impressions: 58000 },
  { month: 'Jul', revenue: 4800, streams: 8500, impressions: 72000 },
];

export default function MusicianDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // MUSICIAN STATES
  // ----------------------------------------------------
  const [portfolioTracks, setPortfolioTracks] = useState([
    { id: 1, title: 'Café Mornings (Acoustic)', plays: 12450, likes: 320, status: 'Released' },
    { id: 2, title: 'Golden Hours (Indie Folk)', plays: 9210, likes: 215, status: 'Released' },
    { id: 3, title: 'Acoustic Sunrise (Unreleased Demo)', plays: 0, likes: 0, status: 'Draft' },
  ]);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackGenre, setNewTrackGenre] = useState('Acoustic');
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [gigOffers, setGigOffers] = useState([
    {
      id: 1,
      venue: 'The Grind Café',
      date: 'Jul 05, 2026',
      time: '8:00 PM - 11:00 PM',
      pay: '$150',
      status: 'Confirmed',
      desc: 'Weekly open mic guest set. Perform a 30-minute opening acoustic session to welcome guests.',
      address: '123 Brew St, Austin, TX',
      expectations: 'Bring your own guitar. House PA and vocal microphone are provided. Arrive 30 minutes early for soundcheck.'
    },
    {
      id: 2,
      venue: 'Brew & Strum',
      date: 'Jul 12, 2026',
      time: '7:30 PM - 10:00 PM',
      pay: '$250',
      status: 'Pending',
      desc: 'Featured Friday Night set. Perform a 2-hour acoustic/folk set with a 15-minute intermission.',
      address: '456 Chord Ave, Austin, TX',
      expectations: 'Full setup support provided. Guitar tuner, DI box, and feedback monitor available on stage. Includes a complimentary meal.'
    },
  ]);
  const [viewingGig, setViewingGig] = useState<any | null>(null);

  const [collabList, setCollabList] = useState([
    { id: 1, title: 'Folk Track Harmonies', creator: 'Clara Woods', roleNeeded: 'Vocalist', status: 'Open', desc: 'Need backing vocals for an upcoming warm acoustic track in G major.', requirements: 'Clear vocal stems, ability to follow basic chord arrangements.' },
    { id: 2, title: 'Jazz Lounge Bassline', creator: 'Marcus Chen', roleNeeded: 'Guitarist', status: 'Joined', desc: 'Looking for a clean acoustic guitarist to fill in details on a jazz trio demo.', requirements: 'Warm tone, ability to read chord sheets, improvise transitions.' },
  ]);
  const [newCollabTitle, setNewCollabTitle] = useState('');
  const [newCollabRole, setNewCollabRole] = useState('Guitarist');
  const [newCollabDesc, setNewCollabDesc] = useState('');
  const [newCollabReqs, setNewCollabReqs] = useState('');
  const [viewingCollab, setViewingCollab] = useState<any | null>(null);

  // Digital Storefront States
  const [storeTracks, setStoreTracks] = useState([
    { id: 1, title: 'Café Sessions EP', price: 9.99, format: 'EP', releaseDate: '2026-06-01', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop' }
  ]);
  const [storeTrackTitle, setStoreTrackTitle] = useState('');
  const [storeTrackPrice, setStoreTrackPrice] = useState('9.99');
  const [storeTrackFormat, setStoreTrackFormat] = useState('Single');
  const [storeTrackDate, setStoreTrackDate] = useState('');
  const [storeTrackCover, setStoreTrackCover] = useState<File | null>(null);

  // Payout states
  const [streamingPayouts, setStreamingPayouts] = useState(1420);
  const [tippingPayouts, setTippingPayouts] = useState(740);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'details' | 'confirm'>('details');
  const [bankName, setBankName] = useState('Chase Bank');
  const [bankAccount, setBankAccount] = useState('•••• 4321');
  const [bankRouting, setBankRouting] = useState('123456789');
  const [bankHolder, setBankHolder] = useState(user?.name || '');
  const [withdrawalHistory, setWithdrawalHistory] = useState([
    { id: 1, date: 'Jun 15, 2026', amount: 850.00, bank: 'Chase Bank (•••• 4321)', status: 'Completed' as const }
  ]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Musician"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Followers', value: user.followers || '1.2K', change: '+12%', icon: Heart, color: 'text-rose-500' },
              { label: 'Gigs Booked', value: gigOffers.filter(g => g.status === 'Confirmed').length, change: '', icon: Calendar, color: 'text-violet-500' },
              { label: 'Portfolio Tracks', value: portfolioTracks.length, change: '', icon: Music, color: 'text-amber-500' },
              { label: 'Tipping Earnings', value: `$${tippingPayouts}`, change: '+24%', icon: DollarSign, color: 'text-emerald-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-warm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={cn('w-5 h-5', stat.color)} />
                  {stat.change && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">{stat.change}</span>}
                </div>
                <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Overview */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Streams & Earnings Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="streams" stroke="hsl(25, 32%, 32%)" fill="hsl(25, 32%, 32%)" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Tracks */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4 font-display">Top Tracks</h3>
              <div className="space-y-3">
                {portfolioTracks.slice(0, 3).map((track, idx) => (
                  <div key={track.id} className="flex items-center justify-between border-b border-border pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground w-4">{idx + 1}</span>
                      <div className="p-2 bg-coffee/10 rounded-lg"><Music className="w-3.5 h-3.5 text-coffee" /></div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{track.title}</p>
                        <p className="text-[10px] text-muted-foreground">{track.plays.toLocaleString()} plays</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-500 font-semibold">{track.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Upload New Track to Portfolio</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Track Title</label>
              <input
                type="text"
                value={newTrackTitle}
                onChange={e => setNewTrackTitle(e.target.value)}
                placeholder="e.g. Moonlight Session"
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Genre</label>
              <select
                value={newTrackGenre}
                onChange={e => setNewTrackGenre(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
              >
                <option value="Acoustic">Acoustic</option>
                <option value="Indie Folk">Indie Folk</option>
                <option value="Jazz">Jazz</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Attach Audio File</label>
              <input
                type="file"
                accept="audio/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) setAudioFile(file);
                }}
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-coffee/10 file:text-coffee hover:file:bg-coffee/20 cursor-pointer"
              />
              {audioFile && (
                <p className="text-[10px] text-emerald-600 font-medium mt-1">📎 Selected: {audioFile.name} ({(audioFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
              )}
            </div>
            <button
              onClick={() => {
                if (!newTrackTitle.trim()) {
                  toast.error('Please enter a track title.');
                  return;
                }
                if (!audioFile) {
                  toast.error('Please attach an audio file.');
                  return;
                }
                setPortfolioTracks([...portfolioTracks, { id: Date.now(), title: newTrackTitle, plays: 0, likes: 0, status: 'Released' }]);
                setNewTrackTitle('');
                setAudioFile(null);
                toast.success('Track and audio file published to your portfolio! 🎵');
              }}
              className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
            >
              Publish Track
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Portfolio Tracks ({portfolioTracks.length})</h4>
            <div className="space-y-2">
              {portfolioTracks.map(track => (
                <div key={track.id} className="flex justify-between items-center p-2.5 border border-border rounded-xl bg-muted/15 text-xs">
                  <span className="font-medium text-foreground"> {track.title}</span>
                  <span className="text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-full">{track.plays} plays</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'booking' && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4 font-display">Performance Booking Invites</h3>
            <div className="space-y-3">
              {gigOffers.map(gig => (
                <div key={gig.id} className="flex flex-wrap justify-between items-center p-4 border border-border rounded-xl bg-muted/10 text-xs">
                  <div>
                    <p className="font-semibold text-sm text-foreground"> Gig at {gig.venue}</p>
                    <p className="text-muted-foreground mt-0.5">Date: {gig.date} • Offer Pay: <strong className="text-emerald-600 font-semibold">{gig.pay}</strong></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingGig(gig)}
                      className="px-3.5 py-1.5 border border-border text-foreground hover:bg-muted rounded-lg font-semibold transition-all"
                    >
                      View Details
                    </button>
                    {gig.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => {
                            setGigOffers(gigOffers.map(g => g.id === gig.id ? { ...g, status: 'Confirmed' } : g));
                            toast.success(`Gig booking for ${gig.venue} accepted! 🎸`);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                        >
                          Accept Offer
                        </button>
                        <button
                          onClick={() => {
                            setGigOffers(gigOffers.filter(g => g.id !== gig.id));
                            toast.info('Gig booking declined');
                            if (viewingGig?.id === gig.id) setViewingGig(null);
                          }}
                          className="px-3 py-1.5 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted-foreground/10 border border-border transition-all"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg font-semibold flex items-center">{gig.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {viewingGig && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-semibold text-lg text-foreground"> Performance Invitation details: {viewingGig.venue}</h4>
                <button onClick={() => setViewingGig(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4 text-xs">
                <p className="text-muted-foreground leading-relaxed">{viewingGig.desc}</p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <strong className="text-foreground"> Location Address:</strong>
                    <p className="text-muted-foreground mt-0.5">{viewingGig.address}</p>
                  </div>
                  <div>
                    <strong className="text-foreground"> Timing & Compensation:</strong>
                    <p className="text-muted-foreground mt-0.5">{viewingGig.date} · {viewingGig.time} · <span className="text-emerald-600 font-semibold">{viewingGig.pay}</span></p>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl border border-border">
                  <strong className="text-foreground block mb-1">Performance Expectations:</strong>
                  <p className="text-muted-foreground leading-relaxed">{viewingGig.expectations}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {viewingGig.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => {
                          setGigOffers(gigOffers.map(g => g.id === viewingGig.id ? { ...g, status: 'Confirmed' } : g));
                          setViewingGig(null);
                          toast.success(`Gig booking for ${viewingGig.venue} accepted! `);
                        }}
                        className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:opacity-90 transition-colors"
                      >
                        Accept & Book Performance
                      </button>
                      <button
                        onClick={() => {
                          setGigOffers(gigOffers.filter(g => g.id !== viewingGig.id));
                          setViewingGig(null);
                          toast.info('Gig booking declined');
                        }}
                        className="px-5 py-2.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors"
                      >
                        Decline Invitation
                      </button>
                    </>
                  ) : (
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold">Confirmed Booking</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setViewingGig(null)}
                    className="px-4 py-2.5 border border-border text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'collab' && (
        <div className="space-y-6 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          {/* Create Collab Form */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4 font-display">Create Collaboration Request</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCollabTitle.trim() || !newCollabDesc.trim()) {
                  toast.error('Please enter collaboration title and description.');
                  return;
                }
                setCollabList([
                  ...collabList,
                  {
                    id: Date.now(),
                    title: newCollabTitle,
                    creator: user.name,
                    roleNeeded: newCollabRole,
                    status: 'Open',
                    desc: newCollabDesc,
                    requirements: newCollabReqs || 'No specific requirements.'
                  }
                ]);
                setNewCollabTitle('');
                setNewCollabDesc('');
                setNewCollabReqs('');
                toast.success('Collaboration request uploaded to board! 📝');
              }}
              className="space-y-3"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Collab Title</label>
                  <input
                    type="text"
                    required
                    value={newCollabTitle}
                    onChange={e => setNewCollabTitle(e.target.value)}
                    placeholder="e.g. Bassist for Jazz Trio"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Role Needed</label>
                  <select
                    value={newCollabRole}
                    onChange={e => setNewCollabRole(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Guitarist">Guitarist</option>
                    <option value="Vocalist">Vocalist</option>
                    <option value="Producer">Producer</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Lyricist">Lyricist</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={newCollabDesc}
                  onChange={e => setNewCollabDesc(e.target.value)}
                  placeholder="Describe your track, key, tempo, and what you are looking to achieve..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Requirements (Optional)</label>
                <input
                  type="text"
                  value={newCollabReqs}
                  onChange={e => setNewCollabReqs(e.target.value)}
                  placeholder="e.g. WAV format, home studio, experience with folk"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90">
                Upload Collaboration Request
              </button>
            </form>
          </div>

          {/* Collab Listings */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Board Listings</h3>
            <div className="space-y-3">
              {collabList.map(collab => (
                <div key={collab.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{collab.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-coffee/10 text-coffee rounded-full text-[9px] font-bold">{collab.roleNeeded}</span>
                      <span className="text-muted-foreground text-[10px]">by @{collab.creator}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingCollab(collab)}
                      className="px-3 py-1 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px]"
                    >
                      View Details
                    </button>
                    {collab.status === 'Open' ? (
                      <button
                        onClick={() => {
                          if (collab.creator === user.name) {
                            toast.error('You cannot join your own collaboration request.');
                            return;
                          }
                          setCollabList(collabList.map(c => c.id === collab.id ? { ...c, status: 'Joined' } : c));
                          toast.success(`Successfully joined collaboration with ${collab.creator}! `);
                        }}
                        className="px-3 py-1 bg-coffee text-white font-semibold rounded-lg text-[10px]"
                      >
                        Join Collab
                      </button>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[9px]">Joined</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collab Modal */}
          {viewingCollab && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-lg w-full relative animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display font-semibold text-base text-foreground"> Collaboration Details: {viewingCollab.title}</h4>
                  <button onClick={() => setViewingCollab(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="px-2.5 py-0.5 bg-coffee/15 text-coffee rounded-full font-bold text-[10px]">{viewingCollab.roleNeeded} Needed</span>
                    <span className="ml-2 text-muted-foreground">Posted by @{viewingCollab.creator}</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Project Description:</strong>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{viewingCollab.desc}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-xl border border-border">
                    <strong className="text-foreground block mb-1">Stems & Deliverable Requirements:</strong>
                    <p className="text-muted-foreground leading-relaxed">{viewingCollab.requirements}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {viewingCollab.status === 'Open' ? (
                      <button
                        onClick={() => {
                          if (viewingCollab.creator === user.name) {
                            toast.error('You cannot join your own collaboration request.');
                            return;
                          }
                          setCollabList(collabList.map(c => c.id === viewingCollab.id ? { ...c, status: 'Joined' } : c));
                          setViewingCollab(null);
                          toast.success(`Successfully joined collaboration with ${viewingCollab.creator}! `);
                        }}
                        className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                      >
                        Join Collaboration
                      </button>
                    ) : (
                      <>
                        <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center">Already Joined</span>
                        {viewingCollab.creator !== user.name && (
                          <button
                            onClick={() => {
                              setCollabList(collabList.map(c => c.id === viewingCollab.id ? { ...c, status: 'Open' } : c));
                              setViewingCollab(null);
                              toast.info(`Left collaboration with ${viewingCollab.creator}`);
                            }}
                            className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-750 transition-all"
                          >
                            Leave Collab
                          </button>
                        )}
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => setViewingCollab(null)}
                      className="px-4 py-2 border border-border text-muted-foreground hover:bg-muted rounded-xl transition-all"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'monetize' && (
        <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Music Monetization Portal</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-border p-4 rounded-xl bg-muted/20 text-center relative overflow-hidden">
                <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-lg text-foreground">${streamingPayouts.toLocaleString()}</h4>
                <p className="text-[10px] text-muted-foreground">Streaming Payouts</p>
              </div>
              <div className="border border-border p-4 rounded-xl bg-muted/20 text-center relative overflow-hidden">
                <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                <h4 className="font-bold text-lg text-foreground">${tippingPayouts.toLocaleString()}</h4>
                <p className="text-[10px] text-muted-foreground">Fan Tipping Jar</p>
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-muted/10 border border-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Withdrawable Account Balance</span>
                <span className="text-xl font-bold text-foreground">
                  ${(streamingPayouts + tippingPayouts).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (streamingPayouts + tippingPayouts <= 0) {
                    toast.info("Your account balance is currently $0.00. No funds to withdraw.");
                    return;
                  }
                  setWithdrawStep('details');
                  setWithdrawModalOpen(true);
                }}
                disabled={streamingPayouts + tippingPayouts <= 0}
                className="w-full sm:w-auto px-5 py-2.5 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Withdraw Payouts
              </button>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Live Fan Tipping History</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
                  <span> Emily Johnson tipped: "Love your latest demo track!"</span>
                  <strong className="text-emerald-600 font-semibold">$10.00</strong>
                </div>
                <div className="flex justify-between items-center text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
                  <span> Dave Vance (Sponsor) tipped: "Keep it up!"</span>
                  <strong className="text-emerald-600 font-semibold">$50.00</strong>
                </div>
              </div>
            </div>

            {/* Withdrawal Request History */}
            <div className="border-t border-border pt-4 mt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Withdrawal Request History</h4>
              {withdrawalHistory.length === 0 ? (
                <p className="text-[11px] text-muted-foreground text-center py-2">No past withdrawals found.</p>
              ) : (
                <div className="space-y-2">
                  {withdrawalHistory.map(w => (
                    <div key={w.id} className="flex justify-between items-center text-xs bg-muted/30 p-2.5 rounded-lg border border-border">
                      <div>
                        <p className="font-semibold text-foreground">{w.bank}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{w.date}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <strong className="text-foreground">${w.amount.toFixed(2)}</strong>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${w.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {w.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'storefront' && (
        <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Digital Storefront Manager</h3>
            <div className="space-y-4 mb-6 bg-muted/25 border border-border p-5 rounded-xl text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Track / Album Title</label>
                  <input
                    type="text"
                    value={storeTrackTitle}
                    onChange={e => setStoreTrackTitle(e.target.value)}
                    placeholder="e.g. Café Sessions EP"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={storeTrackPrice}
                    onChange={e => setStoreTrackPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Format Type</label>
                  <select
                    value={storeTrackFormat}
                    onChange={e => setStoreTrackFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Single">Single</option>
                    <option value="EP">EP</option>
                    <option value="Album">Album</option>
                    <option value="Sound Kit">Sound Kit</option>
                    <option value="Stems">Stems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Release Date</label>
                  <input
                    type="date"
                    value={storeTrackDate}
                    onChange={e => setStoreTrackDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Attach Audio Stems/Track</label>
                  <input
                    type="file"
                    accept="audio/*"
                    className="w-full px-3 py-1.5 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[9px] file:bg-coffee/10 file:text-coffee hover:file:bg-coffee/20 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Attach Album Artwork Cover</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setStoreTrackCover(file);
                    }}
                    className="w-full px-3 py-1.5 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[9px] file:bg-coffee/10 file:text-coffee hover:file:bg-coffee/20 cursor-pointer"
                  />
                  {storeTrackCover && (
                    <p className="text-[9px] text-emerald-600 font-medium mt-1">📎 Artwork: {storeTrackCover.name}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!storeTrackTitle.trim() || !storeTrackPrice) {
                    toast.error('Please enter a track name and price.');
                    return;
                  }
                  setStoreTracks([
                    ...storeTracks,
                    {
                      id: Date.now(),
                      title: storeTrackTitle,
                      price: parseFloat(storeTrackPrice),
                      format: storeTrackFormat,
                      releaseDate: storeTrackDate,
                      cover: storeTrackCover ? URL.createObjectURL(storeTrackCover) : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop'
                    }
                  ]);
                  setStoreTrackTitle('');
                  setStoreTrackPrice('9.99');
                  setStoreTrackCover(null);
                  toast.success(`Track "${storeTrackTitle}" listed successfully on digital storefront! `);
                }}
                className="w-full py-2.5 bg-coffee text-white font-semibold text-xs rounded-lg hover:opacity-90"
              >
                List Product in Digital Storefront
              </button>
            </div>

            <div className="space-y-2">
              {storeTracks.map(track => (
                <div key={track.id} className="flex justify-between items-center text-xs bg-muted/15 p-3 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <img src={track.cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop'} className="w-8 h-8 rounded-lg object-cover border border-border" />
                    <div>
                      <p className="font-semibold text-foreground"> {track.title}</p>
                      <p className="text-[10px] text-muted-foreground">Format: {track.format || 'EP'} • Date: {track.releaseDate || '2026-06-01'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <strong className="text-emerald-600 font-semibold">${track.price.toFixed(2)}</strong>
                    <button
                      onClick={() => {
                        setStoreTracks(storeTracks.filter(t => t.id !== track.id));
                        toast.info(`Removed "${track.title}" from storefront.`);
                      }}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal Overlay */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-coffee" />
                {withdrawStep === 'details' ? 'Confirm Account Details' : 'Confirm Withdrawal'}
              </h4>
              <button onClick={() => setWithdrawModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>

            {withdrawStep === 'details' ? (
              <div className="space-y-4 text-xs">
                <p className="text-muted-foreground leading-relaxed">
                  Please review and confirm your linked bank account information before finalizing this withdrawal.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-muted-foreground mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-muted-foreground mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={bankHolder}
                      onChange={e => setBankHolder(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      placeholder="Account Holder"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-muted-foreground mb-1">Account Number</label>
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={e => setBankAccount(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        placeholder="Account Number"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-muted-foreground mb-1">Routing Number</label>
                      <input
                        type="text"
                        value={bankRouting}
                        onChange={e => setBankRouting(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        placeholder="Routing Number"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (!bankName.trim() || !bankHolder.trim() || !bankAccount.trim() || !bankRouting.trim()) {
                        toast.error('All bank account details are required.');
                        return;
                      }
                      setWithdrawStep('confirm');
                    }}
                    className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1 hover:opacity-90 transition-opacity"
                  >
                    Verify & Continue
                  </button>
                  <button
                    onClick={() => setWithdrawModalOpen(false)}
                    className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-muted-foreground leading-relaxed">
                  Are you sure you want to transfer your entire withdrawable balance to the account specified below?
                </p>

                <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Withdrawal:</span>
                    <span className="font-bold text-foreground text-sm">${(streamingPayouts + tippingPayouts).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/60 pt-2 flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-semibold text-foreground truncate max-w-[150px]">{bankName} ({bankAccount.slice(-4)})</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl p-2.5 leading-relaxed text-[10px]">
                  ⚠️ Transfers are irrevocable and may take 2-3 business days to clear in your account depending on bank processing schedules.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      const totalAmount = streamingPayouts + tippingPayouts;
                      const newRecord = {
                        id: Date.now(),
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                        amount: totalAmount,
                        bank: `${bankName} (•••• ${bankAccount.slice(-4)})`,
                        status: 'Processing' as const
                      };
                      setWithdrawalHistory([newRecord, ...withdrawalHistory]);
                      setStreamingPayouts(0);
                      setTippingPayouts(0);
                      setWithdrawModalOpen(false);
                      toast.success(`Withdrawal of $${totalAmount.toFixed(2)} processed successfully! Funds will arrive in 2-3 business days. 💰`);
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl text-xs flex-1 hover:bg-emerald-700 transition-colors"
                  >
                    Confirm Withdrawal
                  </button>
                  <button
                    onClick={() => setWithdrawStep('details')}
                    className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
