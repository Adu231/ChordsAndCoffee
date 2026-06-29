import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Coffee, Music, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
          <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-8 shadow-warm-lg">
            <Coffee className="w-10 h-10 text-amber-200" />
          </div>
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
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-200" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ChordsAndCoffee</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Don't have an account? <Link to="/register" className="text-coffee font-semibold hover:underline">Create one free</Link></p>
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
                  onClick={() => toast.info(`${provider} login coming soon!`)}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Music className="w-4 h-4 text-muted-foreground" />
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
    </div>
  );
}
