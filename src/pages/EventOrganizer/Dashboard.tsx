import { useState } from 'react';
import {
  LayoutDashboard, Calendar, DollarSign, Users, Star, X, Music, Send, BarChart3
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Calendar, label: 'Create Event', id: 'create-event' },
  { icon: Music, label: 'Invite Artists', id: 'invite' },
  { icon: Users, label: 'Attendees', id: 'attendees' },
  { icon: BarChart3, label: 'Analyze Success', id: 'analyze' },
];

export default function EventOrganizerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // EVENT ORGANIZER STATES
  // ----------------------------------------------------
  const [orgEvents, setOrgEvents] = useState([
    { id: 1, name: 'Underground Beats Festival', date: 'Jul 20, 2026', ticketsSold: 120, capacity: 250, price: '$15' },
    { id: 2, name: 'Cafe Acoustic Series', date: 'Jul 27, 2026', ticketsSold: 45, capacity: 60, price: '$10' }
  ]);
  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Dave Miller', ticket: 'GA', status: 'Checked In', email: 'dave@gmail.com', serial: 'TKT-782-4521', date: 'Jun 28', notes: 'None.' },
    { id: 2, name: 'Emma Watson', ticket: 'VIP', status: 'Confirmed', email: 'emma@gmail.com', serial: 'TKT-249-1083', date: 'Jun 29', notes: 'Complementary drink ticket requested.' }
  ]);

  // Event Creation states
  const [newOrgEventName, setNewOrgEventName] = useState('');
  const [newOrgEventGenre, setNewOrgEventGenre] = useState('Acoustic Lounge');
  const [newOrgEventCapacity, setNewOrgEventCapacity] = useState('100');
  const [newOrgEventDate, setNewOrgEventDate] = useState('');
  const [newOrgEventTime, setNewOrgEventTime] = useState('');
  const [newOrgEventPrice, setNewOrgEventPrice] = useState('15');
  const [newOrgEventLocation, setNewOrgEventLocation] = useState('');
  const [newOrgEventDesc, setNewOrgEventDesc] = useState('');

  // Artist invite states
  const [invitedArtistsList, setInvitedArtistsList] = useState([
    { id: 1, name: 'Alex Rivera', event: 'Underground Beats Festival', pay: '$250', date: 'Jul 20, 2026', status: 'Pending' }
  ]);
  const [invitingArtist, setInvitingArtist] = useState<any | null>(null);
  const [showInviteArtistModal, setShowInviteArtistModal] = useState(false);
  const [selectedInviteEventId, setSelectedInviteEventId] = useState('1');
  const [invitePayoutOffer, setInvitePayoutOffer] = useState('250');

  // Manual attendee registration states
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeEmail, setNewAttendeeEmail] = useState('');
  const [newAttendeeTicket, setNewAttendeeTicket] = useState('GA');
  const [newAttendeeNotes, setNewAttendeeNotes] = useState('');
  const [viewingAttendee, setViewingAttendee] = useState<any | null>(null);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Event Organizer"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Events Organized', value: orgEvents.length, change: '', icon: Calendar, color: 'text-violet-500' },
              { label: 'Tickets Sold', value: orgEvents.reduce((sum, e) => sum + e.ticketsSold, 0), change: '', icon: DollarSign, color: 'text-emerald-500' },
              { label: 'Total Attendees', value: attendees.length, change: '', icon: Users, color: 'text-blue-500' },
              { label: 'Satisfaction Rate', value: '94%', change: '+2%', icon: Star, color: 'text-amber-500' },
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
            {/* Ticket sales progress */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4">Active Event Ticket Sales</h3>
              <div className="space-y-4">
                {orgEvents.map(event => {
                  const pct = Math.round((event.ticketsSold / event.capacity) * 100);
                  return (
                    <div key={event.id} className="text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-foreground">{event.name}</span>
                        <span className="text-muted-foreground font-semibold">{event.ticketsSold} / {event.capacity} sold ({pct}%)</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-coffee h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendee Status */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-4 font-display">Recent Attendee Check-ins</h3>
              <div className="space-y-3">
                {attendees.map(att => (
                  <div key={att.id} className="p-3 border border-border rounded-xl bg-muted/10 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground"> {att.name}</p>
                      <p className="text-muted-foreground mt-0.5">Ticket Type: {att.ticket}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-bold",
                      att.status === 'Checked In' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    )}>
                      {att.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'create-event' && (
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-start animate-in fade-in duration-200">
          {/* Create Event Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Create New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Event Name</label>
                <input
                  type="text"
                  value={newOrgEventName}
                  onChange={e => setNewOrgEventName(e.target.value)}
                  placeholder="e.g. Indie Wave Fest"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Event Genre / Category</label>
                  <select
                    value={newOrgEventGenre}
                    onChange={e => setNewOrgEventGenre(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="Acoustic Lounge">Acoustic Lounge</option>
                    <option value="Live Concert">Live Concert</option>
                    <option value="Festival">Festival</option>
                    <option value="Open Mic">Open Mic</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Ticket Capacity</label>
                  <input
                    type="number"
                    value={newOrgEventCapacity}
                    onChange={e => setNewOrgEventCapacity(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
                  <input
                    type="date"
                    value={newOrgEventDate}
                    onChange={e => setNewOrgEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Start Time</label>
                  <input
                    type="time"
                    value={newOrgEventTime}
                    onChange={e => setNewOrgEventTime(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Ticket Price ($ USD)</label>
                  <input
                    type="number"
                    value={newOrgEventPrice}
                    onChange={e => setNewOrgEventPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Venue / Performance Location</label>
                <input
                  type="text"
                  value={newOrgEventLocation}
                  onChange={e => setNewOrgEventLocation(e.target.value)}
                  placeholder="e.g. Main Concert Hall, Chords Cafe Garden Stage"
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Event Description</label>
                <textarea
                  rows={2}
                  value={newOrgEventDesc}
                  onChange={e => setNewOrgEventDesc(e.target.value)}
                  placeholder="Describe the lineup, schedule, attractions, food, or general info..."
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                />
              </div>
              <button
                onClick={() => {
                  if (!newOrgEventName.trim()) {
                    toast.error('Please enter an event name.');
                    return;
                  }
                  setOrgEvents([
                    ...orgEvents,
                    {
                      id: Date.now(),
                      name: newOrgEventName.trim(),
                      date: newOrgEventDate,
                      ticketsSold: 0,
                      capacity: parseInt(newOrgEventCapacity) || 100,
                      price: `$${newOrgEventPrice}`
                    }
                  ]);
                  setNewOrgEventName('');
                  setNewOrgEventDesc('');
                  toast.success('Event listing initialized! Ticket sales launched. ');
                }}
                className="w-full py-2.5 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-warm"
              >
                Launch Ticket Sales
              </button>
            </div>
          </div>

          {/* Running Programs & Ticket Sales */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Running Programs & Ticket Sales</h3>
            <p className="text-xs text-muted-foreground">Monitor real-time attendee sign-ups, ticket quotas, and schedule dates for active concert events.</p>
            
            <div className="space-y-3.5">
              {orgEvents.map(evt => {
                const percent = Math.min(100, Math.round((evt.ticketsSold / evt.capacity) * 100)) || 0;
                return (
                  <div key={evt.id} className="p-4 border border-border bg-muted/15 rounded-xl text-xs space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{evt.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Date: {evt.date} • Price: {evt.price}</p>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        percent >= 100 ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600 animate-pulse"
                      )}>
                        {percent >= 100 ? 'Sold Out' : 'Active'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Tickets Sold</span>
                        <span className="font-semibold text-foreground">{evt.ticketsSold} / {evt.capacity} ({percent}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted border border-border rounded-full overflow-hidden">
                        <div className="h-full bg-coffee rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'invite' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4 text-left animate-in fade-in duration-200">
          <div className="text-center mb-2">
            <Music className="w-8 h-8 text-coffee mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-2">Invite Artists to Lineup</h3>
            <p className="text-xs text-muted-foreground">Browse verified musicians on the platform and invite them to perform at your festival/event lineup.</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Alex Rivera', genre: 'Acoustic / Indie Folk', rate: '$250 - $400', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
              { name: 'Lana Vibe', genre: 'Indie Pop / Electronic', rate: '$350 - $500', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
              { name: 'Marcus Chen', genre: 'Piano / Live Loop', rate: '$300 - $450', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
            ].map(art => {
              const isAlreadyInvited = invitedArtistsList.some(inv => inv.name === art.name);
              return (
                <div key={art.name} className="flex items-center justify-between p-3 border border-border rounded-xl bg-muted/15 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={art.avatar} alt={art.name} className="w-10 h-10 rounded-full object-cover border-border" />
                    <div>
                      <p className="font-semibold text-foreground">{art.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{art.genre} • Standard Set: {art.rate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setInvitingArtist(art);
                      setShowInviteArtistModal(true);
                    }}
                    disabled={isAlreadyInvited}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-[10px] transition-colors ${
                      isAlreadyInvited ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-coffee text-white hover:opacity-90'
                    }`}
                  >
                    {isAlreadyInvited ? 'Invited' : `Invite ${art.name.split(' ')[0]}`}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Lineup Invitations History ({invitedArtistsList.length})</h4>
            <div className="space-y-2">
              {invitedArtistsList.map(inv => (
                <div key={inv.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/10 text-xs">
                  <div>
                    <p className="font-semibold text-foreground"> {inv.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Event: {inv.event} • Payout Offer: {inv.pay} • Date: {inv.date}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-bold">{inv.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendees' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6 text-left animate-in fade-in duration-200">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Register New Attendee Manually</h3>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newAttendeeName}
                    onChange={e => setNewAttendeeName(e.target.value)}
                    placeholder="e.g. Liam Neeson"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newAttendeeEmail}
                    onChange={e => setNewAttendeeEmail(e.target.value)}
                    placeholder="e.g. liam@taken.com"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Ticket Tier</label>
                  <select
                    value={newAttendeeTicket}
                    onChange={e => setNewAttendeeTicket(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="GA">General Admission (GA)</option>
                    <option value="VIP">VIP Pass</option>
                    <option value="Early Bird">Early Bird</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-foreground mb-1">Special Assistance / Requests</label>
                  <input
                    type="text"
                    value={newAttendeeNotes}
                    onChange={e => setNewAttendeeNotes(e.target.value)}
                    placeholder="e.g. complementary beverage, front row seat..."
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!newAttendeeName.trim() || !newAttendeeEmail.trim()) {
                    toast.error('Please fill in name and email address.');
                    return;
                  }
                  setAttendees([
                    ...attendees,
                    {
                      id: Date.now(),
                      name: newAttendeeName,
                      ticket: newAttendeeTicket,
                      status: 'Confirmed',
                      email: newAttendeeEmail,
                      serial: `TKT-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
                      date: 'Jun 29',
                      notes: newAttendeeNotes || 'None.'
                    }
                  ]);
                  setNewAttendeeName('');
                  setNewAttendeeEmail('');
                  setNewAttendeeNotes('');
                  toast.success('Attendee registered manually! Badge and ticket serial generated.');
                }}
                className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
              >
                Register Attendee
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-foreground mb-4 font-display">Attendee Check-in Desk</h3>
            <div className="space-y-2">
              {attendees.map(att => (
                <div key={att.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground"> {att.name}</p>
                    <p className="text-muted-foreground mt-0.5">Ticket: {att.ticket} • Status: {att.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingAttendee(att)}
                      className="px-3 py-1.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg text-[10px]"
                    >
                      View
                    </button>
                    {att.status === 'Confirmed' && (
                      <button
                        onClick={() => {
                          setAttendees(attendees.map(a => a.id === att.id ? { ...a, status: 'Checked In' } : a));
                          toast.success(`Checked in ${att.name}! `);
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
        </div>
      )}

      {activeTab === 'analyze' && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6 text-left animate-in fade-in duration-200">
          <div className="text-center mb-4">
            <BarChart3 className="w-8 h-8 text-coffee mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-2">Analyze Success</h3>
            <p className="text-xs text-muted-foreground">View real-time event analytics and export detailed registration reports.</p>
          </div>

          {/* Graphic Charts */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-border p-4 rounded-xl bg-muted/10">
              <h4 className="text-[11px] font-bold text-muted-foreground uppercase mb-3">Ticket Sales Revenue</h4>
              <div className="space-y-3.5">
                {[
                  { name: 'Underground Beats Festival', amount: 12500, max: 25000, color: 'bg-emerald-500' },
                  { name: 'Cafe Acoustic Series', amount: 1275, max: 2000, color: 'bg-amber-500' },
                  { name: 'Indie Wave Fest', amount: 3750, max: 5000, color: 'bg-coffee' }
                ].map(bar => {
                  const pct = Math.round((bar.amount / bar.max) * 100);
                  return (
                    <div key={bar.name} className="text-[10px]">
                      <div className="flex justify-between items-center mb-1 font-medium">
                        <span className="text-foreground truncate max-w-[120px]">{bar.name}</span>
                        <span className="text-muted-foreground">${bar.amount.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", bar.color)} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-border p-4 rounded-xl bg-muted/10">
              <h4 className="text-[11px] font-bold text-muted-foreground uppercase mb-3">Attendee Satisfaction Rating</h4>
              <div className="space-y-3.5">
                {[
                  { group: 'VIP Patrons', rating: 98, color: 'bg-emerald-500' },
                  { group: 'General Admission', rating: 92, color: 'bg-violet-500' },
                  { group: 'Early Bird Users', rating: 89, color: 'bg-blue-500' }
                ].map(bar => (
                  <div key={bar.group} className="text-[10px]">
                    <div className="flex justify-between items-center mb-1 font-medium">
                      <span className="text-foreground">{bar.group}</span>
                      <span className="text-muted-foreground">{bar.rating}% Approval</span>
                    </div>
                    <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", bar.color)} style={{ width: `${bar.rating}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,"
                + "Event Name,Date,Tickets Sold,Capacity,Revenue,Satisfaction\n"
                + orgEvents.map(e => `"${e.name}",${e.date},${e.ticketsSold},${e.capacity},${e.price},94%`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "Event_Success_Report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast.success('Spreadsheet success report downloaded! ');
            }}
            className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90"
          >
            Export Report
          </button>
        </div>
      )}

      {/* Invite Artist setup modal */}
      {showInviteArtistModal && invitingArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Invite to Lineup: {invitingArtist.name}</h4>
              <button onClick={() => { setShowInviteArtistModal(false); setInvitingArtist(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Lineup Event</label>
                <select
                  value={selectedInviteEventId}
                  onChange={e => setSelectedInviteEventId(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                >
                  {orgEvents.map(evt => (
                    <option key={evt.id} value={evt.id}>{evt.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Compensation Offer ($ USD)</label>
                <input
                  type="number"
                  value={invitePayoutOffer}
                  onChange={e => setInvitePayoutOffer(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                />
              </div>

              <div className="bg-muted/30 p-2.5 rounded-xl border border-border leading-relaxed text-[10px] text-muted-foreground">
                 Dispatching this offer sends an invitation contract to the artist dashboard. Once they accept, they will join the event lineup catalog.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const ev = orgEvents.find(e => e.id.toString() === selectedInviteEventId);
                    setInvitedArtistsList([
                      ...invitedArtistsList,
                      {
                        id: Date.now(),
                        name: invitingArtist.name,
                        event: ev ? ev.name : 'Unknown Event',
                        pay: `$${invitePayoutOffer}`,
                        date: ev ? ev.date : 'Aug 15',
                        status: 'Pending'
                      }
                    ]);
                    toast.success(`Performance invitation successfully dispatched to ${invitingArtist.name}! `);
                    setShowInviteArtistModal(false);
                    setInvitingArtist(null);
                  }}
                  className="px-4 py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                >
                  Send Lineup Invite
                </button>
                <button
                  onClick={() => { setShowInviteArtistModal(false); setInvitingArtist(null); }}
                  className="px-4 py-2.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendee Details Modal */}
      {viewingAttendee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Ticket Details: {viewingAttendee.name}</h4>
              <button onClick={() => setViewingAttendee(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Guest Name</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingAttendee.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Ticket Tier</span>
                  <p className="font-semibold text-foreground mt-0.5">{viewingAttendee.ticket}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Ticket Serial</span>
                  <p className="font-mono font-semibold text-foreground mt-0.5">{viewingAttendee.serial}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Check-in Status</span>
                  <p className={cn("font-semibold mt-0.5", viewingAttendee.status === 'Checked In' ? 'text-emerald-600' : 'text-amber-600')}>{viewingAttendee.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Email Address</span>
                  <p className="text-muted-foreground mt-0.5">{viewingAttendee.email}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Registered On</span>
                  <p className="text-muted-foreground mt-0.5">{viewingAttendee.date}</p>
                </div>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border">
                <strong className="text-foreground block mb-0.5">Special Assistance / Requests:</strong>
                <p className="text-muted-foreground leading-relaxed text-[11px]">{viewingAttendee.notes}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {viewingAttendee.status === 'Confirmed' && (
                  <button
                    onClick={() => {
                      setAttendees(attendees.map(a => a.id === viewingAttendee.id ? { ...a, status: 'Checked In' } : a));
                      setViewingAttendee(null);
                      toast.success(`Checked in ${viewingAttendee.name}!`);
                    }}
                    className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                  >
                    Check In Guest
                  </button>
                )}
                <button
                  onClick={() => setViewingAttendee(null)}
                  className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
