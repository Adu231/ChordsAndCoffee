import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Music, Calendar, Users, BarChart3, Settings, Star,
  TrendingUp, DollarSign, Eye, Heart, MessageSquare, Play, Plus,
  Bell, Search, Menu, X, Coffee, LogOut, ChevronRight, Mic2,
  BookOpen, MapPin, Clock, User, Award
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 840, streams: 1200 },
  { month: 'Feb', revenue: 1100, streams: 1800 },
  { month: 'Mar', revenue: 980, streams: 1500 },
  { month: 'Apr', revenue: 1450, streams: 2200 },
  { month: 'May', revenue: 1700, streams: 2800 },
  { month: 'Jun', revenue: 2100, streams: 3400 },
  { month: 'Jul', revenue: 2840, streams: 4200 },
];

const upcomingEvents = [
  { id: 1, name: 'Open Mic Night', venue: 'The Grind Café', date: 'Jul 5', time: '8:00 PM', status: 'confirmed', attendees: 45 },
  { id: 2, name: 'Acoustic Set', venue: 'Brew & Strum', date: 'Jul 12', time: '7:30 PM', status: 'pending', attendees: 30 },
  { id: 3, name: 'Jazz Evening', venue: 'Notes & Beans', date: 'Jul 19', time: '9:00 PM', status: 'confirmed', attendees: 60 },
];

const topTracks = [
  { title: 'Café Mornings', plays: 12400, likes: 847, trend: '+12%' },
  { title: 'Golden Hours', plays: 9200, likes: 614, trend: '+8%' },
  { title: 'Midnight Jazz', plays: 7800, likes: 502, trend: '+5%' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Music, label: 'My Music', id: 'music' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: Users, label: 'Community', id: 'community' },
  { icon: BookOpen, label: 'Academy', id: 'academy' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: DollarSign, label: 'Earnings', id: 'earnings' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const stats = [
    { label: 'Total Streams', value: '42.8K', change: '+24%', icon: Play, color: 'text-coffee' },
    { label: 'Monthly Revenue', value: '$2,840', change: '+18%', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Fan Followers', value: '1,247', change: '+12%', icon: Heart, color: 'text-red-500' },
    { label: 'Upcoming Events', value: '3', change: '', icon: Calendar, color: 'text-violet-600' },
  ];

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

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                activeTab === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
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
              <p className="text-xs text-sidebar-foreground/50 truncate">{user.role}</p>
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
                placeholder="Search artists, events..."
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/30 border border-border"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => toast.info('No new notifications')}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
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
                  Good evening, {user.name.split(' ')[0]} 👋
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your music today.</p>
              </div>
              <button
                onClick={() => toast.success('Event creation coming soon!')}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-coffee text-white text-sm font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" /> New Event
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 hover:shadow-warm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    {stat.change && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">{stat.change}</span>
                    )}
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground mb-0.5">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-semibold text-foreground">Revenue Overview</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Last 7 months</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">+24% YoY</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(25, 32%, 32%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(25, 32%, 32%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(v: number) => [`$${v}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(25, 32%, 32%)" strokeWidth={2} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Top Tracks */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-foreground">Top Tracks</h3>
                  <button className="text-xs text-coffee font-medium hover:underline">View all</button>
                </div>
                <div className="space-y-4">
                  {topTracks.map((t, i) => (
                    <div key={t.title} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                      <div className="w-9 h-9 rounded-lg bg-coffee/10 flex items-center justify-center flex-shrink-0">
                        <Music className="w-4 h-4 text-coffee" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{t.title}</p>
                        <p className="text-xs text-muted-foreground">{t.plays.toLocaleString()} plays</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">{t.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card rounded-2xl border border-border p-5 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                <button className="text-xs text-coffee font-medium hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-coffee/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-coffee">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-display font-bold text-coffee leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{event.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{event.venue}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />{event.attendees}
                      </div>
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-semibold',
                        event.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      )}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streams Chart */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-foreground">Monthly Streams</h3>
                  <p className="text-xs text-muted-foreground">Total listener activity</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="streams" fill="hsl(43, 87%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
