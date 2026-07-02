import { useState } from 'react';
import {
  LayoutDashboard, Coffee, Calendar, BookMarked, TrendingUp, MapPin,
  CheckCircle, X, Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Coffee, label: 'Venue Profile', id: 'venue-profile' },
  { icon: Calendar, label: 'Host Events', id: 'host-events' },
  { icon: Search, label: 'Book Artists', id: 'book-artists' },
  { icon: BookMarked, label: 'Reservations', id: 'reservations' },
  { icon: TrendingUp, label: 'Grow Audience', id: 'audience' },
];

export default function VenueOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // VENUE OWNER STATES
  // ----------------------------------------------------
  const [venueStatus, setVenueStatus] = useState('Listed & Active');
  const [venueEvents, setVenueEvents] = useState([
    { id: 1, name: 'Open Mic Night Showcase', date: '2026-07-05', time: '20:00', price: 'Free', desc: 'Join local acoustic musicians.', genre: 'Acoustic Folk' }
  ]);
  const [venueReservations, setVenueReservations] = useState([
    { id: 1, table: 'Table 4', guests: 2, time: '7:00 PM', status: 'Confirmed', name: 'John Doe', email: 'john@gmail.com', notes: 'Anniversary dinner. Near window if possible.' },
    { id: 2, table: 'Table 12 (VIP)', guests: 4, time: '8:30 PM', status: 'Confirmed', name: 'Mary Smith', email: 'mary@gmail.com', notes: 'Guitarist fan, reserve close to stage.' }
  ]);
  const [venueCampaignsCount, setVenueCampaignsCount] = useState(1);
  const [venueCampaigns, setVenueCampaigns] = useState([
    { id: 1, title: 'Summer Acoustic Promo', eventName: 'Open Mic Night Showcase', radius: '10 Miles', goal: 'Increase Ticket Sales', budget: 50, status: 'Running', impressions: 4500, clicks: 320 }
  ]);
  const [sentArtistOffers, setSentArtistOffers] = useState([
    { id: 1, artist: 'Alex Rivera', date: '2026-07-05', slotTime: '8:00 PM - 11:00 PM', pay: '$150', status: 'Accepted', notes: 'Weekly Guest Set.', accommodation: 'No' }
  ]);

  // Venue Profile fields
  const [isVenueSaved, setIsVenueSaved] = useState(true);
  const [isSavingVenueProfile, setIsSavingVenueProfile] = useState(false);
  const [venueName, setVenueName] = useState('The Grind Café');
  const [venueCapacity, setVenueCapacity] = useState('80');
  const [venueAddress, setVenueAddress] = useState('123 Brew St, Austin, TX');
  const [venueDescription, setVenueDescription] = useState('Cozy cafe space in downtown Austin featuring live acoustic sets and micro-roaster coffees.');
  const [venuePricingPerHour, setVenuePricingPerHour] = useState('75');
  const [venueContactPhone, setVenueContactPhone] = useState('512-555-0199');
  const [venueAcousticsRating, setVenueAcousticsRating] = useState('Excellent');
  const [venueStageGear, setVenueStageGear] = useState('12-channel Yamaha mixer, 2x JBL PA monitors, 3x Shure SM58 vocals, 1x DI Box');

  // Event Creation states
  const [newVenueEventName, setNewVenueEventName] = useState('');
  const [newVenueEventGenre, setNewVenueEventGenre] = useState('');
  const [newVenueEventDate, setNewVenueEventDate] = useState('');
  const [newVenueEventTime, setNewVenueEventTime] = useState('');
  const [newVenueEventPrice, setNewVenueEventPrice] = useState('Free');
  const [newVenueEventDesc, setNewVenueEventDesc] = useState('');

  // Booking states
  const [bookingArtistName, setBookingArtistName] = useState('Alex Rivera');
  const [bookingPay, setBookingPay] = useState('150');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlotTime, setBookingSlotTime] = useState('8:00 PM - 10:00 PM');
  const [bookingAccommodation, setBookingAccommodation] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');

  // Active Promo States
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoRadius, setPromoRadius] = useState('10');
  const [promoGoal, setPromoGoal] = useState('Increase Ticket Sales');
  const [promoEventId, setPromoEventId] = useState('1');
  const [promoAdTitle, setPromoAdTitle] = useState('');
  const [promoAdDesc, setPromoAdDesc] = useState('');
  const [promoBudget, setPromoBudget] = useState('25');
  const [promoProcessing, setPromoProcessing] = useState(false);

  // Reservation details modal
  const [viewingReservation, setViewingReservation] = useState<any | null>(null);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Café / Venue Owner"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Venue Listed', value: venueStatus, change: '', icon: Coffee, color: 'text-amber-600' },
              { label: 'Gigs Scheduled', value: venueEvents.length, change: '', icon: Calendar, color: 'text-violet-500' },
              { label: 'Reservations Today', value: venueReservations.length, change: '', icon: BookMarked, color: 'text-blue-500' },
              { label: 'Active Promotions', value: venueCampaignsCount, change: '', icon: TrendingUp, color: 'text-rose-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-warm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <h4 className="text-xl font-bold text-foreground truncate">{stat.value}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Booking Offers */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Sent Artist Booking Offers</h3>
              <div className="space-y-3">
                {sentArtistOffers.map(offer => (
                  <div key={offer.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                    <div>
                      <p className="font-semibold text-foreground"> {offer.artist}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Date: {offer.date} • Pay: {offer.pay}</p>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-semibold",
                      offer.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    )}>
                      {offer.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reservations */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Today's Reservations</h3>
              <div className="space-y-3">
                {venueReservations.map(res => (
                  <div key={res.id} className="p-3 border border-border rounded-xl bg-muted/10 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground"> {res.table} ({res.guests} Guests)</p>
                      <p className="text-muted-foreground mt-0.5">Reservation time: {res.time}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold">{res.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'venue-profile' && (
        <div className="max-w-xl mx-auto space-y-4 animate-in fade-in duration-200">
          {isVenueSaved ? (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-lg text-left">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">Venue Profile Saved</h3>
                  <p className="text-xs text-muted-foreground">Your listed space is live and accepting booking requests.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden relative border border-border flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-coffee/20 via-background to-background flex items-center justify-center">
                    <Coffee className="w-16 h-16 text-coffee/20" />
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 text-left">
                    <span className={cn(
                      "px-2 py-0.5 text-[9px] font-bold uppercase rounded-full tracking-wider text-white",
                      venueStatus === 'Listed & Active' ? "bg-emerald-600" : "bg-zinc-600"
                    )}>
                      {venueStatus}
                    </span>
                    <h4 className="font-display font-bold text-white text-lg mt-1">{venueName}</h4>
                    <p className="text-white/70 text-xs flex items-center gap-1"><MapPin className="w-3 h-3 text-gold" /> {venueAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-muted/40 rounded-xl border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Capacity</span>
                    <p className="font-bold text-foreground mt-0.5">{venueCapacity} guests</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Pricing</span>
                    <p className="font-bold text-foreground mt-0.5">${venuePricingPerHour} / hour</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Acoustics</span>
                    <p className="font-bold text-foreground mt-0.5">{venueAcousticsRating}</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-xl border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Contact Phone</span>
                    <p className="font-bold text-foreground mt-0.5">{venueContactPhone}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 border border-border rounded-xl text-xs space-y-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Stage Gear</span>
                    <p className="text-foreground mt-0.5">{venueStageGear || 'No special gear provided'}</p>
                  </div>
                  <div className="border-t border-border pt-2">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Description</span>
                    <p className="text-foreground mt-0.5 leading-relaxed">{venueDescription}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => setIsVenueSaved(false)}
                    className="flex-1 py-2.5 border border-border text-xs font-semibold rounded-xl hover:bg-muted transition-colors text-foreground"
                  >
                    Edit Listing Details
                  </button>
                  <button
                    onClick={() => toast.success('Venue profile link copied to clipboard! ')}
                    className="flex-1 py-2.5 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-warm transition-opacity"
                  >
                    View Live Listing
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-5 text-left">
              <h3 className="font-semibold text-foreground mb-4">Venue Listing Settings</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Venue Name</label>
                    <input
                      type="text"
                      value={venueName}
                      onChange={e => setVenueName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Seating Capacity</label>
                    <input
                      type="number"
                      value={venueCapacity}
                      onChange={e => setVenueCapacity(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Venue Address</label>
                    <input
                      type="text"
                      value={venueAddress}
                      onChange={e => setVenueAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Contact Phone</label>
                    <input
                      type="text"
                      value={venueContactPhone}
                      onChange={e => setVenueContactPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Stage Gear</label>
                    <input
                      type="text"
                      value={venueStageGear}
                      onChange={e => setVenueStageGear(e.target.value)}
                      placeholder="e.g. Mixer, Mics, PAs"
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Acoustics Rating</label>
                    <select
                      value={venueAcousticsRating}
                      onChange={e => setVenueAcousticsRating(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Pricing ($ / Hr)</label>
                    <input
                      type="number"
                      value={venuePricingPerHour}
                      onChange={e => setVenuePricingPerHour(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Venue Description</label>
                  <textarea
                    rows={3}
                    value={venueDescription}
                    onChange={e => setVenueDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Listing Status</label>
                  <select
                    value={venueStatus}
                    onChange={e => setVenueStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Listed & Active">Listed & Active</option>
                    <option value="Temporary Closed">Temporary Closed</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setIsSavingVenueProfile(true);
                    toast.info('Saving venue profile to database...');
                    setTimeout(() => {
                      setIsSavingVenueProfile(false);
                      setIsVenueSaved(true);
                      toast.success('Venue listing details saved successfully! ');
                    }, 1200);
                  }}
                  disabled={isSavingVenueProfile}
                  className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90 disabled:opacity-55 flex items-center justify-center gap-1.5 transition-opacity"
                >
                  {isSavingVenueProfile ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving Venue Details...
                    </>
                  ) : (
                    'Save Venue Profile'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'host-events' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Host a Venue Event</h3>
          <div className="space-y-4 mb-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Event Name</label>
                <input
                  type="text"
                  value={newVenueEventName}
                  onChange={e => setNewVenueEventName(e.target.value)}
                  placeholder="e.g. Acoustic Night Live"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Genre / Theme</label>
                <input
                  type="text"
                  value={newVenueEventGenre}
                  onChange={e => setNewVenueEventGenre(e.target.value)}
                  placeholder="e.g. Acoustic / Indie"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
                <input
                  type="date"
                  value={newVenueEventDate}
                  onChange={e => setNewVenueEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Start Time</label>
                <input
                  type="time"
                  value={newVenueEventTime}
                  onChange={e => setNewVenueEventTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Ticket Price ($ USD / Free)</label>
                <input
                  type="text"
                  value={newVenueEventPrice}
                  onChange={e => setNewVenueEventPrice(e.target.value)}
                  placeholder="e.g. 10 or Free"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Event Description</label>
              <textarea
                rows={2}
                value={newVenueEventDesc}
                onChange={e => setNewVenueEventDesc(e.target.value)}
                placeholder="Provide details about the event schedule, artists, food, or vibe..."
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
              />
            </div>
            <button
              onClick={() => {
                if (!newVenueEventName.trim()) {
                  toast.error('Please enter an event name.');
                  return;
                }
                const formattedPrice = newVenueEventPrice.toLowerCase() === 'free' ? 'Free' : `$${newVenueEventPrice}`;
                setVenueEvents([
                  ...venueEvents,
                  {
                    id: Date.now(),
                    name: newVenueEventName,
                    date: newVenueEventDate,
                    time: newVenueEventTime,
                    price: formattedPrice,
                    desc: newVenueEventDesc || 'No description provided.',
                    genre: newVenueEventGenre || 'General'
                  }
                ]);
                setNewVenueEventName('');
                setNewVenueEventDesc('');
                toast.success('Event hosted at your venue! ');
              }}
              className="w-full py-2.5 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90"
            >
              Host Event
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Your Hosted Events ({venueEvents.length})</h4>
            <div className="space-y-2">
              {venueEvents.map(evt => (
                <div key={evt.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground"> {evt.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Date: {evt.date} • Time: {evt.time} • Price: {evt.price} • Genre: {evt.genre}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-coffee/10 text-coffee rounded text-[9px] font-bold">Scheduled</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'book-artists' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4 font-display">Send Booking Offer to Artist</h3>
          <div className="space-y-4 mb-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Select Artist</label>
                <select
                  value={bookingArtistName}
                  onChange={e => setBookingArtistName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  <option value="Alex Rivera">Alex Rivera</option>
                  <option value="Lana Vibe">Lana Vibe</option>
                  <option value="Marcus Chen">Marcus Chen</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Compensation Offer ($ USD)</label>
                <input
                  type="number"
                  value={bookingPay}
                  onChange={e => setBookingPay(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Performance Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Performance Time Slot</label>
                <input
                  type="text"
                  value={bookingSlotTime}
                  onChange={e => setBookingSlotTime(e.target.value)}
                  placeholder="e.g. 8:00 PM - 10:00 PM"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="accommodation"
                checked={bookingAccommodation}
                onChange={e => setBookingAccommodation(e.target.checked)}
                className="rounded border-border text-coffee focus:ring-coffee/40"
              />
              <label htmlFor="accommodation" className="text-xs text-muted-foreground font-medium cursor-pointer">Include Travel / Accommodation expenses</label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Booking Notes & Set Expectations</label>
              <textarea
                rows={2}
                value={bookingNotes}
                onChange={e => setBookingNotes(e.target.value)}
                placeholder="e.g. 2x 45 min sets, covers welcome, sound check at 6 PM..."
                className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
              />
            </div>
            <button
              onClick={() => {
                setSentArtistOffers([
                  ...sentArtistOffers,
                  {
                    id: Date.now(),
                    artist: bookingArtistName,
                    date: bookingDate,
                    slotTime: bookingSlotTime,
                    pay: `$${bookingPay}`,
                    status: 'Pending',
                    notes: bookingNotes || 'No special requirements.',
                    accommodation: bookingAccommodation ? 'Yes' : 'No'
                  }
                ]);
                setBookingNotes('');
                toast.success(`Booking offer sent to ${bookingArtistName}! `);
              }}
              className="w-full py-2.5 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90"
            >
              Send Booking Offer
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Sent Artist Offers ({sentArtistOffers.length})</h4>
            <div className="space-y-2">
              {sentArtistOffers.map(offer => (
                <div key={offer.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground"> {offer.artist}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Date: {offer.date} • Pay: {offer.pay} • Travel Comp: {offer.accommodation}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${offer.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{offer.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reservations' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Manage Reservations</h3>
          <div className="space-y-2">
            {venueReservations.map(res => (
              <div key={res.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                <div>
                  <p className="font-semibold text-foreground">{res.table} ({res.guests} Guests)</p>
                  <p className="text-muted-foreground mt-0.5">Time: {res.time} • Status: {res.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingReservation(res)}
                    className="px-3 py-1.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px]"
                  >
                    View Details
                  </button>
                  {res.status === 'Confirmed' && (
                    <button
                      onClick={() => {
                        setVenueReservations(venueReservations.map(r => r.id === res.id ? { ...r, status: 'Checked In' } : r));
                        toast.success(`Checked in ${res.table}!`);
                      }}
                      className="px-3 py-1.5 bg-coffee text-white rounded-lg font-semibold hover:opacity-90 text-[10px]"
                    >
                      Check In
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audience' && (
        <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-coffee" />
                Audience Outreach Campaigns
              </h3>
              <p className="text-xs text-muted-foreground">
                Promote venue listings and upcoming live sets directly to verified music fans in Austin. Set radius ranges, daily budgets, and track engagement.
              </p>
            </div>
            <button
              onClick={() => setShowPromoModal(true)}
              className="px-5 py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90 transition-all shadow-warm whitespace-nowrap"
            >
              Launch New Campaign
            </button>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-4 tracking-wider">Running Ad Campaigns ({venueCampaigns.length})</h4>
            <div className="space-y-3">
              {venueCampaigns.map(camp => (
                <div key={camp.id} className="p-4 border border-border bg-muted/10 hover:bg-muted/20 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm">{camp.title}</p>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full font-bold text-[9px] uppercase tracking-wider animate-pulse">
                        {camp.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Featured Event: <strong className="text-foreground">{camp.eventName}</strong> • Radius: {camp.radius} • Goal: {camp.goal}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 self-start sm:self-center">
                    <div className="text-center sm:text-right">
                      <p className="text-[9px] text-muted-foreground uppercase font-semibold">Impressions</p>
                      <p className="font-bold text-foreground mt-0.5">{camp.impressions.toLocaleString()}</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[9px] text-muted-foreground uppercase font-semibold">Clicks</p>
                      <p className="font-bold text-foreground mt-0.5">{camp.clicks.toLocaleString()}</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[9px] text-muted-foreground uppercase font-semibold">Budget</p>
                      <p className="font-bold text-coffee mt-0.5">${camp.budget}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reservation Details Modal */}
      {viewingReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Reservation Info: {viewingReservation.table}</h4>
              <button onClick={() => setViewingReservation(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Guest Name</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingReservation.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Guests Count</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingReservation.guests} seats reserved</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Schedule Slot</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingReservation.time}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Status Badge</span>
                  <p className="font-semibold text-emerald-600 mt-0.5">{viewingReservation.status}</p>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Email Address</span>
                <p className="text-muted-foreground mt-0.5">{viewingReservation.email}</p>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border">
                <strong className="text-foreground block mb-0.5">Special Seating / Event Notes:</strong>
                <p className="text-muted-foreground leading-relaxed text-[11px]">{viewingReservation.notes || 'None.'}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {viewingReservation.status === 'Confirmed' && (
                  <button
                    onClick={() => {
                      setVenueReservations(venueReservations.map(r => r.id === viewingReservation.id ? { ...r, status: 'Checked In' } : r));
                      setViewingReservation(null);
                      toast.success(`Checked in guest for ${viewingReservation.table}!`);
                    }}
                    className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                  >
                    Check In Guest Now
                  </button>
                )}
                <button
                  onClick={() => setViewingReservation(null)}
                  className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Close Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ad Campaign Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Setup Local Ad Campaign</h4>
              <button onClick={() => setShowPromoModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Radius</label>
                  <select
                    value={promoRadius}
                    onChange={e => setPromoRadius(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="5">5 Miles (Neighborhood)</option>
                    <option value="10">10 Miles (City Wide)</option>
                    <option value="25">25 Miles (Metro Area)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Campaign Goal</label>
                  <select
                    value={promoGoal}
                    onChange={e => setPromoGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Increase Ticket Sales">Increase Ticket Sales</option>
                    <option value="Promote Brand">Promote Brand</option>
                    <option value="Promote Special Gig">Promote Special Gig</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Event to Feature</label>
                <select
                  value={promoEventId}
                  onChange={e => setPromoEventId(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  {venueEvents.map(evt => (
                    <option key={evt.id} value={evt.id}>{evt.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Ad Title Headline</label>
                <input
                  type="text"
                  required
                  value={promoAdTitle}
                  onChange={e => setPromoAdTitle(e.target.value)}
                  placeholder="e.g. Friday Night Jazz Live at Chords!"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Ad Copy Description</label>
                <textarea
                  required
                  rows={2}
                  value={promoAdDesc}
                  onChange={e => setPromoAdDesc(e.target.value)}
                  placeholder="Write a catchy line to pull in patrons..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Ad Budget ($ USD)</label>
                  <input
                    type="number"
                    value={promoBudget}
                    onChange={e => setPromoBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Payment Method</label>
                  <select className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none">
                    <option>Business Card (...5820)</option>
                    <option>Corporate Payout Fund</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    if (!promoAdTitle.trim() || !promoAdDesc.trim()) {
                      toast.error('Please enter Ad Headline and Description.');
                      return;
                    }
                    setPromoProcessing(true);
                    toast.info('Validating payment details and creating ad asset...');
                    setTimeout(() => {
                      setPromoProcessing(false);
                      setVenueCampaignsCount(venueCampaignsCount + 1);
                      const selectedEvent = venueEvents.find(e => e.id === Number(promoEventId));
                      setVenueCampaigns([
                        {
                          id: Date.now(),
                          title: promoAdTitle.trim(),
                          eventName: selectedEvent ? selectedEvent.name : 'Custom Promo',
                          radius: `${promoRadius} Miles`,
                          goal: promoGoal,
                          budget: Number(promoBudget),
                          status: 'Running',
                          impressions: 0,
                          clicks: 0
                        },
                        ...venueCampaigns
                      ]);
                      setPromoAdTitle('');
                      setPromoAdDesc('');
                      setShowPromoModal(false);
                      toast.success(`Ad Campaign "${promoAdTitle || 'Local Promo'}" launched! $${promoBudget} charged to card. `);
                    }, 1500);
                  }}
                  disabled={promoProcessing}
                  className="px-4 py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs flex-1 disabled:opacity-50"
                >
                  {promoProcessing ? 'Launching...' : 'Pay & Launch Campaign ($25)'}
                </button>
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="px-4 py-2.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
