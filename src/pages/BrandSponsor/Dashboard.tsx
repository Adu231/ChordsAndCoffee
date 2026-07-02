import { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Calendar, Eye, Star, X, Mail
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const chartData = [
  { month: 'Jan', revenue: 1200, streams: 2400, impressions: 18000 },
  { month: 'Feb', revenue: 1800, streams: 3100, impressions: 22000 },
  { month: 'Mar', revenue: 1500, streams: 2800, impressions: 25000 },
  { month: 'Apr', revenue: 2400, streams: 4200, impressions: 38000 },
  { month: 'May', revenue: 2900, streams: 4900, impressions: 45000 },
  { month: 'Jun', revenue: 3500, streams: 6100, impressions: 58000 },
  { month: 'Jul', revenue: 4800, streams: 8500, impressions: 72000 },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Star, label: 'Discover Talent', id: 'discover-talent' },
  { icon: Calendar, label: 'Sponsorships', id: 'sponsorships' },
  { icon: TrendingUp, label: 'Campaigns', id: 'campaigns' },
  { icon: Eye, label: 'ROI Metrics', id: 'metrics' },
];

export default function BrandSponsorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // BRAND SPONSOR STATES
  // ----------------------------------------------------
  const [sponsorCampaigns, setSponsorCampaigns] = useState([
    { id: 1, name: 'Spring Acoustics Discount Coupon', impressions: '45K', clicks: 1250, ctr: '2.7%' },
    { id: 2, name: 'Austin Cafe Banner Takeover', impressions: '82K', clicks: 3500, ctr: '4.2%' }
  ]);
  const [sponsoredEvents, setSponsoredEvents] = useState(['Underground Beats Festival']);
  const [talentDirectory, setTalentDirectory] = useState([
    { name: 'Alex Rivera', genre: 'Acoustic / Indie Folk', followers: '12K', rate: '$150/Set', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { name: 'Lana Vibe', genre: 'Indie Pop / Electronic', followers: '25K', rate: '$250/Set', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
    { name: 'Marcus Chen', genre: 'Piano / Live Loop', followers: '8K', rate: '$100/Set', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
  ]);
  const [sponsorshipInquiries, setSponsorshipInquiries] = useState([
    { id: 1, artistName: 'Alex Rivera', placement: 'Audio Intro Sponsor', budget: '150', status: 'Accepted', date: 'Jun 28' }
  ]);

  const [isRefreshingTalent, setIsRefreshingTalent] = useState(false);
  const [inquiringArtist, setInquiringArtist] = useState<any | null>(null);
  const [inquiryPlacement, setInquiryPlacement] = useState('Shoutout & Logo on Banner');
  const [inquiryBudget, setInquiryBudget] = useState('250');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [viewingSponsorOpportunity, setViewingSponsorOpportunity] = useState<any | null>(null);

  // New campaign form states
  const [newCampaignName, setNewCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('Brand Awareness');
  const [campaignAudience, setCampaignAudience] = useState('All Patrons');
  const [campaignPromoCode, setCampaignPromoCode] = useState('');
  const [campaignBudget, setCampaignBudget] = useState('200');
  const [campaignChannels, setCampaignChannels] = useState<string[]>(['In-App Banner Ads']);
  const [campaignAdCopy, setCampaignAdCopy] = useState('');

  // ROI Calculator states
  const [roiBudget, setRoiBudget] = useState('500');
  const [roiConversions, setRoiConversions] = useState('80');
  const [roiAvgSale, setRoiAvgSale] = useState('15');

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Brand / Sponsor"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Campaigns', value: sponsorCampaigns.length, change: '', icon: TrendingUp, color: 'text-amber-500' },
              { label: 'Sponsored Events', value: sponsoredEvents.length, change: '', icon: Calendar, color: 'text-violet-500' },
              { label: 'Brand Impressions', value: '128K', change: '+14%', icon: Eye, color: 'text-blue-500' },
              { label: 'Engagement Rate', value: '3.7%', change: '', icon: Star, color: 'text-emerald-500' },
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
            {/* Impressions chart */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Brand Impression Tracking</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="impressions" stroke="hsl(25, 32%, 32%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Active Campaigns */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4 font-display">Active Campaigns</h3>
              <div className="space-y-3">
                {sponsorCampaigns.map(camp => (
                  <div key={camp.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs">
                    <p className="font-semibold text-foreground">{camp.name}</p>
                    <p className="text-muted-foreground mt-1">Impressions: {camp.impressions} • Clicks: {camp.clicks} (CTR {camp.ctr})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discover-talent' && (
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-start animate-in fade-in duration-200">
          {/* Verified Artists Catalog */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-semibold text-lg text-foreground">Top Performing Artists</h3>
              <button
                onClick={() => {
                  setIsRefreshingTalent(true);
                  toast.info('Querying talent index stats...');
                  setTimeout(() => {
                    const shuffled = [...talentDirectory];
                    shuffled.reverse();
                    if (shuffled.length === 3) {
                      shuffled.push({
                        name: 'Clara Oswald',
                        genre: 'Opera / Acoustic Cello',
                        followers: '19K',
                        rate: '$320/Gig',
                        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
                      });
                    }
                    setTalentDirectory(shuffled);
                    setIsRefreshingTalent(false);
                    toast.success('Artist catalog refreshed! 4 verified matches found. 🎼');
                  }, 1000);
                }}
                disabled={isRefreshingTalent}
                className="px-3 py-1.5 bg-coffee text-white font-semibold rounded-lg text-xs hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 transition-opacity"
              >
                {isRefreshingTalent ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  'Refresh Catalog'
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Browse verified independent musicians with target branding audience matches.</p>

            <div className="space-y-3">
              {talentDirectory.map(artist => (
                <div key={artist.name} className="flex items-center justify-between p-3 border border-border rounded-xl bg-muted/15 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={artist.avatar} alt={artist.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                    <div>
                      <p className="font-semibold text-foreground">{artist.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{artist.genre} • Followers: {artist.followers} • Rate: {artist.rate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setInquiringArtist(artist)}
                    className="px-2.5 py-1.5 bg-coffee/10 text-coffee hover:bg-coffee/20 rounded-lg text-[10px] font-semibold"
                  >
                    Inquire Sponsorship
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sent Sponsorship Requests & History */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Sponsorship Request History</h3>
            <p className="text-xs text-muted-foreground">Monitor pending proposal payouts, accepted partnerships, and response history logs.</p>

            <div className="space-y-3.5">
              {sponsorshipInquiries.map(inq => (
                <div key={inq.id} className="p-4 border border-border bg-muted/15 rounded-xl text-xs space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">@{inq.artistName}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Placement: {inq.placement} • Budget: ${inq.budget}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                      inq.status === 'Accepted' ? "bg-emerald-500/10 text-emerald-600" :
                      inq.status === 'Declined' ? "bg-red-500/10 text-red-600" :
                      "bg-amber-500/10 text-amber-600 animate-pulse"
                    )}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground border-t border-border/50 pt-2 flex justify-between items-center">
                    <span>Sent date: {inq.date}</span>
                    <span onClick={() => toast.info(`Proposal details: $${inq.budget} offer for ${inq.placement}. Status is currently ${inq.status}.`)} className="text-[9.5px] text-coffee hover:underline cursor-pointer font-semibold">View Details</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sponsorships' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Sponsor Local Music Events</h3>
          <div className="space-y-3">
            {[
              { name: 'Underground Beats Festival', fee: '$1,500', spot: 'Main Stage Banner', impressions: '15,000+ local fans', date: 'Aug 15', perks: 'Banner ads on main stage backdrop, VIP entrance logo placement, 4x complimentary artist passes.' },
              { name: 'Cafe Acoustic Series', fee: '$300', spot: 'Cup/Sleeve Branding', impressions: '4,500+ café visitors', date: 'Jul 29', perks: 'Physical logo sticker branding on all coffee cup sleeves, digital feature in the Chords & Coffee newsletter.' },
              { name: 'Jazz Rooftop Special', fee: '$500', spot: 'VIP Lounge Logo', impressions: '2,500+ premium fans', date: 'Aug 10', perks: 'Custom logo projection on the VIP lounge backdrop, sponsor mentions by hosts before performance sets.' },
            ].map(opportunity => (
              <div key={opportunity.name} className="p-4 border border-border rounded-xl bg-muted/10 text-xs flex justify-between items-center">
                <div>
                  <p className="font-semibold text-foreground">{opportunity.name}</p>
                  <p className="text-muted-foreground mt-0.5">Sponsor Spot: {opportunity.spot} • Cost: {opportunity.fee}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingSponsorOpportunity(opportunity)}
                    className="px-3 py-1.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px]"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      if (sponsoredEvents.includes(opportunity.name)) {
                        toast.info(`You are already sponsoring ${opportunity.name}`);
                      } else {
                        setSponsoredEvents([...sponsoredEvents, opportunity.name]);
                        toast.success(`Sponsorship pledge confirmed for ${opportunity.name}! ☕`);
                      }
                    }}
                    className={cn(
                      "px-3 py-1.5 font-semibold rounded-lg text-[10px]",
                      sponsoredEvents.includes(opportunity.name) ? "bg-emerald-100 text-emerald-800" : "bg-coffee text-white"
                    )}
                  >
                    {sponsoredEvents.includes(opportunity.name) ? 'Sponsored' : 'Sponsor'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-start animate-in fade-in duration-200">
          {/* Launch Campaign Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Launch Sponsor Campaign</h3>
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaignName}
                  onChange={e => setNewCampaignName(e.target.value)}
                  placeholder="e.g. Free Coffee Coupon Ads"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Campaign Goal</label>
                  <select
                    value={campaignGoal}
                    onChange={e => setCampaignGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Promo Code Conversions">Promo Code Conversions</option>
                    <option value="Leads Collection">Leads Collection</option>
                    <option value="Event RSVP Boost">Event RSVP Boost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Target Audience</label>
                  <select
                    value={campaignAudience}
                    onChange={e => setCampaignAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="All Patrons">All Patrons</option>
                    <option value="Musicians Only">Musicians Only</option>
                    <option value="Venue Owners Only">Venue Owners Only</option>
                    <option value="Local Fans Only">Local Fans Only</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Promo Discount / Voucher Code</label>
                  <input
                    type="text"
                    value={campaignPromoCode}
                    onChange={e => setCampaignPromoCode(e.target.value)}
                    placeholder="e.g. COFFEEVIBE20"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Campaign Budget ($ USD)</label>
                  <input
                    type="number"
                    value={campaignBudget}
                    onChange={e => setCampaignBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Select Marketing Channels</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {['In-App Banner Ads', 'Coffee Sleeves Logo', 'Email Newsletters', 'Live Stream Bumpers'].map(channel => (
                    <label key={channel} className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                      <input
                        type="checkbox"
                        checked={campaignChannels.includes(channel)}
                        onChange={e => {
                          if (e.target.checked) {
                            setCampaignChannels([...campaignChannels, channel]);
                          } else {
                            setCampaignChannels(campaignChannels.filter(c => c !== channel));
                          }
                        }}
                        className="rounded border-border text-coffee focus:ring-coffee/40"
                      />
                      <span>{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-foreground mb-1">Ad Copy Pitch Description</label>
                <textarea
                  rows={2}
                  value={campaignAdCopy}
                  onChange={e => setCampaignAdCopy(e.target.value)}
                  placeholder="Describe the promotion deal details to target listeners..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={() => {
                  if (!newCampaignName.trim()) {
                    toast.error('Please enter a campaign name.');
                    return;
                  }
                  const bud = parseFloat(campaignBudget) || 100;
                  const estImpressions = `${Math.round(bud * 45)}K`;
                  const estClicks = Math.round(bud * 1.5);
                  const ctrPct = '3.3%';
                  setSponsorCampaigns([
                    ...sponsorCampaigns,
                    {
                      id: Date.now(),
                      name: newCampaignName.trim(),
                      impressions: estImpressions,
                      clicks: estClicks,
                      ctr: ctrPct
                    }
                  ]);
                  setNewCampaignName('');
                  setCampaignAdCopy('');
                  toast.success('Sponsor campaign launched successfully! Real-time metrics generated. 📣');
                }}
                className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90 shadow-warm transition-opacity"
              >
                Pay & Launch Campaign
              </button>
            </div>
          </div>

          {/* Running Sponsor Campaigns & Results */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Running Campaigns & Results</h3>
            <p className="text-xs text-muted-foreground">Monitor real-time branding results, impressions count, click-through rates, and leads conversion.</p>
            
            <div className="space-y-3.5">
              {sponsorCampaigns.map(camp => (
                <div key={camp.id} className="p-4 border border-border bg-muted/15 rounded-xl text-xs space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{camp.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Status: <strong className="text-emerald-600 font-bold uppercase animate-pulse">Active</strong></p>
                    </div>
                    <span className="px-2 py-0.5 bg-coffee/10 text-coffee rounded text-[9px] font-bold">
                      {camp.ctr} CTR
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center border-t border-border/50 pt-2.5">
                    <div>
                      <p className="text-[9px] uppercase text-muted-foreground font-semibold">Impressions</p>
                      <p className="font-bold text-foreground mt-0.5">{camp.impressions}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-muted-foreground font-semibold">Clicks</p>
                      <p className="font-bold text-foreground mt-0.5">{camp.clicks.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Brand Event Sponsorship details view popup */}
      {viewingSponsorOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Sponsorship: {viewingSponsorOpportunity.name}</h4>
              <button onClick={() => setViewingSponsorOpportunity(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Placement Spot</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingSponsorOpportunity.spot}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Pledge Cost</span>
                  <p className="font-semibold text-emerald-600 mt-0.5">{viewingSponsorOpportunity.fee}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Est Impressions</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingSponsorOpportunity.impressions}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Sponsor Date</span>
                  <p className="text-muted-foreground mt-0.5">{viewingSponsorOpportunity.date}</p>
                </div>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border">
                <strong className="text-foreground block mb-0.5">Campaign Perks & Benefits:</strong>
                <p className="text-muted-foreground leading-relaxed text-[11px]">{viewingSponsorOpportunity.perks}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    if (sponsoredEvents.includes(viewingSponsorOpportunity.name)) {
                      toast.info(`You are already sponsoring ${viewingSponsorOpportunity.name}`);
                    } else {
                      setSponsoredEvents([...sponsoredEvents, viewingSponsorOpportunity.name]);
                      toast.success(`Sponsorship pledge confirmed for ${viewingSponsorOpportunity.name}! `);
                    }
                    setViewingSponsorOpportunity(null);
                  }}
                  className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                >
                  {sponsoredEvents.includes(viewingSponsorOpportunity.name) ? 'Already Sponsored' : 'Pledge Sponsorship'}
                </button>
                <button
                  onClick={() => setViewingSponsorOpportunity(null)}
                  className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Close Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Talent Inquiry Modal */}
      {inquiringArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-coffee" />
                Inquire Sponsorship: {inquiringArtist.name}
              </h4>
              <button onClick={() => setInquiringArtist(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Placement</label>
                <select
                  value={inquiryPlacement}
                  onChange={e => setInquiryPlacement(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  <option value="Shoutout & Logo on Banner">Shoutout & Logo on Banner</option>
                  <option value="Dedicated Merch Placement">Dedicated Merch Placement</option>
                  <option value="Audio Intro Sponsor">Audio Intro Sponsor</option>
                  <option value="Social Media Endorsement">Social Media Endorsement</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Offer Budget ($ USD)</label>
                <input
                  type="number"
                  value={inquiryBudget}
                  onChange={e => setInquiryBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Intro Message</label>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  placeholder="Tell the artist why you would love to collaborate..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={() => {
                  setSponsorshipInquiries([
                    {
                      id: Date.now(),
                      artistName: inquiringArtist.name,
                      placement: inquiryPlacement,
                      budget: inquiryBudget,
                      status: 'Pending',
                      date: 'Today'
                    },
                    ...sponsorshipInquiries
                  ]);
                  toast.success(`Inquiry sent to ${inquiringArtist.name}! Offer of $${inquiryBudget} is pending. ✉️`);
                  setInquiringArtist(null);
                  setInquiryMessage('');
                }}
                className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl hover:opacity-90 shadow-warm"
              >
                Send Inquiry Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROI metrics calculator view */}
      {activeTab === 'metrics' && (
        <div className="grid lg:grid-cols-3 gap-6 text-left animate-in fade-in duration-200">
          {/* ROI Calculator Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">Campaign ROI Calculator</h3>
              <p className="text-[11px] text-muted-foreground mb-4">Estimate brand performance and compute net returns for acoustic campaigns.</p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Campaign Budget ($ USD)</label>
                  <input
                    type="number"
                    value={roiBudget}
                    onChange={e => setRoiBudget(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Estimated Conversions / Sales</label>
                  <input
                    type="number"
                    value={roiConversions}
                    onChange={e => setRoiConversions(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Average Order Value ($)</label>
                  <input
                    type="number"
                    value={roiAvgSale}
                    onChange={e => setRoiAvgSale(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => toast.success('ROI calculation updated below!')}
              className="mt-4 w-full py-2 bg-coffee text-white font-semibold text-xs rounded-lg hover:opacity-90"
            >
              Update ROI Forecast
            </button>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-4">ROI Forecast Results</h3>
              
              {(() => {
                const budget = parseFloat(roiBudget) || 0;
                const conversions = parseFloat(roiConversions) || 0;
                const avgSale = parseFloat(roiAvgSale) || 0;
                
                const revenue = conversions * avgSale;
                const netRoi = revenue - budget;
                const roiPct = budget > 0 ? (netRoi / budget) * 100 : 0;
                
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-xl bg-muted/10">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Generated Revenue</span>
                      <strong className="text-xl text-foreground font-display">${revenue.toLocaleString()}</strong>
                    </div>
                    <div className="p-4 border border-border rounded-xl bg-muted/10">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Campaign Budget</span>
                      <strong className="text-xl text-foreground font-display">${budget.toLocaleString()}</strong>
                    </div>
                    <div className="p-4 border border-border rounded-xl bg-muted/10 col-span-2 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Net ROI (Earnings)</span>
                        <strong className={cn("text-2xl font-display font-bold", netRoi >= 0 ? "text-emerald-600" : "text-rose-600")}>
                          ${netRoi.toLocaleString()}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">ROI %</span>
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold font-display inline-block", netRoi >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800")}>
                          {roiPct.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed mt-4">
              * Calculations are estimates based on standard Conversion-to-Sale ratios for café discount campaigns on ChordsAndCoffee.
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
