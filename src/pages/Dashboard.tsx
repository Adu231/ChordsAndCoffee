import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Music, Calendar, Users, BarChart3, Settings, Star,
  TrendingUp, DollarSign, Eye, Heart, MessageSquare, Play, Plus,
  Bell, Search, Menu, X, Coffee, LogOut, ChevronRight, Mic2,
  BookOpen, MapPin, Clock, User, Award, Shield, CheckCircle, Video, BookMarked, HelpCircle,
  FileText, Check, AlertCircle, PlusCircle, Share2, Trash2, Send
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Helper revenue/streams data for charts
const chartData = [
  { month: 'Jan', revenue: 1200, streams: 2400, impressions: 18000 },
  { month: 'Feb', revenue: 1800, streams: 3100, impressions: 22000 },
  { month: 'Mar', revenue: 1500, streams: 2800, impressions: 25000 },
  { month: 'Apr', revenue: 2400, streams: 4200, impressions: 38000 },
  { month: 'May', revenue: 2900, streams: 4900, impressions: 45000 },
  { month: 'Jun', revenue: 3500, streams: 6100, impressions: 58000 },
  { month: 'Jul', revenue: 4800, streams: 8500, impressions: 72000 },
];

const getNavItemsForRole = (role: string) => {
  switch (role) {
    case 'fan':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Search, label: 'Discover Artists', id: 'discover' },
        { icon: Calendar, label: 'Attend Events', id: 'events' },
        { icon: Users, label: 'Join Communities', id: 'community' },
        { icon: Heart, label: 'Support Creators', id: 'support' },
      ];
    case 'musician':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: User, label: 'Artist Profile', id: 'profile-setup' },
        { icon: Music, label: 'Upload Portfolio', id: 'portfolio' },
        { icon: Calendar, label: 'Book Performances', id: 'booking' },
        { icon: Users, label: 'Collaborate', id: 'collab' },
        { icon: DollarSign, label: 'Monetize Music', id: 'monetize' },
      ];
    case 'teacher':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: BookOpen, label: 'Create Courses', id: 'courses' },
        { icon: Video, label: 'Conduct Workshops', id: 'workshops' },
        { icon: Users, label: 'Mentor Students', id: 'mentorship' },
        { icon: DollarSign, label: 'Earn Revenue', id: 'revenue' },
      ];
    case 'venue':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Coffee, label: 'List Venue', id: 'venue-profile' },
        { icon: Calendar, label: 'Host Events', id: 'host-events' },
        { icon: Music, label: 'Book Artists', id: 'book-artists' },
        { icon: Users, label: 'Manage Reservations', id: 'reservations' },
        { icon: TrendingUp, label: 'Grow Audience', id: 'audience' },
      ];
    case 'organizer':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Plus, label: 'Create Event', id: 'create-event' },
        { icon: Users, label: 'Invite Artists', id: 'invite' },
        { icon: DollarSign, label: 'Sell Tickets', id: 'tickets' },
        { icon: Users, label: 'Manage Attendees', id: 'attendees' },
        { icon: BarChart3, label: 'Analyze Success', id: 'analyze' },
      ];
    case 'sponsor':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Search, label: 'Discover Artists', id: 'discover-talent' },
        { icon: Award, label: 'Sponsor Events', id: 'sponsorships' },
        { icon: TrendingUp, label: 'Launch Campaigns', id: 'campaigns' },
        { icon: BarChart3, label: 'Measure Engagement', id: 'metrics' },
      ];
    case 'admin':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Shield, label: 'Manage Platform', id: 'manage-platform' },
        { icon: CheckCircle, label: 'Verify Artists', id: 'verify-artists' },
        { icon: MessageSquare, label: 'Moderate Content', id: 'moderation' },
        { icon: DollarSign, label: 'Monitor Revenue', id: 'revenue-split' },
      ];
    default:
      return [{ icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' }];
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ----------------------------------------------------
  // STATE MANAGEMENT FOR DEMO ROLES (Reactive Workflows)
  // ----------------------------------------------------

  // Notifications State
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, text: "Alex Rivera uploaded a new track: 'Midnight Jazz'!", read: false, time: '2h ago' },
    { id: 2, text: "Your ticket for Open Mic Night at The Grind Café is confirmed! 🎫", read: false, time: '1d ago' },
    { id: 3, text: "New discussion started in Acoustic Fans: 'Who is going?'", read: true, time: '2d ago' },
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // 4.1 Music Lover States
  const [followedArtists, setFollowedArtists] = useState<string[]>(['Alex Rivera']);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['Acoustic Fans']);
  const [tipsSent, setTipsSent] = useState<{ artist: string; amount: number }[]>([]);
  const [customTipAmount, setCustomTipAmount] = useState('10');
  const [selectedTipArtist, setSelectedTipArtist] = useState('Alex Rivera');
  
  // Event Booking & Details States
  const [bookingEvent, setBookingEvent] = useState<{ id: number; title: string; venue: string; date: string; time: string; price: string; desc: string; address: string; lineup: string } | null>(null);
  const [viewingEvent, setViewingEvent] = useState<{ id: number; title: string; venue: string; date: string; time: string; price: string; desc: string; address: string; lineup: string } | null>(null);
  const [ticketName, setTicketName] = useState(user.name);
  const [ticketEmail, setTicketEmail] = useState(user.email);
  const [ticketQty, setTicketQty] = useState('1');
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'Dave', text: "Loved Alex's performance last week! Anyone going to the next one?", community: 'Acoustic Fans' },
    { id: 2, author: 'Clara', text: 'The Grind Cafe has the best acoustics in town.', community: 'Acoustic Fans' },
  ]);
  const [newPostText, setNewPostText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('Acoustic Fans');
  const [joiningCommunity, setJoiningCommunity] = useState<{ name: string; members: string; desc: string; rules: string } | null>(null);

  // 4.2 Musician States
  const [portfolioTracks, setPortfolioTracks] = useState([
    { id: 1, title: 'Café Mornings', plays: 12400, likes: 847, status: 'Released' },
    { id: 2, title: 'Golden Hours', plays: 9200, likes: 614, status: 'Released' },
    { id: 3, title: 'Midnight Jazz', plays: 7800, likes: 502, status: 'Demo' },
  ]);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackGenre, setNewTrackGenre] = useState('Acoustic');
  const [gigOffers, setGigOffers] = useState([
    { id: 1, venue: 'The Grind Café', date: 'Jul 15', pay: '$250', status: 'Pending' },
    { id: 2, venue: 'Brew & Strum', date: 'Jul 22', pay: '$180', status: 'Confirmed' },
    { id: 3, venue: 'Notes & Beans', date: 'Aug 05', pay: '$400', status: 'Pending' },
  ]);
  const [collabList, setCollabList] = useState([
    { id: 1, title: 'Guitarist needed for indie folk ballad', creator: 'Marcus Chen', status: 'Open' },
    { id: 2, title: 'Looking for vocalist for jazz duet', creator: 'Lana Vibe', status: 'In Progress' },
  ]);
  const [newCollabTitle, setNewCollabTitle] = useState('');
  // Digital Storefront
  const [storeTracks, setStoreTracks] = useState([
    { id: 1, title: 'Café Mornings EP', price: 9.99 },
    { id: 2, title: 'Unplugged Sessions Album', price: 14.99 }
  ]);
  const [storeTrackTitle, setStoreTrackTitle] = useState('');
  const [storeTrackPrice, setStoreTrackPrice] = useState('9.99');

  // 4.3 Music Teacher States
  const [teacherEarnings, setTeacherEarnings] = useState(4250);
  const [teacherCourses, setTeacherCourses] = useState([
    { id: 1, title: 'Acoustic Guitar 101', level: 'Beginner', students: 12, price: '$49' },
    { id: 2, title: 'Piano Improvisation Basics', level: 'Intermediate', students: 8, price: '$79' },
  ]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseLevel, setNewCourseLevel] = useState('Beginner');
  const [newCoursePrice, setNewCoursePrice] = useState('49');

  const [teacherWorkshops, setTeacherWorkshops] = useState([
    { id: 1, title: 'Jazz Chords Mastery', date: 'Jul 12', seatsLeft: 5, price: '$15' },
    { id: 2, title: 'Folk Songwriting Tips', date: 'Jul 28', seatsLeft: 12, price: '$20' },
  ]);
  const [newWorkshopTitle, setNewWorkshopTitle] = useState('');
  const [newWorkshopDate, setNewWorkshopDate] = useState('2026-07-12');

  const [mentorshipStudents, setMentorshipStudents] = useState([
    { id: 1, name: 'John Doe', notes: 'Needs practice with pentatonic scale', lastMeeting: 'Jun 25' },
    { id: 2, name: 'Jane Smith', notes: 'Working on rhythm patterns', lastMeeting: 'Jun 28' },
  ]);
  const [newStudentName, setNewStudentName] = useState('');

  // 4.4 Café / Venue Owner States
  const [venueCapacity, setVenueCapacity] = useState('120');
  const [venueAddress, setVenueAddress] = useState('123 Brew St, Austin, TX');
  const [venueStatus, setVenueStatus] = useState('Listed & Active');
  const [venueCampaignsCount, setVenueCampaignsCount] = useState(2);
  const [venueEvents, setVenueEvents] = useState([
    { id: 1, name: 'Open Mic Night', date: 'Jul 05', time: '8:00 PM', price: 'Free' },
    { id: 2, name: 'Acoustic Set Live', date: 'Jul 12', time: '7:30 PM', price: '$10' },
  ]);
  const [newVenueEventName, setNewVenueEventName] = useState('');
  const [newVenueEventDate, setNewVenueEventDate] = useState('Jul 20');

  const [venueReservations, setVenueReservations] = useState([
    { id: 1, table: 'Table 4', guests: 4, time: '7:00 PM', status: 'Checked In' },
    { id: 2, table: 'Table 1', guests: 2, time: '7:30 PM', status: 'Confirmed' },
    { id: 3, table: 'VIP Section', guests: 6, time: '8:00 PM', status: 'Confirmed' },
  ]);

  const [sentArtistOffers, setSentArtistOffers] = useState([
    { id: 1, artist: 'Alex Rivera', date: 'Jul 24', pay: '$250', status: 'Pending' },
    { id: 2, artist: 'Marcus Chen', date: 'Jul 30', pay: '$300', status: 'Accepted' },
  ]);
  const [bookingArtistName, setBookingArtistName] = useState('Alex Rivera');
  const [bookingPay, setBookingPay] = useState('200');

  // 4.5 Event Organizer States
  const [orgEvents, setOrgEvents] = useState([
    { id: 1, name: 'Underground Beats Festival', date: 'Aug 15', ticketsSold: 250, capacity: 500, price: '$50' },
    { id: 2, name: 'Cafe Acoustic Series', date: 'Jul 29', ticketsSold: 85, capacity: 100, price: '$15' },
  ]);
  const [newOrgEventName, setNewOrgEventName] = useState('');
  const [newOrgEventDate, setNewOrgEventDate] = useState('Aug 20');
  const [newOrgEventCapacity, setNewOrgEventCapacity] = useState('150');

  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Tommy Cooper', ticket: 'VIP', status: 'Confirmed' },
    { id: 2, name: 'Sarah Connor', ticket: 'GA', status: 'Checked In' },
    { id: 3, name: 'Emily Johnson', ticket: 'GA', status: 'Confirmed' },
  ]);
  const [newAttendeeName, setNewAttendeeName] = useState('');

  // 4.6 Brand / Sponsor States
  const [sponsorCampaigns, setSponsorCampaigns] = useState([
    { id: 1, name: 'Summer Brew Banner Ads', impressions: '45K', clicks: 1240, ctr: '2.7%' },
    { id: 2, name: 'VibeBrew Coffee Promo Code', impressions: '83K', clicks: 3580, ctr: '4.3%' },
  ]);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [sponsoredEvents, setSponsoredEvents] = useState<string[]>(['Underground Beats Festival']);

  // Sponsor ROI Calculator Form
  const [roiBudget, setRoiBudget] = useState('500');
  const [roiConversions, setRoiConversions] = useState('120');
  const [roiAvgSale, setRoiAvgSale] = useState('15');

  // 4.7 Admin States
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: 'Lana Vibe', genre: 'Synth Folk', joined: '1 week ago' },
    { id: 2, name: 'The Coffee Grinders', genre: 'Acoustic Blues', joined: '3 days ago' },
  ]);
  const [moderationReports, setModerationReports] = useState([
    { id: 1, message: 'This venue is a scam!', author: 'User102', reason: 'Harassment' },
    { id: 2, message: 'Click here to win a free guitar (spam-link)', author: 'Spammer99', reason: 'Spam' },
  ]);
  const [platformFeePercentage, setPlatformFeePercentage] = useState('10%');

  // Guard: Redirect to login if user isn't authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-coffee/10 flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-8 h-8 text-coffee" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access your dashboard.</p>
          <Link to="/login" className="px-6 py-3 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all">Sign In</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Signed out successfully');
  };

  const navItems = getNavItemsForRole(user.role);

  // Determine Role Label
  let roleLabel = '';
  switch (user.role) {
    case 'fan': roleLabel = 'Music Lover'; break;
    case 'musician': roleLabel = 'Musician'; break;
    case 'teacher': roleLabel = 'Music Teacher'; break;
    case 'venue': roleLabel = 'Café / Venue Owner'; break;
    case 'organizer': roleLabel = 'Event Organizer'; break;
    case 'sponsor': roleLabel = 'Brand / Sponsor'; break;
    case 'admin': roleLabel = 'Admin'; break;
    default: roleLabel = user.role;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col border-r border-sidebar-border transition-transform duration-300 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Coffee className="w-4 h-4 text-amber-200" />
            </div>
            <span className="font-display font-bold text-sm text-sidebar-foreground">ChordsAndCoffee</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-sidebar-border bg-sidebar-accent/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/60">{roleLabel} Panel</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                activeTab === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm font-semibold'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent mb-3">
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-gold/40" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
            </div>
            {user.verified && <Award className="w-4 h-4 text-gold flex-shrink-0" />}
          </div>
          <div className="space-y-1">
            <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <Settings className="w-3.5 h-3.5" /> Settings
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs text-destructive hover:bg-sidebar-accent transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center gap-4 h-16 px-4 lg:px-6 border-b border-border bg-background flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/30 border border-border"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-coffee/10 text-coffee border border-coffee/20">{roleLabel}</span>
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                onBlur={() => setTimeout(() => setShowNotificationsDropdown(false), 200)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <Bell className="w-4.5 h-4.5" />
                {notificationsList.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-warm-lg overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-border flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground">Notifications</span>
                    {notificationsList.some(n => !n.read) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
                          toast.success('All marked as read');
                        }}
                        className="text-[10px] text-coffee font-semibold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-border/60">
                    {notificationsList.length === 0 ? (
                      <p className="p-4 text-xs text-muted-foreground text-center">No notifications</p>
                    ) : (
                      notificationsList.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotificationsList(notificationsList.map(item => item.id === n.id ? { ...item, read: true } : item));
                            toast.info(n.text);
                          }}
                          className={cn(
                            "p-3 text-left transition-colors cursor-pointer hover:bg-muted/40",
                            !n.read ? "bg-coffee/5" : ""
                          )}
                        >
                          <p className={cn("text-xs text-foreground leading-relaxed", !n.read ? "font-semibold" : "")}>{n.text}</p>
                          <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link to="/profile" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-gold/30" />
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin">
          <div className="max-w-6xl mx-auto">
            {/* Greeting */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground">
                  Hello, {user.name.split(' ')[0]} 👋
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Here is your tailored workspace. Let's start the flow.</p>
              </div>
            </div>

            {/* Render Dashboard based on role */}

            {/* ========================================== */}
            {/* 4.1 MUSIC LOVER DASHBOARD (fan)            */}
            {/* ========================================== */}
            {user.role === 'fan' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
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
                                  <span>☕ Sent coffee to <strong>{tip.artist}</strong></span>
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
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4">Discover Local Artists</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { name: 'Alex Rivera', genre: 'Acoustic / Folk', followers: '1,247', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
                        { name: 'Lana Vibe', genre: 'Ambient Synth', followers: '890', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
                        { name: 'Marcus Chen', genre: 'Jazz Piano', followers: '2.1K', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
                      ].map(artist => (
                        <div key={artist.name} className="border border-border p-4 rounded-xl flex flex-col justify-between items-center text-center bg-muted/20">
                          <img src={artist.img} className="w-16 h-16 rounded-full object-cover border-2 border-coffee/30 mb-3" />
                          <h4 className="font-semibold text-sm text-foreground">{artist.name}</h4>
                          <p className="text-xs text-muted-foreground mb-4">{artist.genre} • {artist.followers} fans</p>
                          <div className="w-full">
                            <button
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
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-6">
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

                    {/* Reservation Form Card */}
                    {bookingEvent && (
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-display font-semibold text-lg text-foreground">🎟️ Reserve Tickets for {bookingEvent.title}</h4>
                          <button onClick={() => setBookingEvent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!ticketName.trim() || !ticketEmail.trim()) {
                              toast.error('Name and Email are required.');
                              return;
                            }
                            setRegisteredEvents([...registeredEvents, bookingEvent.id]);
                            setBookingEvent(null);
                            toast.success(`Reserved ${ticketQty} ticket(s) for ${bookingEvent.title} successfully! 🎫`);
                          }}
                          className="space-y-4"
                        >
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
                              Confirm Reservation
                            </button>
                            <button type="button" onClick={() => setBookingEvent(null)} className="px-5 py-2.5 border border-border text-xs rounded-xl text-muted-foreground hover:bg-muted">
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Details Card */}
                    {viewingEvent && (
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-display font-semibold text-lg text-foreground">📋 Event Details: {viewingEvent.title}</h4>
                          <button onClick={() => setViewingEvent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-3 text-xs">
                          <p className="text-muted-foreground leading-relaxed">{viewingEvent.desc}</p>
                          <div className="grid sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <strong className="text-foreground">📍 Venue & Address:</strong>
                              <p className="text-muted-foreground mt-0.5">{viewingEvent.venue} ({viewingEvent.address})</p>
                            </div>
                            <div>
                              <strong className="text-foreground">⏰ Timing & Cost:</strong>
                              <p className="text-muted-foreground mt-0.5">{viewingEvent.date} · {viewingEvent.time} · {viewingEvent.price}</p>
                            </div>
                          </div>
                          <div className="pt-2">
                            <strong className="text-foreground">🎤 Lineup:</strong>
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
                  <div className="space-y-6">
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
                        <h3 className="font-semibold text-foreground mb-3">💬 {selectedCommunity} Chat</h3>
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
                          <h4 className="font-display font-semibold text-lg text-foreground">💬 Community Hub: {joiningCommunity.name}</h4>
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
                                    toast.success(`Welcome to the ${joiningCommunity.name} community! 🎉`);
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
                  <div className="bg-card rounded-2xl border border-border p-6 max-w-lg mx-auto">
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
              </>
            )}

            {/* ========================================== */}
            {/* 4.2 MUSICIAN DASHBOARD (musician)          */}
            {/* ========================================== */}
            {user.role === 'musician' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Followers', value: user.followers, change: '+12%', icon: Heart, color: 'text-rose-500' },
                        { label: 'Gigs Booked', value: gigOffers.filter(g => g.status === 'Confirmed').length, change: '', icon: Calendar, color: 'text-violet-500' },
                        { label: 'Portfolio Tracks', value: portfolioTracks.length, change: '', icon: Music, color: 'text-amber-500' },
                        { label: 'Tipping Earnings', value: '$740', change: '+24%', icon: DollarSign, color: 'text-emerald-500' },
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

                {activeTab === 'profile-setup' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-2xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Edit Artist Profile</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <img src={user.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-coffee" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">{user.name}</h4>
                          <p className="text-xs text-muted-foreground">Signed in as Musician</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Artist Name</label>
                          <input type="text" defaultValue={user.name} className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Location</label>
                          <input type="text" defaultValue={user.location} className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Bio</label>
                        <textarea defaultValue={user.bio} rows={3} className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none" />
                      </div>
                      <button onClick={() => toast.success('Artist profile saved successfully!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                        Save Profile
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
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
                      <button
                        onClick={() => {
                          if (!newTrackTitle.trim()) return;
                          setPortfolioTracks([...portfolioTracks, { id: Date.now(), title: newTrackTitle, plays: 0, likes: 0, status: 'Released' }]);
                          setNewTrackTitle('');
                          toast.success('Track uploaded and listed in portfolio! 🎧');
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
                            <span className="font-medium text-foreground">🎵 {track.title}</span>
                            <span className="text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-full">{track.plays} plays</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'booking' && (
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4 font-display">Performance Booking Invites</h3>
                    <div className="space-y-3">
                      {gigOffers.map(gig => (
                        <div key={gig.id} className="flex flex-wrap justify-between items-center p-4 border border-border rounded-xl bg-muted/10 text-xs">
                          <div>
                            <p className="font-semibold text-sm text-foreground">🏟️ Gig at {gig.venue}</p>
                            <p className="text-muted-foreground mt-0.5">Date: {gig.date} • Offer Pay: <strong className="text-emerald-600 font-semibold">{gig.pay}</strong></p>
                          </div>
                          <div className="flex gap-2">
                            {gig.status === 'Pending' ? (
                              <>
                                <button
                                  onClick={() => {
                                    setGigOffers(gigOffers.map(g => g.id === gig.id ? { ...g, status: 'Confirmed' } : g));
                                    toast.success(`Gig booking for ${gig.venue} accepted! 📅`);
                                  }}
                                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:opacity-90"
                                >
                                  Accept Offer
                                </button>
                                <button
                                  onClick={() => {
                                    setGigOffers(gigOffers.filter(g => g.id !== gig.id));
                                    toast.info('Gig booking declined');
                                  }}
                                  className="px-3 py-1.5 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted-foreground/10 border border-border"
                                >
                                  Decline
                                </button>
                              </>
                            ) : (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">{gig.status}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'collab' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Musician Collaboration Requests</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newCollabTitle}
                        onChange={e => setNewCollabTitle(e.target.value)}
                        placeholder="Need a vocalist/guitarist..."
                        className="flex-1 px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (!newCollabTitle.trim()) return;
                          setCollabList([...collabList, { id: Date.now(), title: newCollabTitle, creator: user.name, status: 'Open' }]);
                          setNewCollabTitle('');
                          toast.success('Collaboration request posted to board!');
                        }}
                        className="px-4 py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Post
                      </button>
                    </div>

                    <div className="space-y-3">
                      {collabList.map(collab => (
                        <div key={collab.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{collab.title}</p>
                            <p className="text-muted-foreground mt-0.5">Posted by: @{collab.creator}</p>
                          </div>
                          <button onClick={() => toast.success(`Sent chat request to ${collab.creator}!`)} className="px-3 py-1 bg-coffee text-white font-semibold rounded-lg text-[10px]">
                            Join Collab
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'monetize' && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="bg-card rounded-2xl border border-border p-5">
                      <h3 className="font-semibold text-foreground mb-4">Music Monetization Portal</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border border-border p-4 rounded-xl bg-muted/20 text-center">
                          <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                          <h4 className="font-bold text-lg text-foreground">$1,420</h4>
                          <p className="text-[10px] text-muted-foreground">Streaming Payouts</p>
                        </div>
                        <div className="border border-border p-4 rounded-xl bg-muted/20 text-center">
                          <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                          <h4 className="font-bold text-lg text-foreground">$740</h4>
                          <p className="text-[10px] text-muted-foreground">Fan Tipping Jar</p>
                        </div>
                      </div>
                      <div className="border-t border-border pt-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Live Fan Tipping History</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
                            <span>☕ Emily Johnson tipped: "Love your latest demo track!"</span>
                            <strong className="text-emerald-600 font-semibold">$10.00</strong>
                          </div>
                          <div className="flex justify-between items-center text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
                            <span>☕ Dave Vance (Sponsor) tipped: "Keep it up!"</span>
                            <strong className="text-emerald-600 font-semibold">$50.00</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Digital Storefront */}
                    <div className="bg-card rounded-2xl border border-border p-5">
                      <h3 className="font-semibold text-foreground mb-4">Digital Storefront Manager</h3>
                      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-muted/25 border border-border p-4 rounded-xl">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Track / Album Title</label>
                          <input
                            type="text"
                            value={storeTrackTitle}
                            onChange={e => setStoreTrackTitle(e.target.value)}
                            placeholder="e.g. Café Sessions EP"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div className="w-full sm:w-28">
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Price ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={storeTrackPrice}
                            onChange={e => setStoreTrackPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (!storeTrackTitle.trim() || !storeTrackPrice) {
                              toast.error('Please enter a track name and price.');
                              return;
                            }
                            setStoreTracks([...storeTracks, { id: Date.now(), title: storeTrackTitle, price: parseFloat(storeTrackPrice) }]);
                            setStoreTrackTitle('');
                            setStoreTrackPrice('9.99');
                            toast.success(`Track "${storeTrackTitle}" added to storefront! 💿`);
                          }}
                          className="sm:self-end px-5 py-2.5 bg-coffee text-white font-semibold text-xs rounded-lg hover:opacity-90 whitespace-nowrap"
                        >
                          List Track
                        </button>
                      </div>

                      <div className="space-y-2">
                        {storeTracks.map(track => (
                          <div key={track.id} className="flex justify-between items-center text-xs bg-muted/15 p-3 rounded-xl border border-border">
                            <span className="font-semibold text-foreground">💿 {track.title}</span>
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
              </>
            )}

            {/* ========================================== */}
            {/* 4.3 MUSIC TEACHER DASHBOARD (teacher)      */}
            {/* ========================================== */}
            {user.role === 'teacher' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Active Students', value: mentorshipStudents.length, change: '', icon: Users, color: 'text-blue-500' },
                        { label: 'Courses Created', value: teacherCourses.length, change: '', icon: BookOpen, color: 'text-amber-500' },
                        { label: 'Workshops Set', value: teacherWorkshops.length, change: '', icon: Video, color: 'text-violet-500' },
                        { label: 'Account Balance', value: `$${teacherEarnings.toLocaleString()}`, change: '', icon: DollarSign, color: 'text-emerald-500' },
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
                      {/* Active Courses */}
                      <div className="bg-card rounded-2xl border border-border p-5">
                        <h3 className="font-semibold text-foreground mb-4">Your Active Courses</h3>
                        <div className="space-y-3">
                          {teacherCourses.map(course => (
                            <div key={course.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                              <div>
                                <p className="font-semibold text-foreground">{course.title}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">Level: {course.level} • Price: {course.price}</p>
                              </div>
                              <span className="px-2.5 py-1 bg-coffee/10 text-coffee rounded-full font-semibold">{course.students} Enrolled</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mentor Notes */}
                      <div className="bg-card rounded-2xl border border-border p-5">
                        <h3 className="font-semibold text-foreground mb-4">Recent Mentorship Feed</h3>
                        <div className="space-y-3">
                          {mentorshipStudents.map(student => (
                            <div key={student.id} className="p-3 border border-border rounded-xl bg-muted/10 text-xs">
                              <p className="font-semibold text-foreground">🎓 {student.name}</p>
                              <p className="text-muted-foreground mt-1">{student.notes}</p>
                              <p className="text-[9px] text-muted-foreground mt-2">Last lesson: {student.lastMeeting}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Create a New Course</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Course Title</label>
                        <input
                          type="text"
                          value={newCourseTitle}
                          onChange={e => setNewCourseTitle(e.target.value)}
                          placeholder="e.g. Guitar Chord Masterclass"
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Level</label>
                          <select
                            value={newCourseLevel}
                            onChange={e => setNewCourseLevel(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Price ($ USD)</label>
                          <input
                            type="number"
                            value={newCoursePrice}
                            onChange={e => setNewCoursePrice(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!newCourseTitle.trim()) return;
                          setTeacherCourses([...teacherCourses, { id: Date.now(), title: newCourseTitle, level: newCourseLevel, students: 0, price: `$${newCoursePrice}` }]);
                          setNewCourseTitle('');
                          toast.success('Course created and listed successfully! 📚');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Create Course
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'workshops' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Schedule a Live Workshop</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Workshop Title</label>
                        <input
                          type="text"
                          value={newWorkshopTitle}
                          onChange={e => setNewWorkshopTitle(e.target.value)}
                          placeholder="e.g. Songwriting Secrets"
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
                        <input
                          type="date"
                          value={newWorkshopDate}
                          onChange={e => setNewWorkshopDate(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!newWorkshopTitle.trim()) return;
                          setTeacherWorkshops([...teacherWorkshops, { id: Date.now(), title: newWorkshopTitle, date: newWorkshopDate, seatsLeft: 20, price: '$15' }]);
                          setNewWorkshopTitle('');
                          toast.success('Workshop scheduled! Students can now register. 🎟️');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Launch Workshop
                      </button>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Your Workshops</h4>
                      <div className="space-y-2">
                        {teacherWorkshops.map(ws => (
                          <div key={ws.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                            <div>
                              <p className="font-semibold text-foreground">{ws.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Date: {ws.date} • Tickets: {ws.price}</p>
                            </div>
                            <button onClick={() => toast.success(`Live Workshop "${ws.title}" streaming feeds ready!`)} className="px-3 py-1.5 bg-coffee text-white rounded-lg font-semibold hover:opacity-90 text-[10px]">
                              Host Session
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'mentorship' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4 font-display">Mentor Students</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newStudentName}
                        onChange={e => setNewStudentName(e.target.value)}
                        placeholder="Add new student..."
                        className="flex-1 px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (!newStudentName.trim()) return;
                          setMentorshipStudents([...mentorshipStudents, { id: Date.now(), name: newStudentName, notes: 'Just joined, lesson planning pending', lastMeeting: 'Never' }]);
                          setNewStudentName('');
                          toast.success('New mentorship student added!');
                        }}
                        className="px-4 py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Add Student
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mentorshipStudents.map(student => (
                        <div key={student.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">🎓 {student.name}</p>
                            <p className="text-muted-foreground mt-0.5">Notes: {student.notes}</p>
                          </div>
                          <button onClick={() => toast.success(`1-on-1 schedule requested for ${student.name}!`)} className="px-3 py-1.5 bg-coffee text-white font-semibold rounded-lg text-[10px]">
                            Schedule 1-on-1
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'revenue' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-lg mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Teacher Earnings Split</h3>
                    <div className="border border-border p-4 rounded-xl bg-muted/20 text-center mb-6">
                      <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-2xl text-foreground">${teacherEarnings.toLocaleString()}</h4>
                      <p className="text-xs text-muted-foreground">Accrued Account Balance</p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Withdrawal Payout Method</h4>
                      <button
                        onClick={() => {
                          if (teacherEarnings <= 0) {
                            toast.error('You do not have any earnings to withdraw.');
                            return;
                          }
                          toast.success(`Withdrawal request of $${teacherEarnings.toLocaleString()} sent! Processing in 2-3 business days.`);
                          setTeacherEarnings(0);
                        }}
                        className="w-full py-2 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700"
                      >
                        Withdraw Payout to Bank
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ========================================== */}
            {/* 4.4 CAFÉ / VENUE OWNER DASHBOARD (venue)   */}
            {/* ========================================== */}
            {user.role === 'venue' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
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
                                <p className="font-semibold text-foreground">🎤 {offer.artist}</p>
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
                                <p className="font-semibold text-foreground">🍽️ {res.table} ({res.guests} Guests)</p>
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Venue Listing Settings</h3>
                    <div className="space-y-4">
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
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Seating Capacity</label>
                        <input
                          type="number"
                          value={venueCapacity}
                          onChange={e => setVenueCapacity(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
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
                      <button onClick={() => toast.success('Venue listing details saved!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                        Save Venue Profile
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'host-events' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Host a Venue Event</h3>
                    <div className="space-y-4 mb-6">
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
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
                        <input
                          type="text"
                          value={newVenueEventDate}
                          onChange={e => setNewVenueEventDate(e.target.value)}
                          placeholder="e.g. Jul 20"
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!newVenueEventName.trim()) return;
                          setVenueEvents([...venueEvents, { id: Date.now(), name: newVenueEventName, date: newVenueEventDate, time: '8:00 PM', price: '$5' }]);
                          setNewVenueEventName('');
                          toast.success('Event hosted at your venue! 🏟️');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Host Event
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'book-artists' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Send Booking Offer to Artist</h3>
                    <div className="space-y-4 mb-6">
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
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Compensation ($ USD)</label>
                        <input
                          type="number"
                          value={bookingPay}
                          onChange={e => setBookingPay(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setSentArtistOffers([...sentArtistOffers, { id: Date.now(), artist: bookingArtistName, date: 'Aug 10', pay: `$${bookingPay}`, status: 'Pending' }]);
                          toast.success(`Booking offer sent to ${bookingArtistName}! 🎤`);
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Send Booking Offer
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'reservations' && (
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground mb-4">Manage Reservations</h3>
                    <div className="space-y-2">
                      {venueReservations.map(res => (
                        <div key={res.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{res.table} ({res.guests} Guests)</p>
                            <p className="text-muted-foreground mt-0.5">Time: {res.time} • Status: {res.status}</p>
                          </div>
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
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'audience' && (
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <TrendingUp className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Audience Analytics</h3>
                    <p className="text-xs text-muted-foreground mb-4">Reach local music lovers. Promote your next gig to 3,120 customers in your neighborhood.</p>
                    <button
                      onClick={() => {
                        setVenueCampaignsCount(venueCampaignsCount + 1);
                        toast.success('Promotion campaign launched to local neighborhood app! ($25 charged)');
                      }}
                      className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90"
                    >
                      Launch Local Promo Ads ($25)
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ========================================== */}
            {/* 4.5 EVENT ORGANIZER DASHBOARD (organizer)  */}
            {/* ========================================== */}
            {user.role === 'organizer' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
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
                      {/* Active Tickets sales progress */}
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
                                <p className="font-semibold text-foreground">🎫 {att.name}</p>
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Create New Event</h3>
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
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Date</label>
                          <input
                            type="text"
                            value={newOrgEventDate}
                            onChange={e => setNewOrgEventDate(e.target.value)}
                            placeholder="e.g. Aug 20"
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
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
                      <button
                        onClick={() => {
                          if (!newOrgEventName.trim()) return;
                          setOrgEvents([...orgEvents, { id: Date.now(), name: newOrgEventName, date: newOrgEventDate, ticketsSold: 0, capacity: parseInt(newOrgEventCapacity), price: '$20' }]);
                          setNewOrgEventName('');
                          toast.success('Event listing initialized! Ticket sales launched.');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Launch Ticket Sales
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'invite' && (
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <Music className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Invite Artists to Lineup</h3>
                    <p className="text-xs text-muted-foreground mb-4">Browse verified musicians and invite them to perform at your festival. Sent invites will show in bookings.</p>
                    <button onClick={() => toast.success('Performance invitations dispatched to Alex Rivera!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                      Invite Alex Rivera
                    </button>
                  </div>
                )}

                {activeTab === 'tickets' && (
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <DollarSign className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Manage Ticket Sales Tiers</h3>
                    <p className="text-xs text-muted-foreground mb-4">Set early bird discounts, general admission, and VIP passes.</p>
                    <button onClick={() => toast.success('Ticket tier pricing config updated!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                      Configure Tiers
                    </button>
                  </div>
                )}

                {activeTab === 'attendees' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4 font-display">Manage Attendee Registration & Check-in</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newAttendeeName}
                        onChange={e => setNewAttendeeName(e.target.value)}
                        placeholder="Register attendee manually..."
                        className="flex-1 px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (!newAttendeeName.trim()) return;
                          setAttendees([...attendees, { id: Date.now(), name: newAttendeeName, ticket: 'GA', status: 'Confirmed' }]);
                          setNewAttendeeName('');
                          toast.success('Attendee registered manually!');
                        }}
                        className="px-4 py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Register
                      </button>
                    </div>

                    <div className="space-y-2">
                      {attendees.map(att => (
                        <div key={att.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">🎟️ {att.name}</p>
                            <p className="text-muted-foreground mt-0.5">Status: {att.status}</p>
                          </div>
                          {att.status === 'Confirmed' && (
                            <button
                              onClick={() => {
                                setAttendees(attendees.map(a => a.id === att.id ? { ...a, status: 'Checked In' } : a));
                                toast.success(`Checked in ${att.name}!`);
                              }}
                              className="px-3 py-1 bg-coffee text-white rounded-lg font-semibold hover:opacity-90 text-[10px]"
                            >
                              Check In
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'analyze' && (
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <BarChart3 className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Analyze Success</h3>
                    <p className="text-xs text-muted-foreground mb-4">Export CSV sheet containing attendee counts, revenue budgets, and satisfaction feedback.</p>
                    <button onClick={() => toast.success('Exporting spreadsheet report...')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                      Export Report
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ========================================== */}
            {/* 4.6 BRAND / SPONSOR DASHBOARD (sponsor)    */}
            {/* ========================================== */}
            {user.role === 'sponsor' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
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
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <Search className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Browse Top Performing Artists</h3>
                    <p className="text-xs text-muted-foreground mb-4">Find independent musicians with highly engaged listener demographics to represent your brand.</p>
                    <button onClick={() => toast.success('Search directory is up to date!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                      Refresh Catalog
                    </button>
                  </div>
                )}

                {activeTab === 'sponsorships' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Sponsor Local Music Events</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Underground Beats Festival', fee: '$1,500', spot: 'Main Stage Banner' },
                        { name: 'Acoustic Cafe Series', fee: '$300', spot: 'Cup/Sleeve Branding' },
                        { name: 'Jazz Rooftop Special', fee: '$500', spot: 'VIP Lounge Logo' },
                      ].map(opportunity => (
                        <div key={opportunity.name} className="p-4 border border-border rounded-xl bg-muted/10 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{opportunity.name}</p>
                            <p className="text-muted-foreground mt-0.5">Sponsor Spot: {opportunity.spot} • Cost: {opportunity.fee}</p>
                          </div>
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
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'campaigns' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Launch Sponsor Campaign</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Campaign Name</label>
                        <input
                          type="text"
                          value={newCampaignName}
                          onChange={e => setNewCampaignName(e.target.value)}
                          placeholder="e.g. Free Coffee Coupon Ads"
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!newCampaignName.trim()) return;
                          setSponsorCampaigns([...sponsorCampaigns, { id: Date.now(), name: newCampaignName, impressions: '0', clicks: 0, ctr: '0.0%' }]);
                          setNewCampaignName('');
                          toast.success('Sponsor campaign launched! Tracking stats...');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Publish Campaign
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'metrics' && (
                  <div className="grid lg:grid-cols-3 gap-6">
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
              </>
            )}

            {/* ========================================== */}
            {/* 4.7 ADMIN DASHBOARD (admin)                */}
            {/* ========================================== */}
            {user.role === 'admin' && (
              <>
                {activeTab === 'dashboard' && (
                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Total Active Users', value: '5,420', change: '', icon: Users, color: 'text-blue-500' },
                        { label: 'Artist Verifications Pending', value: pendingVerifications.length, change: '', icon: CheckCircle, color: 'text-amber-500' },
                        { label: 'Flagged Content Posts', value: moderationReports.length, change: '', icon: AlertCircle, color: 'text-rose-500' },
                        { label: 'Accrued Admin Fee (10%)', value: '$12,480', change: '', icon: DollarSign, color: 'text-emerald-500' },
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
                      {/* Verifications */}
                      <div className="bg-card rounded-2xl border border-border p-5">
                        <h3 className="font-semibold text-foreground mb-4">Pending Artist Verifications</h3>
                        {pendingVerifications.length === 0 ? (
                          <p className="text-xs text-muted-foreground">All artist verification queues are clear!</p>
                        ) : (
                          <div className="space-y-3">
                            {pendingVerifications.map(app => (
                              <div key={app.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                                <div>
                                  <p className="font-semibold text-foreground">{app.name}</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Genre: {app.genre} • Applied {app.joined}</p>
                                </div>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => {
                                      setPendingVerifications(pendingVerifications.filter(a => a.id !== app.id));
                                      toast.success(`Artist "${app.name}" verified successfully! checkmark added.`);
                                    }}
                                    className="px-2.5 py-1 bg-emerald-600 text-white rounded font-semibold text-[10px]"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPendingVerifications(pendingVerifications.filter(a => a.id !== app.id));
                                      toast.info(`Application for "${app.name}" rejected.`);
                                    }}
                                    className="px-2.5 py-1 bg-muted text-foreground border border-border rounded font-semibold text-[10px]"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Moderation */}
                      <div className="bg-card rounded-2xl border border-border p-5">
                        <h3 className="font-semibold text-foreground mb-4">Content Moderation Queue</h3>
                        {moderationReports.length === 0 ? (
                          <p className="text-xs text-muted-foreground">No reports pending moderation.</p>
                        ) : (
                          <div className="space-y-3">
                            {moderationReports.map(rep => (
                              <div key={rep.id} className="p-3 border border-border rounded-xl bg-muted/10 text-xs flex justify-between items-center">
                                <div>
                                  <p className="font-semibold text-foreground">Post: "{rep.message}"</p>
                                  <p className="text-muted-foreground mt-0.5">Author: @{rep.author} • Flag: {rep.reason}</p>
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      setModerationReports(moderationReports.filter(r => r.id !== rep.id));
                                      toast.success('Flag dismissed.');
                                    }}
                                    className="px-2 py-1 bg-muted text-foreground border border-border rounded text-[9px] font-semibold"
                                  >
                                    Keep
                                  </button>
                                  <button
                                    onClick={() => {
                                      setModerationReports(moderationReports.filter(r => r.id !== rep.id));
                                      toast.error('Spam content removed from platform.');
                                    }}
                                    className="px-2 py-1 bg-rose-600 text-white rounded text-[9px] font-semibold"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'manage-platform' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Platform Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Platform Cut (Admin Fee)</label>
                        <select
                          value={platformFeePercentage}
                          onChange={e => setPlatformFeePercentage(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        >
                          <option value="5%">5% commission</option>
                          <option value="10%">10% commission</option>
                          <option value="15%">15% commission</option>
                        </select>
                      </div>
                      <button onClick={() => toast.success('Platform configurations saved!')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                        Save Configurations
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'verify-artists' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Artist Verification Requests</h3>
                    <div className="space-y-2">
                      {pendingVerifications.map(app => (
                        <div key={app.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{app.name}</p>
                            <p className="text-muted-foreground mt-0.5">Genre: {app.genre} • Applied: {app.joined}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                setPendingVerifications(pendingVerifications.filter(a => a.id !== app.id));
                                toast.success(`Artist "${app.name}" approved!`);
                              }}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded font-semibold text-[10px]"
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'moderation' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
                    <h3 className="font-semibold text-foreground mb-4">Moderate Content Feed</h3>
                    <div className="space-y-2">
                      {moderationReports.map(rep => (
                        <div key={rep.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">"{rep.message}"</p>
                            <p className="text-muted-foreground mt-0.5">Reported by safety filter</p>
                          </div>
                          <button
                            onClick={() => {
                              setModerationReports(moderationReports.filter(r => r.id !== rep.id));
                              toast.success('Removed message.');
                            }}
                            className="px-3 py-1 bg-rose-600 text-white rounded font-semibold text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'revenue-split' && (
                  <div className="bg-card rounded-2xl border border-border p-5 text-center">
                    <DollarSign className="w-8 h-8 text-coffee mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-2">Platform Revenue Split Monitor</h3>
                    <p className="text-xs text-muted-foreground mb-4">General net transaction statistics showing platform cuts vs artist payouts.</p>
                    <button onClick={() => toast.info('Exporting transaction sheet...')} className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                      Download Statement
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
