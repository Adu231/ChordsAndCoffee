import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Coffee, X, Menu, Search, Bell, Settings, LogOut, Award
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
}

interface DashboardLayoutProps {
  roleLabel: string;
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export default function DashboardLayout({
  roleLabel,
  navItems,
  activeTab,
  setActiveTab,
  children
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Notifications State
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, text: "Alex Rivera uploaded a new track: 'Midnight Jazz'!", read: false, time: '2h ago' },
    { id: 2, text: "Your ticket for Open Mic Night at The Grind Café is confirmed! ", read: false, time: '1d ago' },
    { id: 3, text: "New discussion started in Acoustic Fans: 'Who is going?'", read: true, time: '2d ago' },
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Signed out successfully');
  };

  if (!user) {
    return null;
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
                  Hello, {user.name.split(' ')[0]} 
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Here is your tailored workspace. Let's start the flow.</p>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
