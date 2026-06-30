import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Music, Calendar, Users, BarChart3, Settings, Star,
  TrendingUp, DollarSign, Eye, Heart, MessageSquare, Play, Plus,
  Bell, Search, Menu, X, Coffee, LogOut, ChevronRight, Mic2,
  BookOpen, MapPin, Clock, User, Award, Shield, CheckCircle, Video, BookMarked, HelpCircle,
  FileText, Check, AlertCircle, PlusCircle, Share2, Trash2, Send, Mail
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
        { icon: BookOpen, label: 'Learn Music', id: 'learn' },
        { icon: Calendar, label: 'Attend Events', id: 'events' },
        { icon: Users, label: 'Join Communities', id: 'community' },
        { icon: Heart, label: 'Support Creators', id: 'support' },
      ];
    case 'musician':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
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
  const [artistSearchQuery, setArtistSearchQuery] = useState('');
  const [joinedCourses, setJoinedCourses] = useState<number[]>([1]);
  const [joinedWorkshops, setJoinedWorkshops] = useState<number[]>([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [viewingCourseDetails, setViewingCourseDetails] = useState<any | null>(null);
  
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
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [gigOffers, setGigOffers] = useState([
    {
      id: 1,
      venue: 'The Grind Café',
      date: 'Jul 15',
      time: '7:30 PM - 9:30 PM',
      pay: '$250',
      status: 'Pending',
      desc: 'Looking for a 2-hour acoustic set during our Friday evening peak rush. Crowd loves indie folk covers and original tunes. Free espresso bar and snacks included for the artist.',
      address: '123 Brew St, Austin, TX',
      expectations: '2 sets of 45 minutes with a 15 minute break in between. Must bring own instrument; house PA system is available.'
    },
    {
      id: 2,
      venue: 'Brew & Strum',
      date: 'Jul 22',
      time: '8:00 PM - 10:00 PM',
      pay: '$180',
      status: 'Confirmed',
      desc: 'Acoustic live music set for our weekly café community evening. Casual vibe, family-friendly audience.',
      address: '456 Chord Ave, Austin, TX',
      expectations: 'Bring acoustic guitar or keyboards. Low-profile amplification requested.'
    },
    {
      id: 3,
      venue: 'Notes & Beans',
      date: 'Aug 05',
      time: '6:00 PM - 9:00 PM',
      pay: '$400',
      status: 'Pending',
      desc: 'Premium jazz/acoustic lounge performance slot. High patronage, elegant atmosphere.',
      address: '789 Rhythm Blvd, Austin, TX',
      expectations: 'Classy lounge repertoire. Professional attire and punctuality are mandatory.'
    },
  ]);
  const [viewingGig, setViewingGig] = useState<typeof gigOffers[0] | null>(null);
  const [collabList, setCollabList] = useState([
    {
      id: 1,
      title: 'Guitarist needed for indie folk ballad',
      creator: 'Marcus Chen',
      roleNeeded: 'Guitarist',
      status: 'Open',
      desc: 'We are finishing a warm acoustic indie folk ballad and need a subtle fingerpicked guitar part to fill out the verses. Key of G, tempo 85bpm.',
      requirements: 'Must have a clean acoustic recording setup and be able to provide WAV stems.'
    },
    {
      id: 2,
      title: 'Looking for vocalist for jazz duet',
      creator: 'Lana Vibe',
      roleNeeded: 'Vocalist',
      status: 'In Progress',
      desc: 'Looking for a male/tenor vocalist to sing harmonies on a jazz duet version of Café Mornings. Piano is already tracked.',
      requirements: 'Comfortable with close harmonies, jazz syncopation, and vocal expression.'
    },
  ]);
  const [newCollabTitle, setNewCollabTitle] = useState('');
  const [newCollabRole, setNewCollabRole] = useState('Guitarist');
  const [newCollabDesc, setNewCollabDesc] = useState('');
  const [newCollabReqs, setNewCollabReqs] = useState('');
  const [viewingCollab, setViewingCollab] = useState<typeof collabList[0] | null>(null);
  // Digital Storefront
  const [storeTracks, setStoreTracks] = useState([
    { id: 1, title: 'Café Mornings EP', price: 9.99, format: 'EP', releaseDate: '2026-06-01', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop' },
    { id: 2, title: 'Unplugged Sessions Album', price: 14.99, format: 'Album', releaseDate: '2026-05-15', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop' }
  ]);
  const [storeTrackTitle, setStoreTrackTitle] = useState('');
  const [storeTrackPrice, setStoreTrackPrice] = useState('9.99');
  const [storeTrackFormat, setStoreTrackFormat] = useState('EP');
  const [storeTrackDate, setStoreTrackDate] = useState('2026-07-01');
  const [storeTrackCover, setStoreTrackCover] = useState<File | null>(null);

  // 4.3 Music Teacher States
  const [teacherEarnings, setTeacherEarnings] = useState(4250);
  const [teacherCourses, setTeacherCourses] = useState([
    { id: 1, title: 'Acoustic Guitar 101', level: 'Beginner', students: 12, price: '$49' },
    { id: 2, title: 'Piano Improvisation Basics', level: 'Intermediate', students: 8, price: '$79' },
  ]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseLevel, setNewCourseLevel] = useState('Beginner');
  const [newCoursePrice, setNewCoursePrice] = useState('49');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('10');
  const [newCourseLectures, setNewCourseLectures] = useState('12');
  const [newCourseSyllabus, setNewCourseSyllabus] = useState('');

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
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentInstrument, setNewStudentInstrument] = useState('Guitar');
  const [newStudentLevel, setNewStudentLevel] = useState('Beginner');
  const [newStudentNotes, setNewStudentNotes] = useState('');

  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedWithdrawalAccount, setSelectedWithdrawalAccount] = useState('Chase Bank (...4829)');
  const withdrawalAccounts = ['Chase Bank (...4829)', 'Wells Fargo (...1056)', 'PayPal (alex.rivera@gmail.com)'];
  const [withdrawAmount, setWithdrawAmount] = useState('4250');

  const [activeHostingWorkshop, setActiveHostingWorkshop] = useState<typeof teacherWorkshops[0] | null>(null);
  const [workshopChats, setWorkshopChats] = useState([
    { user: 'Clara', msg: 'The sound quality is amazing!' },
    { user: 'Buster', msg: 'Can you show that fingerpicking chord again?' },
    { user: 'Sarah', msg: 'Great session!' }
  ]);
  const [workshopChatInput, setWorkshopChatInput] = useState('');
  const [schedulingStudent, setSchedulingStudent] = useState<typeof mentorshipStudents[0] | null>(null);
  const [meetingDate, setMeetingDate] = useState('2026-07-10');
  const [meetingTime, setMeetingTime] = useState('16:00');

  // 4.4 Café / Venue Owner States
  const [venueName, setVenueName] = useState('Chords & Coffee Lounge');
  const [venueCapacity, setVenueCapacity] = useState('120');
  const [venueAddress, setVenueAddress] = useState('123 Brew St, Austin, TX');
  const [venueStatus, setVenueStatus] = useState('Listed & Active');
  const [venueDescription, setVenueDescription] = useState('A warm acoustic live performance café featuring artisanal espresso and local songwriter show stages.');
  const [venueContactPhone, setVenueContactPhone] = useState('(512) 555-0199');
  const [venuePricingPerHour, setVenuePricingPerHour] = useState('50');
  const [venueStageGear, setVenueStageGear] = useState('Yamaha Upright Piano, 2x Shure SM58, Soundcraft Mixer, JBL Active PAs');
  const [venueAcousticsRating, setVenueAcousticsRating] = useState('Excellent');

  const [venueCampaignsCount, setVenueCampaignsCount] = useState(2);
  const [venueCampaigns, setVenueCampaigns] = useState([
    { id: 1, title: 'Summer Jazz Series Showcase', eventName: 'Acoustic Set Live', radius: '10 Miles', goal: 'Increase Ticket Sales', budget: '25', status: 'Running', impressions: 1240, clicks: 185 },
    { id: 2, title: 'Weekly Acoustic Night Promo', eventName: 'Open Mic Night', radius: '5 Miles', goal: 'Promote Brand', budget: '25', status: 'Running', impressions: 840, clicks: 98 },
  ]);
  const [venueEvents, setVenueEvents] = useState([
    { id: 1, name: 'Open Mic Night', date: 'Jul 05', time: '8:00 PM', price: 'Free', desc: 'Our weekly acoustic showcase for local singer-songwriters.', genre: 'Acoustic / Indie' },
    { id: 2, name: 'Acoustic Set Live', date: 'Jul 12', time: '7:30 PM', price: '$10', desc: 'Featuring regional indie folk artists.', genre: 'Folk / Bluegrass' },
  ]);
  const [newVenueEventName, setNewVenueEventName] = useState('');
  const [newVenueEventDate, setNewVenueEventDate] = useState('2026-07-20');
  const [newVenueEventTime, setNewVenueEventTime] = useState('20:00');
  const [newVenueEventPrice, setNewVenueEventPrice] = useState('10');
  const [newVenueEventDesc, setNewVenueEventDesc] = useState('');
  const [newVenueEventGenre, setNewVenueEventGenre] = useState('Acoustic');

  const [venueReservations, setVenueReservations] = useState([
    { id: 1, table: 'Table 4', guests: 4, time: '7:00 PM', name: 'John Miller', email: 'john@miller.com', notes: 'Anniversary celebration, request booth seat', status: 'Checked In' },
    { id: 2, table: 'Table 1', guests: 2, time: '7:30 PM', name: 'Clara Oswald', email: 'clara@oswald.com', notes: 'Near the live stage if possible', status: 'Confirmed' },
    { id: 3, table: 'VIP Section', guests: 6, time: '8:00 PM', name: 'David Tennant', email: 'david@doctor.com', notes: 'Needs wheelchair access', status: 'Confirmed' },
  ]);
  const [viewingReservation, setViewingReservation] = useState<typeof venueReservations[0] | null>(null);

  const [sentArtistOffers, setSentArtistOffers] = useState([
    { id: 1, artist: 'Alex Rivera', date: 'Jul 24', slotTime: '8:00 PM - 10:00 PM', pay: '$250', status: 'Pending', notes: 'Headliner set for Acoustic Night', accommodation: 'No' },
    { id: 2, artist: 'Marcus Chen', date: 'Jul 30', slotTime: '7:30 PM - 9:30 PM', pay: '$300', status: 'Accepted', notes: 'Opening set', accommodation: 'Yes' },
  ]);
  const [bookingArtistName, setBookingArtistName] = useState('Alex Rivera');
  const [bookingPay, setBookingPay] = useState('250');
  const [bookingDate, setBookingDate] = useState('2026-07-25');
  const [bookingSlotTime, setBookingSlotTime] = useState('20:00 - 22:00');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingAccommodation, setBookingAccommodation] = useState(false);

  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoRadius, setPromoRadius] = useState('10');
  const [promoGoal, setPromoGoal] = useState('Increase Ticket Sales');
  const [promoEventId, setPromoEventId] = useState('1');
  const [promoAdTitle, setPromoAdTitle] = useState('');
  const [promoAdDesc, setPromoAdDesc] = useState('');
  const [promoBudget, setPromoBudget] = useState('25');
  const [promoProcessing, setPromoProcessing] = useState(false);
  const [isSavingVenueProfile, setIsSavingVenueProfile] = useState(false);
  const [isVenueSaved, setIsVenueSaved] = useState(false);

  // 4.5 Event Organizer States
  const [orgEvents, setOrgEvents] = useState([
    { id: 1, name: 'Underground Beats Festival', date: 'Aug 15', ticketsSold: 250, capacity: 500, price: '$50' },
    { id: 2, name: 'Cafe Acoustic Series', date: 'Jul 29', ticketsSold: 85, capacity: 100, price: '$15' },
  ]);
  const [newOrgEventName, setNewOrgEventName] = useState('');
  const [newOrgEventDate, setNewOrgEventDate] = useState('2026-08-20');
  const [newOrgEventCapacity, setNewOrgEventCapacity] = useState('150');
  const [newOrgEventTime, setNewOrgEventTime] = useState('19:30');
  const [newOrgEventPrice, setNewOrgEventPrice] = useState('25');
  const [newOrgEventLocation, setNewOrgEventLocation] = useState('Chords Café Main Hall');
  const [newOrgEventDesc, setNewOrgEventDesc] = useState('');
  const [newOrgEventGenre, setNewOrgEventGenre] = useState('Acoustic Lounge');

  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Tommy Cooper', ticket: 'VIP', status: 'Confirmed', email: 'tommy@cooper.com', serial: 'TKT-104-9921', date: 'Jun 22', notes: 'Include complimentary front row access' },
    { id: 2, name: 'Sarah Connor', ticket: 'GA', status: 'Checked In', email: 'sarah@connor.com', serial: 'TKT-821-1056', date: 'Jun 25', notes: 'Wheelchair seating requested' },
    { id: 3, name: 'Emily Johnson', ticket: 'GA', status: 'Confirmed', email: 'emily@johnson.com', serial: 'TKT-441-2099', date: 'Jun 28', notes: 'Dietary preference: Gluten Free' },
  ]);
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeEmail, setNewAttendeeEmail] = useState('');
  const [newAttendeeTicket, setNewAttendeeTicket] = useState('GA');
  const [newAttendeeNotes, setNewAttendeeNotes] = useState('');
  const [viewingAttendee, setViewingAttendee] = useState<typeof attendees[0] | null>(null);

  const [showInviteArtistModal, setShowInviteArtistModal] = useState(false);
  const [invitingArtist, setInvitingArtist] = useState<{ name: string; genre: string; rate: string; avatar: string } | null>(null);
  const [selectedInviteEventId, setSelectedInviteEventId] = useState('1');
  const [invitePayoutOffer, setInvitePayoutOffer] = useState('300');
  const [invitedArtistsList, setInvitedArtistsList] = useState([
    { id: 1, name: 'Alex Rivera', event: 'Underground Beats Festival', pay: '$300', date: 'Aug 15', status: 'Pending' }
  ]);

  const [ticketTierEventId, setTicketTierEventId] = useState('1');
  const [ticketTierEarlyPrice, setTicketTierEarlyPrice] = useState('20');
  const [ticketTierGAPrice, setTicketTierGAPrice] = useState('35');
  const [ticketTierVIPPrice, setTicketTierVIPPrice] = useState('75');

  // 4.6 Brand / Sponsor States
  const [sponsorCampaigns, setSponsorCampaigns] = useState([
    { id: 1, name: 'Summer Brew Banner Ads', impressions: '45K', clicks: 1240, ctr: '2.7%' },
    { id: 2, name: 'VibeBrew Coffee Promo Code', impressions: '83K', clicks: 3580, ctr: '4.3%' },
  ]);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('Brand Awareness');
  const [campaignBudget, setCampaignBudget] = useState('1000');
  const [campaignAudience, setCampaignAudience] = useState('All Patrons');
  const [campaignPromoCode, setCampaignPromoCode] = useState('COFFEEVIBE20');
  const [campaignAdCopy, setCampaignAdCopy] = useState('');
  const [campaignChannels, setCampaignChannels] = useState<string[]>(['In-App Banner Ads']);

  const [sponsoredEvents, setSponsoredEvents] = useState<string[]>(['Underground Beats Festival']);
  const [viewingSponsorOpportunity, setViewingSponsorOpportunity] = useState<{ name: string; fee: string; spot: string; impressions: string; perks: string } | null>(null);

  const [isRefreshingTalent, setIsRefreshingTalent] = useState(false);
  const [inquiringArtist, setInquiringArtist] = useState<{ name: string; genre: string; rate: string; avatar: string } | null>(null);
  const [inquiryBudget, setInquiryBudget] = useState('500');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryPlacement, setInquiryPlacement] = useState('Shoutout & Logo on Banner');
  const [sponsorshipInquiries, setSponsorshipInquiries] = useState([
    { id: 1, artistName: 'Alex Rivera', placement: 'Shoutout & Logo on Banner', budget: '500', status: 'Accepted', date: 'Jun 28' },
    { id: 2, artistName: 'Lana Vibe', placement: 'Audio Intro Sponsor', budget: '350', status: 'Pending', date: 'Jun 30' },
    { id: 3, artistName: 'Marcus Chen', placement: 'Dedicated Merch Placement', budget: '750', status: 'Declined', date: 'Jun 25' }
  ]);
  const [talentDirectory, setTalentDirectory] = useState([
    { name: 'Alex Rivera', genre: 'Acoustic / Folk Singer', followers: '12K', rate: '$250/Gig', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { name: 'Lana Vibe', genre: 'Indie Pop / Electronic', followers: '28K', rate: '$350/Gig', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
    { name: 'Marcus Chen', genre: 'Piano / Live Loop', followers: '18K', rate: '$300/Gig', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
  ]);

  // Sponsor ROI Calculator Form
  const [roiBudget, setRoiBudget] = useState('500');
  const [roiConversions, setRoiConversions] = useState('120');
  const [roiAvgSale, setRoiAvgSale] = useState('15');

  // 4.7 Admin States
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: 'Lana Vibe', genre: 'Synth Folk / Electronic', joined: '1 week ago', bio: 'Blending live acoustic guitars with lo-fi synth waves. Over 10k monthly listeners.', socialLink: 'https://spotify.com/lana-vibe' },
    { id: 2, name: 'The Coffee Grinders', genre: 'Acoustic Blues / Folk', joined: '3 days ago', bio: 'A local songwriter trio hosting blues songwriter rounds.', socialLink: 'https://soundcloud.com/coffee-grinders' },
    { id: 3, name: 'Buster Brown', genre: 'Jazz Trumpet / Soul', joined: '1 day ago', bio: 'Solo brass instrumentalist and performance arranger.', socialLink: 'https://youtube.com/buster-trumpet' }
  ]);
  const [moderationReports, setModerationReports] = useState([
    { id: 1, message: 'This venue is a scam! They cancel gigs last minute and don\'t pay.', author: 'User102', reason: 'Harassment / Fake Info', contentId: 'MSG-882' },
    { id: 2, message: 'Click here to win a free guitar (spam-link) http://scamguitars.com', author: 'Spammer99', reason: 'Spam / Phishing Link', contentId: 'MSG-109' },
    { id: 3, message: 'Copyright claim: This track uses an uncleared sample from my acoustic catalog.', author: 'Artist901', reason: 'Copyright Infringement', contentId: 'TRACK-440' }
  ]);
  const [platformFeePercentage, setPlatformFeePercentage] = useState('10');
  const [maintenanceMode, setMaintenanceMode] = useState('Disabled');
  const [allowRegistration, setAllowRegistration] = useState('Yes');
  const [minWithdrawalThreshold, setMinWithdrawalThreshold] = useState('50');
  const [maxUploadLimit, setMaxUploadLimit] = useState('20');
  const [adminContactEmail, setAdminContactEmail] = useState('admin@chordsandcoffee.com');
  const [globalRateLimit, setGlobalRateLimit] = useState('120');

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingArtistId, setRejectingArtistId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('Insufficient social links/portfolio info.');

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
                      {/* Interactive Courses Listing */}
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
                                        toast.success(`Successfully enrolled in "${course.title}"! 🎒`);
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

                      {/* Interactive Workshops Listing */}
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
                                        toast.success(`Successfully registered for "${ws.title}"! 🎟️`);
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
                          toast.success('Track and audio file published to your portfolio! 🎧');
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
                  <div className="space-y-6">
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
                                      toast.success(`Gig booking for ${gig.venue} accepted! 📅`);
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

                    {/* viewingGig Details Card */}
                    {viewingGig && (
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-display font-semibold text-lg text-foreground">🏟️ Performance Invitation details: {viewingGig.venue}</h4>
                          <button onClick={() => setViewingGig(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4 text-xs">
                          <p className="text-muted-foreground leading-relaxed">{viewingGig.desc}</p>
                          <div className="grid sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <strong className="text-foreground">📍 Location Address:</strong>
                              <p className="text-muted-foreground mt-0.5">{viewingGig.address}</p>
                            </div>
                            <div>
                              <strong className="text-foreground">⏰ Timing & Compensation:</strong>
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
                                    toast.success(`Gig booking for ${viewingGig.venue} accepted! 📅`);
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
                  <div className="space-y-6 max-w-xl mx-auto">
                    {/* Upload New Collaboration Request Form */}
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
                          toast.success('Collaboration request uploaded to board! 🚀');
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

                    {/* Collaboration Listings */}
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
                                    toast.success(`Successfully joined collaboration with ${collab.creator}! 💬`);
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

                    {/* viewingCollab Details modal card */}
                    {viewingCollab && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-lg w-full relative animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-display font-semibold text-base text-foreground">🤝 Collaboration Details: {viewingCollab.title}</h4>
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
                                    toast.success(`Successfully joined collaboration with ${viewingCollab.creator}! 💬`);
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
                            toast.success(`Track "${storeTrackTitle}" listed successfully on digital storefront! 💿`);
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
                                <p className="font-semibold text-foreground">💿 {track.title}</p>
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Estimated Hours</label>
                          <input
                            type="number"
                            value={newCourseHours}
                            onChange={e => setNewCourseHours(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Number of Lectures</label>
                          <input
                            type="number"
                            value={newCourseLectures}
                            onChange={e => setNewCourseLectures(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Course Description</label>
                        <textarea
                          rows={2}
                          value={newCourseDesc}
                          onChange={e => setNewCourseDesc(e.target.value)}
                          placeholder="What will students learn in this course..."
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Syllabus Overview</label>
                        <input
                          type="text"
                          value={newCourseSyllabus}
                          onChange={e => setNewCourseSyllabus(e.target.value)}
                          placeholder="e.g. Intro, Major Scales, Fingerpicking Patterns, Soloing"
                          className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!newCourseTitle.trim()) {
                            toast.error('Please enter a course title.');
                            return;
                          }
                          setTeacherCourses([...teacherCourses, { id: Date.now(), title: newCourseTitle, level: newCourseLevel, students: 0, price: `$${newCoursePrice}` }]);
                          setNewCourseTitle('');
                          setNewCourseDesc('');
                          setNewCourseHours('10');
                          setNewCourseLectures('12');
                          setNewCourseSyllabus('');
                          toast.success('Course created and listed successfully! 📚');
                        }}
                        className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                      >
                        Create Course
                      </button>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Your Course Catalog ({teacherCourses.length})</h4>
                      <div className="space-y-2">
                        {teacherCourses.map(course => (
                          <div key={course.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-muted/15 text-xs">
                            <div>
                              <p className="font-semibold text-foreground">📚 {course.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Level: {course.level} • Price: {course.price} • Students: {course.students}</p>
                            </div>
                            <span className="px-2 py-1 bg-coffee/10 text-coffee rounded text-[10px] font-bold">Listed</span>
                          </div>
                        ))}
                      </div>
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
                            <button
                              onClick={() => {
                                setActiveHostingWorkshop(ws);
                                toast.info(`Starting video connection for ${ws.title}...`);
                              }}
                              className="px-3 py-1.5 bg-coffee text-white rounded-lg font-semibold hover:opacity-90 text-[10px]"
                            >
                              Host Session
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'mentorship' && (
                  <div className="space-y-6 max-w-xl mx-auto">
                    <div className="bg-card rounded-2xl border border-border p-5">
                      <h3 className="font-semibold text-foreground mb-4">Add New Mentorship Student</h3>
                      <div className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-foreground mb-1">Student Full Name</label>
                            <input
                              type="text"
                              value={newStudentName}
                              onChange={e => setNewStudentName(e.target.value)}
                              placeholder="e.g. Charlie Parker"
                              className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-foreground mb-1">Email Address</label>
                            <input
                              type="email"
                              value={newStudentEmail}
                              onChange={e => setNewStudentEmail(e.target.value)}
                              placeholder="e.g. charlie@gmail.com"
                              className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-foreground mb-1">Instrument</label>
                            <select
                              value={newStudentInstrument}
                              onChange={e => setNewStudentInstrument(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                            >
                              <option value="Guitar">Guitar</option>
                              <option value="Piano">Piano</option>
                              <option value="Vocal">Vocal</option>
                              <option value="Drums">Drums</option>
                              <option value="Violin">Violin</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-foreground mb-1">Skill Level</label>
                            <select
                              value={newStudentLevel}
                              onChange={e => setNewStudentLevel(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-foreground mb-1">Lesson Goals / Focus Area</label>
                          <textarea
                            rows={2}
                            value={newStudentNotes}
                            onChange={e => setNewStudentNotes(e.target.value)}
                            placeholder="Describe what the student wants to focus on..."
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none resize-none"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (!newStudentName.trim() || !newStudentEmail.trim()) {
                              toast.error('Please fill in name and email address.');
                              return;
                            }
                            setMentorshipStudents([
                              ...mentorshipStudents,
                              {
                                id: Date.now(),
                                name: newStudentName,
                                notes: `${newStudentInstrument} (${newStudentLevel}) - Goal: ${newStudentNotes || 'Fundamentals'}`,
                                lastMeeting: 'Never'
                              }
                            ]);
                            setNewStudentName('');
                            setNewStudentEmail('');
                            setNewStudentNotes('');
                            toast.success('Mentorship student enrolled successfully!');
                          }}
                          className="w-full py-2 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90"
                        >
                          Enroll Mentorship Student
                        </button>
                      </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border p-5">
                      <h3 className="font-semibold text-foreground mb-4 font-display">Active Mentorship Roster</h3>
                      <div className="space-y-3">
                        {mentorshipStudents.map(student => (
                          <div key={student.id} className="p-3 border border-border rounded-xl bg-muted/15 text-xs flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-foreground">🎓 {student.name}</p>
                              <p className="text-muted-foreground mt-0.5">Focus: {student.notes}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">Last Class: {student.lastMeeting}</p>
                            </div>
                            <button
                              onClick={() => setSchedulingStudent(student)}
                              className="px-3 py-1.5 bg-coffee text-white font-semibold rounded-lg text-[10px]"
                            >
                              Schedule 1-on-1
                            </button>
                          </div>
                        ))}
                      </div>
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
                          setWithdrawAmount(teacherEarnings.toString());
                          setShowWithdrawalModal(true);
                        }}
                        className="w-full py-2 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700"
                      >
                        Withdraw Payout to Bank
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* TEACHER WORKSPACE INTERACTIVE MODALS       */}
                {/* ========================================== */}

                {/* Workshop Session Host Streaming Modal */}
                {activeHostingWorkshop && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-2xl w-full grid md:grid-cols-3 gap-6 relative animate-in fade-in zoom-in-95 duration-200">
                      {/* Video stream simulator */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-semibold text-foreground text-sm">🎥 Broadcasting: {activeHostingWorkshop.title}</h4>
                          <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full animate-pulse flex items-center gap-1">🔴 LIVE</span>
                        </div>
                        <div className="aspect-video bg-black rounded-xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                          <Music className="w-12 h-12 text-coffee/40 animate-bounce mb-3" />
                          <div className="flex gap-1 h-8 items-end">
                            {[...Array(8)].map((_, i) => (
                              <div key={i} className="w-1 bg-coffee rounded-t animate-bounce" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }} />
                            ))}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-4 z-10">Webcam feeds active • Audio broadcast high-fidelity stems</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setActiveHostingWorkshop(null);
                              toast.success('Live broadcast finished successfully! Feed archived.');
                            }}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex-1 transition-colors"
                          >
                            End Live Session
                          </button>
                        </div>
                      </div>

                      {/* Live chat panel */}
                      <div className="border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-[10px] uppercase text-muted-foreground mb-3">Live Session Chat</h5>
                          <div className="space-y-3 h-48 overflow-y-auto pr-1">
                            {workshopChats.map((chat, idx) => (
                              <div key={idx} className="text-[11px] leading-relaxed">
                                <strong className="text-coffee">@{chat.user}: </strong>
                                <span className="text-muted-foreground">{chat.msg}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border mt-3">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!workshopChatInput.trim()) return;
                              setWorkshopChats([...workshopChats, { user: user.name || 'You', msg: workshopChatInput.trim() }]);
                              setWorkshopChatInput('');
                            }}
                            className="flex gap-1.5"
                          >
                            <input
                              type="text"
                              placeholder="Say something..."
                              value={workshopChatInput}
                              onChange={(e) => setWorkshopChatInput(e.target.value)}
                              className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-[10px] text-foreground focus:outline-none focus:border-coffee/50"
                            />
                            <button
                              type="submit"
                              className="px-2.5 py-1.5 bg-coffee text-white text-[10px] font-bold rounded-lg hover:opacity-90"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mentorship 1-on-1 Lesson Scheduler Modal */}
                {schedulingStudent && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm">🗓️ Schedule Class: {schedulingStudent.name}</h4>
                        <button onClick={() => setSchedulingStudent(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Date</label>
                          <input
                            type="date"
                            value={meetingDate}
                            onChange={e => setMeetingDate(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Time</label>
                          <input
                            type="time"
                            value={meetingTime}
                            onChange={e => setMeetingTime(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div className="bg-muted/30 p-2.5 rounded-xl border border-border text-[10px] text-muted-foreground leading-relaxed">
                          📎 A calendar event invitation and Zoom/Google Meet link will be generated and dispatched automatically to student inbox.
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              toast.success(`1-on-1 session scheduled with ${schedulingStudent.name} for ${meetingDate} at ${meetingTime}! 📅`);
                              setMentorshipStudents(mentorshipStudents.map(s => s.id === schedulingStudent.id ? { ...s, lastMeeting: meetingDate } : s));
                              setSchedulingStudent(null);
                            }}
                            className="px-4 py-2 bg-coffee text-white font-semibold rounded-xl text-xs flex-1"
                          >
                            Book Lesson
                          </button>
                          <button
                            onClick={() => setSchedulingStudent(null)}
                            className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Withdraw Payout Account Selector Modal */}
                {showWithdrawalModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">💳 Confirm Payout Withdrawal</h4>
                        <button onClick={() => setShowWithdrawalModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-4 text-xs">
                        <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-3 text-center">
                          <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Available Balance</span>
                          <p className="text-2xl font-bold text-emerald-600 mt-0.5">${teacherEarnings}</p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Transfer Account</label>
                          <select
                            value={selectedWithdrawalAccount}
                            onChange={e => setSelectedWithdrawalAccount(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            {withdrawalAccounts.map(acc => (
                              <option key={acc} value={acc}>{acc}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Withdrawal Amount ($ USD)</label>
                          <input
                            type="number"
                            max={teacherEarnings}
                            value={withdrawAmount}
                            onChange={e => setWithdrawAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              const amt = parseFloat(withdrawAmount);
                              if (isNaN(amt) || amt <= 0 || amt > teacherEarnings) {
                                toast.error('Please enter a valid withdrawal amount.');
                                return;
                              }
                              toast.success(`Withdrawal request of $${amt.toLocaleString()} successfully queued to ${selectedWithdrawalAccount}! 🚀`);
                              setTeacherEarnings(prev => prev - amt);
                              setShowWithdrawalModal(false);
                            }}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex-1 transition-colors"
                          >
                            Confirm & Withdraw
                          </button>
                          <button
                            onClick={() => setShowWithdrawalModal(false)}
                            className="px-4 py-2.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
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
                  <div className="max-w-xl mx-auto space-y-4">
                    {isVenueSaved ? (
                      <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-lg animate-in fade-in duration-200 text-left">
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
                            {/* Visual representation of the venue */}
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
                              onClick={() => toast.success('Venue profile link copied to clipboard! 📋')}
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
                                toast.success('Venue listing details saved successfully! 🏛️');
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
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
                          toast.success('Event hosted at your venue! 🏟️');
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
                              <p className="font-semibold text-foreground">🏟️ {evt.name}</p>
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
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
                          toast.success(`Booking offer sent to ${bookingArtistName}! 🎤`);
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
                              <p className="font-semibold text-foreground">🎤 {offer.artist}</p>
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
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
                  <div className="space-y-6 max-w-2xl mx-auto text-left">
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

                {/* ========================================== */}
                {/* VENUE WORKSPACE INTERACTIVE MODALS         */}
                {/* ========================================== */}

                {/* Reservation Details Modal */}
                {viewingReservation && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">📋 Reservation Info: {viewingReservation.table}</h4>
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

                {/* Grow Audience Promotion Modal Form */}
                {showPromoModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">📢 Setup Local Ad Campaign</h4>
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
                                    budget: promoBudget,
                                    status: 'Running',
                                    impressions: 0,
                                    clicks: 0
                                  },
                                  ...venueCampaigns
                                ]);
                                setPromoAdTitle('');
                                setPromoAdDesc('');
                                setShowPromoModal(false);
                                toast.success(`Ad Campaign "${promoAdTitle || 'Local Promo'}" launched! $${promoBudget} charged to card.`);
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
                  <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-start animate-in fade-in duration-200">
                    {/* Create Event Form Card */}
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
                            toast.success('Event listing initialized! Ticket sales launched.');
                          }}
                          className="w-full py-2.5 bg-coffee text-white text-xs font-semibold rounded-xl hover:opacity-90 shadow-warm"
                        >
                          Launch Ticket Sales
                        </button>
                      </div>
                    </div>

                    {/* Running Programs & Ticket Sales History Card */}
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4">
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
                              <img src={art.avatar} alt={art.name} className="w-10 h-10 rounded-full object-cover border border-border" />
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
                              <p className="font-semibold text-foreground">🎤 {inv.name}</p>
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6">
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
                              <p className="font-semibold text-foreground">🎫 {att.name}</p>
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
                                    toast.success(`Checked in ${att.name}!`);
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6">
                    <div className="text-center mb-4">
                      <BarChart3 className="w-8 h-8 text-coffee mx-auto mb-2" />
                      <h3 className="font-semibold text-foreground mb-2">Analyze Success</h3>
                      <p className="text-xs text-muted-foreground">View real-time event analytics and export detailed registration reports.</p>
                    </div>

                    {/* CSS Graphic Charts */}
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
                        toast.success('Spreadsheet success report downloaded! 📊');
                      }}
                      className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90"
                    >
                      Export Report
                    </button>
                  </div>
                )}

                {/* ========================================== */}
                {/* ORGANIZER WORKSPACE INTERACTIVE MODALS    */}
                {/* ========================================== */}

                {/* Invite Artist Setup Modal */}
                {showInviteArtistModal && invitingArtist && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">🎤 Invite to Lineup: {invitingArtist.name}</h4>
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
                          📌 Dispatching this offer sends an invitation contract to the artist dashboard. Once they accept, they will join the event lineup catalog.
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
                              toast.success(`Performance invitation successfully dispatched to ${invitingArtist.name}! 🎤`);
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
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">🎫 Ticket Details: {viewingAttendee.name}</h4>
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
                  <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto text-left items-start animate-in fade-in duration-200">
                    {/* Verified Artists Catalog Card */}
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
                              Refreshed Catalog
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

                    {/* Sent Sponsorship Requests & History Card */}
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
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto">
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
                            toast.success('Sponsor campaign launched successfully! Real-time metrics generated.');
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
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold">☕ Sponsorship: {viewingSponsorOpportunity.name}</h4>
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
                                toast.success(`Sponsorship pledge confirmed for ${viewingSponsorOpportunity.name}! ☕`);
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
                    <div className="space-y-4 text-xs">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Platform Cut (Admin Fee)</label>
                          <select
                            value={platformFeePercentage}
                            onChange={e => setPlatformFeePercentage(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            <option value="5">5% commission</option>
                            <option value="10">10% commission</option>
                            <option value="15">15% commission</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">System Mode</label>
                          <select
                            value={maintenanceMode}
                            onChange={e => setMaintenanceMode(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            <option value="Disabled">Live & Operational</option>
                            <option value="Enabled">Maintenance Mode</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">User Sign-up Registry</label>
                          <select
                            value={allowRegistration}
                            onChange={e => setAllowRegistration(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            <option value="Yes">Enabled</option>
                            <option value="No">Disabled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Global Rate Limit (Req/Min)</label>
                          <input
                            type="number"
                            value={globalRateLimit}
                            onChange={e => setGlobalRateLimit(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Max Track Size (MB)</label>
                          <input
                            type="number"
                            value={maxUploadLimit}
                            onChange={e => setMaxUploadLimit(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">Min Payout Threshold ($)</label>
                          <input
                            type="number"
                            value={minWithdrawalThreshold}
                            onChange={e => setMinWithdrawalThreshold(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">System Contact Email</label>
                          <input
                            type="email"
                            value={adminContactEmail}
                            onChange={e => setAdminContactEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          />
                        </div>
                      </div>
                      <button onClick={() => toast.success('Platform configurations saved successfully! ⚙️')} className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90">
                        Save Configurations
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'verify-artists' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4">
                    <h3 className="font-semibold text-foreground mb-4">Artist Verification Requests</h3>
                    <div className="space-y-3">
                      {pendingVerifications.map(app => (
                        <div key={app.id} className="p-4 border border-border rounded-xl bg-muted/15 text-xs space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-foreground text-sm">🌟 {app.name}</p>
                              <p className="text-muted-foreground mt-0.5">Genre: {app.genre} • Applied: {app.joined}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setPendingVerifications(pendingVerifications.filter(a => a.id !== app.id));
                                  toast.success(`Artist "${app.name}" approved and verified successfully! 🌟`);
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-[10px]"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setRejectingArtistId(app.id);
                                  setShowRejectModal(true);
                                }}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-[10px]"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                          <div className="bg-card p-2 rounded border border-border text-[11px] leading-relaxed text-muted-foreground">
                            <strong>Bio: </strong>{app.bio}
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">Social Portfolio: </span>
                            <a href={app.socialLink} target="_blank" rel="noopener noreferrer" className="text-coffee font-semibold hover:underline">{app.socialLink}</a>
                          </div>
                        </div>
                      ))}
                      {pendingVerifications.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">No pending verification requests.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'moderation' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4">
                    <h3 className="font-semibold text-foreground mb-4">Moderate Content Feed</h3>
                    <div className="space-y-3">
                      {moderationReports.map(rep => (
                        <div key={rep.id} className="p-4 border border-border rounded-xl bg-muted/15 text-xs space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[9px] uppercase tracking-wider">{rep.reason}</span>
                              <p className="text-muted-foreground text-[10px] mt-1.5">Content ID: <strong className="text-foreground">{rep.contentId}</strong> • Reported by: <strong className="text-foreground">@{rep.author}</strong></p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setModerationReports(moderationReports.filter(r => r.id !== rep.id));
                                  toast.success('Content report dismissed. Post remains live.');
                                }}
                                className="px-3 py-1.5 border border-border text-foreground hover:bg-muted rounded-lg font-semibold text-[10px]"
                              >
                                Keep Content
                              </button>
                              <button
                                onClick={() => {
                                  setModerationReports(moderationReports.filter(r => r.id !== rep.id));
                                  toast.success('Flagged content successfully removed from platform. 🛡️');
                                }}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-[10px]"
                              >
                                Remove Content
                              </button>
                            </div>
                          </div>
                          <div className="p-2.5 bg-card rounded border border-border italic text-muted-foreground leading-relaxed text-[11px]">
                            "{rep.message}"
                          </div>
                        </div>
                      ))}
                      {moderationReports.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">No content reports pending moderation.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'revenue-split' && (
                  <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6">
                    <div className="text-center mb-4">
                      <DollarSign className="w-8 h-8 text-coffee mx-auto mb-2" />
                      <h3 className="font-semibold text-foreground mb-2">Platform Revenue Split Monitor</h3>
                      <p className="text-xs text-muted-foreground">General net transaction statistics showing platform cuts vs artist payouts.</p>
                    </div>

                    {/* CSS Graphic Charts */}
                    <div className="border border-border p-4 rounded-xl bg-muted/10 space-y-4">
                      <h4 className="text-[11px] font-bold text-muted-foreground uppercase">Accrued Platform Commissions</h4>
                      <div className="space-y-3.5">
                        {[
                          { name: 'Subscription Commissions', amount: 8450, max: 15000, color: 'bg-emerald-500' },
                          { name: 'Ticket Commission Cuts', amount: 4120, max: 10000, color: 'bg-violet-500' },
                          { name: 'Sponsorship Commission Cuts', amount: 2800, max: 5000, color: 'bg-coffee' }
                        ].map(bar => {
                          const pct = Math.round((bar.amount / bar.max) * 100);
                          return (
                            <div key={bar.name} className="text-[10px]">
                              <div className="flex justify-between items-center mb-1 font-medium">
                                <span className="text-foreground">{bar.name}</span>
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

                    <button
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8,"
                          + "Revenue Stream,Amount,Date,Source\n"
                          + "Subscription Commissions,$8450,2026-06-29,Platform Subscriptions Cuts\n"
                          + "Ticket Commission Cuts,$4120,2026-06-29,Event Ticket Sales Commission\n"
                          + "Sponsorship Commission Cuts,$2800,2026-06-29,Brand Partnerships Cuts\n";
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "Platform_Revenue_Statement.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        toast.success('Revenue statement downloaded successfully! 📊');
                      }}
                      className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90"
                    >
                      Download Statement
                    </button>
                  </div>
                )}

                {/* ========================================== */}
                {/* ADMIN WORKSPACE INTERACTIVE MODALS         */}
                {/* ========================================== */}

                {/* Artist Verification Reject Reasons Modal */}
                {showRejectModal && rejectingArtistId && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold font-display">⚠️ Decline Verification Request</h4>
                        <button onClick={() => { setShowRejectModal(false); setRejectingArtistId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Decline Reason</label>
                          <select
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                          >
                            <option value="Insufficient social links/portfolio info.">Insufficient social links/portfolio info.</option>
                            <option value="Missing profile photo or track attachments.">Missing profile photo or track attachments.</option>
                            <option value="Metadata conflicts with copyrighted materials.">Metadata conflicts with copyrighted materials.</option>
                            <option value="Verification details do not match profile role.">Verification details do not match profile role.</option>
                          </select>
                        </div>

                        <div className="bg-muted/30 p-2.5 rounded-xl border border-border leading-relaxed text-[10px] text-muted-foreground">
                          📌 Submitting this decline sends a notification email to the artist detailing the reject reason, allowing them to re-apply once resolved.
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              setPendingVerifications(pendingVerifications.filter(a => a.id !== rejectingArtistId));
                              toast.error(`Verification request declined. Reason: ${rejectReason}`);
                              setShowRejectModal(false);
                              setRejectingArtistId(null);
                            }}
                            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs flex-1 transition-colors"
                          >
                            Decline Request
                          </button>
                          <button
                            onClick={() => { setShowRejectModal(false); setRejectingArtistId(null); }}
                            className="px-4 py-2.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                            toast.success(`Inquiry sent to ${inquiringArtist.name}! Offer of $${inquiryBudget} is pending. 🚀`);
                            setInquiringArtist(null);
                            setInquiryMessage('');
                          }}
                          className="w-full py-2.5 bg-coffee text-white font-semibold rounded-xl hover:opacity-90 shadow-warm animate-in"
                        >
                          Send Inquiry Offer
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {viewingCourseDetails && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-display font-semibold text-foreground text-sm font-bold flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-coffee" />
                          {viewingCourseDetails.isWorkshop ? 'Workshop Masterclass' : 'Course Details'}
                        </h4>
                        <button onClick={() => setViewingCourseDetails(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <p className="font-semibold text-foreground text-base leading-snug">{viewingCourseDetails.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Instructor: {viewingCourseDetails.instructor}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-3 text-left">
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-muted-foreground">Class Schedule</span>
                            <span className="font-medium text-foreground text-[10px] leading-tight block mt-0.5">{viewingCourseDetails.schedule}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-muted-foreground">Class Level / Duration</span>
                            <span className="font-medium text-foreground text-[10px] leading-tight block mt-0.5">{viewingCourseDetails.level} ({viewingCourseDetails.duration})</span>
                          </div>
                        </div>

                        <div>
                          <span className="block text-[9px] uppercase font-bold text-muted-foreground mb-1">Syllabus Overview</span>
                          <p className="text-muted-foreground leading-relaxed text-[11px]">{viewingCourseDetails.syllabus}</p>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => {
                              if (viewingCourseDetails.isWorkshop) {
                                const isRegistered = joinedWorkshops.includes(viewingCourseDetails.id);
                                if (isRegistered) {
                                  toast.info('You are already registered for this session.');
                                  return;
                                }
                                if (viewingCourseDetails.seatsLeft <= 0) {
                                  toast.error('This session is sold out.');
                                  return;
                                }
                                setJoinedWorkshops([...joinedWorkshops, viewingCourseDetails.id]);
                                setTeacherWorkshops(teacherWorkshops.map(w => w.id === viewingCourseDetails.id ? { ...w, seatsLeft: w.seatsLeft - 1 } : w));
                                toast.success(`Successfully registered for "${viewingCourseDetails.title}"! 🎟️`);
                              } else {
                                const isEnrolled = joinedCourses.includes(viewingCourseDetails.id);
                                if (isEnrolled) {
                                  toast.info('You are already enrolled in this course.');
                                  return;
                                }
                                setJoinedCourses([...joinedCourses, viewingCourseDetails.id]);
                                setTeacherCourses(teacherCourses.map(c => c.id === viewingCourseDetails.id ? { ...c, students: c.students + 1 } : c));
                                toast.success(`Successfully enrolled in "${viewingCourseDetails.title}"! 🎒`);
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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
