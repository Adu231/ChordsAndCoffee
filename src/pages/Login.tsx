import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Coffee, Music, AlertCircle, ArrowRight, X } from 'lucide-react';
import { useAuth, DEMO_USERS } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [oauthProvider, setOauthProvider] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back! 🎵');
      navigate('/dashboard');
    } else {
      setErrors({ form: result.error || 'Login failed.' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(220,27%,10%)] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-coffee rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <Link
            to="/"
            className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-8 shadow-warm-lg hover:scale-105 transition-transform"
          >
            <Coffee className="w-10 h-10 text-amber-200" />
          </Link>
          <h2 className="font-display font-bold text-3xl text-white mb-4">Welcome back<br />to the music</h2>
          <p className="text-white/60 text-base leading-relaxed max-w-xs">
            Sign in to continue your creative journey — your performances, collaborators, and community are waiting.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { value: '50K+', label: 'Artists' },
              { value: '2.4K+', label: 'Venues' },
              { value: '180K+', label: 'Events' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-xl font-display font-bold text-gold">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden group">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-amber-200" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ChordsAndCoffee</span>
          </Link>

          <div className="mb-6">
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground mb-4">Don't have an account? <Link to="/register" className="text-coffee font-semibold hover:underline">Create one free</Link></p>
          </div>

          {/* Quick Demo Login Panel */}
          <div className="mb-6 bg-muted/40 border border-border/80 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Quick Demo Sign In (7 Roles)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(DEMO_USERS).map(([demoEmail, profile], idx) => {
                let roleLabel = '';
                switch (profile.role) {
                  case 'fan': roleLabel = 'Music Lover'; break;
                  case 'musician': roleLabel = 'Musician'; break;
                  case 'teacher': roleLabel = 'Music Teacher'; break;
                  case 'venue': roleLabel = 'Café / Venue'; break;
                  case 'organizer': roleLabel = 'Event Org'; break;
                  case 'sponsor': roleLabel = 'Sponsor'; break;
                  case 'admin': roleLabel = 'Admin'; break;
                  default: roleLabel = profile.role;
                }

                return (
                  <button
                    key={demoEmail}
                    type="button"
                    onClick={async () => {
                      setEmail(demoEmail);
                      setPassword('password');
                      const result = await login(demoEmail, 'password');
                      if (result.success) {
                        toast.success(`Logged in as ${profile.name} (${roleLabel})! 🎵`);
                        navigate('/dashboard');
                      } else {
                        toast.error(result.error || 'Demo login failed.');
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 p-2 bg-card hover:bg-muted/80 border border-border rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.98] group shadow-sm",
                      idx === 6 && "col-span-2"
                    )}
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-7 h-7 rounded-full object-cover border border-gold/30"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate group-hover:text-coffee transition-colors">{profile.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate font-medium">{roleLabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {errors.form && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                className={`w-full px-4 py-3 rounded-xl border text-foreground bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors text-sm ${errors.email ? 'border-destructive' : 'border-border'}`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-xs text-coffee hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-foreground bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 transition-colors text-sm ${errors.password ? 'border-destructive' : 'border-border'}`}
                  placeholder="Min. 6 characters"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs text-muted-foreground bg-background px-3">or continue with</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {['Google', 'Apple'].map(provider => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setOauthProvider(provider)}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  {provider === 'Google' ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" width="16" height="16">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.525 0-6.39-2.865-6.39-6.39s2.865-6.39 6.39-6.39c1.616 0 3.097.606 4.225 1.597l3.057-3.057C19.23 2.51 15.932 1 12.24 1 5.866 1 .7 6.166.7 12.54s5.166 11.54 11.54 11.54c6.643 0 11.54-4.664 11.54-11.54 0-.783-.07-1.54-.2-2.255H12.24z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-foreground" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.99 1.12.09 2.27-.58 2.98-1.43z"/>
                    </svg>
                  )}
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing in you agree to our{' '}
            <Link to="/terms" className="text-coffee hover:underline">Terms</Link> and{' '}
            <Link to="/privacy-policy" className="text-coffee hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* OAuth Mock Login Picker Modal */}
      {oauthProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                {oauthProvider === 'Google' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.525 0-6.39-2.865-6.39-6.39s2.865-6.39 6.39-6.39c1.616 0 3.097.606 4.225 1.597l3.057-3.057C19.23 2.51 15.932 1 12.24 1 5.866 1 .7 6.166.7 12.54s5.166 11.54 11.54 11.54c6.643 0 11.54-4.664 11.54-11.54 0-.783-.07-1.54-.2-2.255H12.24z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.99 1.12.09 2.27-.58 2.98-1.43z"/>
                  </svg>
                )}
                Sign In with {oauthProvider}
              </h3>
              <button
                type="button"
                onClick={() => setOauthProvider(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4 font-normal">
              Select one of your saved {oauthProvider} accounts to quickly sign in.
            </p>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {[
                { name: 'Emily Johnson', email: 'lover@example.com', demoEmail: 'lover@example.com', role: 'Music Lover', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
                { name: 'Alex Rivera', email: 'musician@example.com', demoEmail: 'musician@example.com', role: 'Musician', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { name: 'Marcus Chen', email: 'teacher@example.com', demoEmail: 'teacher@example.com', role: 'Music Teacher', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { name: 'Sarah Jenkins', email: 'venue@example.com', demoEmail: 'venue@example.com', role: 'Café / Venue Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' }
              ].map(acc => {
                const displayEmail = oauthProvider === 'Google' 
                  ? `${acc.name.toLowerCase().replace(' ', '.')}@gmail.com`
                  : `${acc.name.toLowerCase().replace(' ', '.')}@icloud.com`;
                return (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={async () => {
                      const result = await login(acc.demoEmail, 'password');
                      if (result.success) {
                        toast.success(`Signed in with ${oauthProvider} as ${acc.name}! 🎵`);
                        setOauthProvider(null);
                        navigate('/dashboard');
                      } else {
                        toast.error(result.error || 'Authentication failed.');
                      }
                    }}
                    className="w-full flex items-center gap-3 p-2.5 bg-muted/30 hover:bg-muted border border-border rounded-xl text-left transition-colors"
                  >
                    <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-full object-cover border border-border" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground truncate">{acc.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{displayEmail}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 bg-coffee/10 text-coffee rounded-full font-bold">{acc.role}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setOauthProvider(null)}
                className="px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:bg-muted font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
