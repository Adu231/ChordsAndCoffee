import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Palette, CreditCard, Check, Moon, Sun, X, Lock, Key, AlertTriangle, Coffee } from 'lucide-react';
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
  const { user, updateProfile, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // Profile Edit States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: 'https://chordsandcoffee.com',
  });

  // Photo uploading states
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Notification States
  const [notificationSettings, setNotificationSettings] = useState<Record<string, 'email' | 'push' | 'off'>>({
    eventReminders: 'email',
    newFollowers: 'push',
    newMessages: 'push',
    weeklyDigest: 'email',
    promotions: 'off',
    collaborationRequests: 'email',
  });

  // Security/Reset States
  const [sendingReset, setSendingReset] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  // Delete Account States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Billing modal states
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBillingHistoryModal, setShowBillingHistoryModal] = useState(false);

  // Active payment cards
  const [paymentCards, setPaymentCards] = useState([
    { id: 1, brand: 'Visa', last4: '4242', exp: '12/28', isDefault: true }
  ]);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVC, setNewCardCVC] = useState('');

  // Active plan state
  const [activePlan, setActivePlan] = useState('Artist Plan');

  const handleSaveProfile = () => {
    updateProfile({ name: profileForm.name, bio: profileForm.bio, location: profileForm.location });
    setIsEditingProfile(false);
    toast.success('Profile settings updated successfully!');
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display font-semibold text-xl text-foreground">Profile Settings</h2>
                  <button
                    onClick={() => {
                      if (isEditingProfile) {
                        // Revert form values to current user values
                        setProfileForm({
                          name: user.name || '',
                          email: user.email || '',
                          bio: user.bio || '',
                          location: user.location || '',
                          website: 'https://chordsandcoffee.com',
                        });
                      }
                      setIsEditingProfile(!isEditingProfile);
                    }}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold rounded-xl border transition-all",
                      isEditingProfile 
                        ? "border-border text-muted-foreground hover:text-foreground hover:bg-muted" 
                        : "bg-coffee text-white border-coffee shadow-warm hover:opacity-90"
                    )}
                  >
                    {isEditingProfile ? 'Cancel Edit' : 'Update Profile'}
                  </button>
                </div>

                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border">
                  <div className="relative group">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-border" />
                    {uploadingPhoto && (
                      <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="settings-avatar-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error('Image size must be less than 5MB');
                            return;
                          }
                          setUploadingPhoto(true);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              updateProfile({ avatar: reader.result });
                              setUploadingPhoto(false);
                              toast.success('Profile picture updated successfully!');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button
                      onClick={() => document.getElementById('settings-avatar-input')?.click()}
                      className="px-4 py-2 bg-coffee/10 text-coffee text-sm font-semibold rounded-xl hover:bg-coffee hover:text-white transition-all shadow-sm"
                    >
                      Change Photo
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder="Your full name"
                      />
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-foreground text-sm font-medium">
                        {user.name || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder="you@example.com"
                      />
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-foreground text-sm font-medium">
                        {user.email || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={e => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder="City, Country"
                      />
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-foreground text-sm font-medium">
                        {user.location || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Website</label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileForm.website}
                        onChange={e => setProfileForm(p => ({ ...p, website: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-foreground text-sm font-medium text-coffee underline">
                        {profileForm.website || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                    {isEditingProfile ? (
                      <textarea
                        value={profileForm.bio}
                        onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors"
                        placeholder="Tell your story..."
                      />
                    ) : (
                      <div className="px-4 py-3 rounded-xl bg-muted/40 border border-transparent text-foreground text-sm leading-relaxed whitespace-pre-wrap min-h-[80px]">
                        {user.bio || 'No bio written yet.'}
                      </div>
                    )}
                  </div>
                </div>

                {isEditingProfile && (
                  <button
                    onClick={handleSaveProfile}
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5"
                  >
                    <Check className="w-4 h-4" /> Save Changes
                  </button>
                )}
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {[
                    { key: 'eventReminders', label: 'Event Reminders', desc: 'Get notified before your upcoming events.' },
                    { key: 'newFollowers', label: 'New Followers', desc: 'When someone follows your artist profile.' },
                    { key: 'newMessages', label: 'Direct Messages', desc: 'When you receive new messages.' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A summary of your week on the platform.' },
                    { key: 'promotions', label: 'Promotions & Offers', desc: 'Special deals and platform announcements.' },
                    { key: 'collaborationRequests', label: 'Collaboration Requests', desc: 'When artists want to collaborate with you.' },
                  ].map(info => (
                    <div key={info.key} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border last:border-0 gap-3">
                      <div>
                        <p className="font-medium text-sm text-foreground">{info.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                      </div>
                      <div className="flex bg-muted/50 p-1 rounded-xl border border-border self-start sm:self-center">
                        {(['email', 'push', 'off'] as const).map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setNotificationSettings(p => ({ ...p, [info.key]: option }));
                              toast.success(`Notification mode updated to ${option}`);
                            }}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                              notificationSettings[info.key] === option
                                ? "bg-coffee text-white shadow-warm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">Appearance</h2>
                <div>
                  <p className="text-sm font-medium text-foreground mb-4">Theme</p>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {[
                      { id: 'light', label: 'Light', Icon: Sun },
                      { id: 'dark', label: 'Dark', Icon: Moon },
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
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
                    <button
                      type="button"
                      onClick={() => {
                        setSendingReset(true);
                        setTimeout(() => {
                          setSendingReset(false);
                          toast.success(`Password reset verification email sent to ${user.email}! 🔑`);
                        }, 1200);
                      }}
                      disabled={sendingReset}
                      className="px-4 py-2.5 bg-coffee text-white text-sm font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-colors disabled:opacity-55 flex items-center gap-2"
                    >
                      {sendingReset ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : 'Send Reset Email'}
                    </button>
                  </div>

                  <div className="p-5 bg-muted rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-foreground">Two-Factor Authentication (2FA)</h4>
                      <span className={cn(
                        "px-2 py-0.5 text-xs font-semibold rounded-full",
                        is2FAEnabled ? "bg-emerald-500/10 text-emerald-600" : "bg-muted border border-border text-muted-foreground"
                      )}>
                        {is2FAEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Add an extra layer of protection using an authenticator app (Google Authenticator, Duo).</p>
                    <button
                      type="button"
                      onClick={() => {
                        if (is2FAEnabled) {
                          setIs2FAEnabled(false);
                          toast.info('Two-Factor Authentication disabled.');
                        } else {
                          setShow2FAModal(true);
                        }
                      }}
                      className="px-4 py-2.5 border border-border text-sm font-semibold rounded-xl hover:bg-card transition-colors text-foreground shadow-sm bg-background"
                    >
                      {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>

                  <div className="p-5 border border-destructive/20 rounded-xl bg-destructive/5">
                    <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated music, course, and event data. This action is irreversible.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeleteConfirmText('');
                      }}
                      className="px-4 py-2.5 bg-destructive text-white text-sm font-semibold rounded-xl hover:bg-destructive/95 transition-colors"
                    >
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
                      <p className="font-semibold text-foreground">{activePlan}</p>
                      <p className="text-sm text-muted-foreground">
                        {activePlan === 'Free Forever' ? 'Ad-supported Streaming' : activePlan === 'Artist Plan' ? '$12/month · Next renewal Jul 29, 2026' : '$39/month · Next renewal Jul 29, 2026'}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-coffee text-white text-xs font-semibold rounded-full">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Upgrade Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Manage Payment Methods
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBillingHistoryModal(true)}
                    className="w-full py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    View Billing History
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal Overlay */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200">
            <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-coffee" />
              Configure 2FA
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Scan this QR code with Google Authenticator or Microsoft Authenticator, then enter the code below.</p>
            
            <div className="flex flex-col items-center gap-3 p-4 bg-muted/40 border border-border rounded-xl mb-4">
              {/* Mock QR Code graphic */}
              <div className="w-32 h-32 bg-white p-2 rounded-lg border border-border flex items-center justify-center relative">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-85">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-sm",
                        (i % 2 === 0 || i % 3 === 0) && i % 5 !== 0 ? "bg-slate-900" : "bg-slate-100"
                      )}
                    />
                  ))}
                </div>
                <div className="absolute w-5 h-5 bg-white flex items-center justify-center rounded-md shadow-sm border border-border">
                  <Coffee className="w-3.5 h-3.5 text-coffee" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">SECRET: CHORDS COFFEE 2FA MOCK</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">6-Digit Authenticator Code</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 border border-border rounded-xl text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-coffee/30"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (twoFACode.length !== 6) {
                      toast.error('Please enter a valid 6-digit code.');
                      return;
                    }
                    setIs2FAEnabled(true);
                    setShow2FAModal(false);
                    setTwoFACode('');
                    toast.success('Two-Factor Authentication (2FA) enabled successfully! 🛡️');
                  }}
                  className="flex-1 py-2 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-all shadow-warm"
                >
                  Verify & Activate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShow2FAModal(false);
                    setTwoFACode('');
                  }}
                  className="flex-1 py-2 bg-muted border border-border text-muted-foreground text-xs font-semibold rounded-xl hover:text-foreground transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal Overlay */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200">
            <h3 className="font-display font-bold text-lg text-destructive mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Delete Account Permanently?
            </h3>
            <p className="text-xs text-muted-foreground mb-4">This action will delete your account details, posts, and verification logs. To confirm, type <strong className="text-foreground">DELETE</strong> below.</p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Type DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl text-center text-sm font-semibold bg-muted/40 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-destructive/30"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
                      toast.error('Verification code does not match. Type DELETE to confirm.');
                      return;
                    }
                    setShowDeleteModal(false);
                    toast.success('Your account has been deleted successfully.');
                    logout();
                    navigate('/');
                  }}
                  className="flex-1 py-2 bg-destructive text-white font-semibold text-xs rounded-xl hover:bg-destructive/90 transition-all shadow-sm"
                >
                  Confirm Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                  className="flex-1 py-2 bg-muted border border-border text-muted-foreground text-xs font-semibold rounded-xl hover:text-foreground transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-md w-full relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Palette className="w-5 h-5 text-coffee" />
                Change Subscription Plan
              </h3>
              <button onClick={() => setShowUpgradeModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {[
                { name: 'Free Forever', price: '$0', desc: 'Basic listener features, free ad-supported streaming.' },
                { name: 'Artist Plan', price: '$12/mo', desc: 'Upload unlimited songs, follow venues, host live events.' },
                { name: 'Venue / Sponsor Plan', price: '$39/mo', desc: 'Promote local ad campaigns, custom layouts, booking portals.' }
              ].map(plan => (
                <div
                  key={plan.name}
                  onClick={() => {
                    if (activePlan === plan.name) return;
                    setActivePlan(plan.name);
                    toast.success(`Successfully switched to ${plan.name}! 🚀`);
                    setShowUpgradeModal(false);
                  }}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer transition-all flex justify-between items-start",
                    activePlan === plan.name 
                      ? "border-coffee bg-coffee/5 shadow-sm" 
                      : "border-border hover:border-coffee/30 bg-muted/20"
                  )}
                >
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                      {plan.name}
                      {activePlan === plan.name && <span className="text-[10px] bg-coffee text-white px-2 py-0.5 rounded-full font-bold">Current</span>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                  </div>
                  <strong className="text-sm text-coffee">{plan.price}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manage Payment Methods Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-coffee" />
                Payment Methods
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Saved Cards</p>
              {paymentCards.map(card => (
                <div key={card.id} className="p-3 border border-border bg-muted/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-coffee/10 border border-coffee/20 rounded flex items-center justify-center font-mono text-[9px] font-bold text-coffee uppercase">
                      {card.brand}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">•••• •••• •••• {card.last4}</p>
                      <p className="text-[10px] text-muted-foreground">Expires {card.exp}</p>
                    </div>
                  </div>
                  {card.isDefault ? (
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Default</span>
                  ) : (
                    <button
                      onClick={() => {
                        setPaymentCards(paymentCards.map(c => c.id === card.id ? { ...c, isDefault: true } : { ...c, isDefault: false }));
                        toast.success('Default payment card updated.');
                      }}
                      className="text-[9px] font-bold text-coffee hover:underline"
                    >
                      Make Default
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Add New Card</p>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-medium text-foreground mb-1">Card Number</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="4111 2222 3333 4444"
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 border border-border rounded-xl text-xs bg-muted/20 focus:outline-none focus:ring-1 focus:ring-coffee"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-foreground mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-xl text-xs bg-muted/20 focus:outline-none focus:ring-1 focus:ring-coffee"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-foreground mb-1">CVC</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      value={newCardCVC}
                      onChange={(e) => setNewCardCVC(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 border border-border rounded-xl text-xs bg-muted/20 focus:outline-none focus:ring-1 focus:ring-coffee"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (newCardNumber.length < 12 || newCardExpiry.length < 4 || newCardCVC.length < 3) {
                      toast.error('Please fill out all card fields.');
                      return;
                    }
                    const newCard = {
                      id: Date.now(),
                      brand: 'Visa',
                      last4: newCardNumber.slice(-4) || '1111',
                      exp: newCardExpiry,
                      isDefault: false
                    };
                    setPaymentCards([...paymentCards, newCard]);
                    setNewCardNumber('');
                    setNewCardExpiry('');
                    setNewCardCVC('');
                    toast.success('New card added successfully!');
                  }}
                  className="w-full py-2 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-all shadow-warm"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Billing History Modal */}
      {showBillingHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-md w-full relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-coffee" />
                Billing Invoices
              </h3>
              <button onClick={() => setShowBillingHistoryModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { id: 'INV-2026-001', date: 'Jun 29, 2026', amount: '$12.00', status: 'Paid' },
                { id: 'INV-2026-002', date: 'May 29, 2026', amount: '$12.00', status: 'Paid' },
                { id: 'INV-2026-003', date: 'Apr 29, 2026', amount: '$12.00', status: 'Paid' }
              ].map(invoice => (
                <div key={invoice.id} className="p-3 border border-border bg-muted/20 rounded-xl flex items-center justify-between text-xs text-left">
                  <div>
                    <p className="font-semibold text-foreground">Invoice #{invoice.id}</p>
                    <p className="text-[10px] text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{invoice.amount}</p>
                    <button
                      onClick={() => {
                        const content = `Invoice ID,Date,Amount,Status\n${invoice.id},${invoice.date},${invoice.amount},${invoice.status}`;
                        const blob = new Blob([content], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Invoice_${invoice.id}.csv`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        toast.success(`Downloaded Invoice #${invoice.id}! 📄`);
                      }}
                      className="text-[10px] text-coffee font-semibold hover:underline block mt-0.5"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
