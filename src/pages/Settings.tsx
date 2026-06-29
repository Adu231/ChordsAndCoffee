import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Bell, Shield, Palette, CreditCard, Globe, Check, Moon, Sun, Monitor } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const settingsSections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: '',
  });

  const [notifications, setNotifications] = useState({
    eventReminders: true,
    newFollowers: true,
    newMessages: false,
    weeklyDigest: true,
    promotions: false,
    collaborationRequests: true,
  });

  const handleSaveProfile = () => {
    updateProfile({ name: profileForm.name, bio: profileForm.bio, location: profileForm.location });
    toast.success('Profile settings saved!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <div className="text-center p-8">
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">Sign In Required</h2>
          <Link to="/login" className="px-6 py-3 bg-coffee text-white font-semibold rounded-xl">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="space-y-1">
              {settingsSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    activeSection === s.id ? 'bg-coffee text-white shadow-warm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'profile' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Profile Settings</h2>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border">
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-border" />
                  <div>
                    <button
                      onClick={() => toast.info('Photo upload coming soon!')}
                      className="px-4 py-2 bg-coffee text-white text-sm font-medium rounded-xl hover:bg-[hsl(25,40%,26%)] transition-colors shadow-warm"
                    >
                      Change Photo
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', key: 'name', placeholder: 'Your full name' },
                    { label: 'Email Address', key: 'email', placeholder: 'you@example.com', type: 'email' },
                    { label: 'Location', key: 'location', placeholder: 'City, Country' },
                    { label: 'Website', key: 'website', placeholder: 'https://yourwebsite.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                      <input
                        type={field.type || 'text'}
                        value={profileForm[field.key as keyof typeof profileForm]}
                        onChange={e => setProfileForm(p => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                      placeholder="Tell your story..."
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="mt-6 flex items-center gap-2 px-6 py-3 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Notification Preferences</h2>
                <div className="space-y-5">
                  {Object.entries(notifications).map(([key, value]) => {
                    const labels: Record<string, { label: string; desc: string }> = {
                      eventReminders: { label: 'Event Reminders', desc: 'Get notified before your upcoming events.' },
                      newFollowers: { label: 'New Followers', desc: 'When someone follows your artist profile.' },
                      newMessages: { label: 'Direct Messages', desc: 'When you receive new messages.' },
                      weeklyDigest: { label: 'Weekly Digest', desc: 'A summary of your week on the platform.' },
                      promotions: { label: 'Promotions & Offers', desc: 'Special deals and platform announcements.' },
                      collaborationRequests: { label: 'Collaboration Requests', desc: 'When artists want to collaborate with you.' },
                    };
                    const info = labels[key];
                    return (
                      <div key={key} className="flex items-start justify-between py-4 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-sm text-foreground">{info.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            setNotifications(p => ({ ...p, [key]: !p[key as keyof typeof p] }));
                            toast.success('Preference saved');
                          }}
                          className={cn(
                            'relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5',
                            value ? 'bg-coffee' : 'bg-muted'
                          )}
                        >
                          <span className={cn(
                            'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
                            value ? 'translate-x-6' : 'translate-x-1'
                          )} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Appearance</h2>
                <div>
                  <p className="text-sm font-medium text-foreground mb-4">Theme</p>
                  <div className="grid grid-cols-3 gap-3 max-w-sm">
                    {[
                      { id: 'light', label: 'Light', Icon: Sun },
                      { id: 'dark', label: 'Dark', Icon: Moon },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id as 'light' | 'dark'); toast.success(`${t.label} mode enabled`); }}
                        className={cn(
                          'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                          theme === t.id ? 'border-coffee bg-coffee/5' : 'border-border hover:border-coffee/40'
                        )}
                      >
                        <t.Icon className={cn('w-5 h-5', theme === t.id ? 'text-coffee' : 'text-muted-foreground')} />
                        <span className={cn('text-xs font-medium', theme === t.id ? 'text-coffee' : 'text-muted-foreground')}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Privacy & Security</h2>
                <div className="space-y-6">
                  <div className="p-5 bg-muted rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Change Password</h4>
                    <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure.</p>
                    <button onClick={() => toast.info('Password change email sent!')} className="px-4 py-2.5 bg-coffee text-white text-sm font-medium rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-colors">
                      Send Reset Email
                    </button>
                  </div>
                  <div className="p-5 bg-muted rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
                    <button onClick={() => toast.info('2FA setup coming soon!')} className="px-4 py-2.5 border border-border text-sm font-medium rounded-xl hover:bg-card transition-colors text-foreground">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="p-5 border border-destructive/20 rounded-xl bg-destructive/5">
                    <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data.</p>
                    <button onClick={() => toast.error('This action cannot be undone. Contact support.')} className="px-4 py-2.5 bg-destructive text-white text-sm font-medium rounded-xl hover:bg-destructive/90 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'billing' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Billing & Subscription</h2>
                <div className="p-5 bg-coffee/5 border border-coffee/20 rounded-xl mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Artist Plan</p>
                      <p className="text-sm text-muted-foreground">$12/month · Next renewal Jul 29, 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-coffee text-white text-xs font-semibold rounded-full">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button onClick={() => toast.info('Plan upgrade coming soon!')} className="w-full py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    Upgrade Plan
                  </button>
                  <button onClick={() => toast.info('Payment methods coming soon!')} className="w-full py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    Manage Payment Methods
                  </button>
                  <button onClick={() => toast.info('Billing history coming soon!')} className="w-full py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    View Billing History
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
