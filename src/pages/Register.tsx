import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Coffee, AlertCircle, ArrowRight, CheckCircle, Music, Mic2, GraduationCap, Store, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const roles = [
  { id: 'musician', label: 'Musician', icon: Music, desc: 'Perform & collaborate' },
  { id: 'fan', label: 'Music Fan', icon: Coffee, desc: 'Discover & support' },
  { id: 'teacher', label: 'Music Teacher', icon: GraduationCap, desc: 'Teach & inspire' },
  { id: 'venue', label: 'Café / Venue', icon: Store, desc: 'Host events' },
  { id: 'organizer', label: 'Event Organizer', icon: Calendar, desc: 'Create & manage' },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('musician');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const update = (key: string, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    setErrors(p => ({ ...p, [key]: '' }));
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handleNext = () => {
    if (step === 1) { setStep(2); return; }
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    handleSubmit();
  };

  const handleSubmit = async () => {
    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      toast.success('Account created! Welcome to ChordsAndCoffee 🎵');
      navigate('/dashboard');
    } else {
      setErrors({ form: result.error || 'Registration failed.' });
    }
  };

  const strength = (p: string) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    return s;
  };
  const pw = strength(form.password);
  const pwLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const pwColors = ['', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(220,27%,10%)] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-coffee rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-sm">
          <Link
            to="/"
            className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-8 shadow-warm-lg hover:scale-105 transition-transform"
          >
            <Coffee className="w-10 h-10 text-amber-200" />
          </Link>
          <h2 className="font-display font-bold text-3xl text-white mb-4">Join 50,000+<br />Music Creators</h2>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Start your creative journey today — connect with artists, venues, and fans who love music as much as you do.
          </p>
          {['Free account, no credit card', 'Discover local events instantly', 'AI music tools included', 'Connect with artists worldwide'].map(b => (
            <div key={b} className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-sm text-white/70 text-left">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden group">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-amber-200" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ChordsAndCoffee</span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${step >= s ? 'bg-coffee text-white' : 'bg-muted text-muted-foreground'}`}>{s}</div>
                {s < 2 && <div className={`h-0.5 w-8 rounded ${step > s ? 'bg-coffee' : 'bg-muted'}`} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-muted-foreground">Step {step} of 2</span>
          </div>

          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="font-display font-bold text-3xl text-foreground mb-2">I am a...</h1>
                <p className="text-muted-foreground">Choose your role to personalize your experience.</p>
              </div>
              <div className="space-y-3 mb-8">
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex items-center gap-4 w-full p-4 rounded-xl border transition-all text-left ${selectedRole === r.id ? 'border-coffee bg-coffee/5 shadow-warm' : 'border-border bg-card hover:border-coffee/40'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRole === r.id ? 'bg-coffee text-white' : 'bg-muted text-muted-foreground'}`}>
                      <r.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-semibold text-sm ${selectedRole === r.id ? 'text-coffee' : 'text-foreground'}`}>{r.label}</span>
                      <span className="text-xs text-muted-foreground block">{r.desc}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedRole === r.id ? 'border-coffee bg-coffee' : 'border-border'}`}>
                      {selectedRole === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <h1 className="font-display font-bold text-3xl text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">Already have one? <Link to="/login" className="text-coffee font-semibold hover:underline">Sign in</Link></p>
              </div>

              {errors.form && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm mb-5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.form}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.name ? 'border-destructive' : 'border-border'}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.email ? 'border-destructive' : 'border-border'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.password ? 'border-destructive' : 'border-border'}`}
                      placeholder="Min. 6 characters"
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded ${i < pw ? pwColors[pw] : 'bg-muted'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Strength: {pwLabels[pw]}</p>
                    </div>
                  )}
                  {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={e => update('confirm', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.confirm ? 'border-destructive' : 'border-border'}`}
                    placeholder="Repeat your password"
                  />
                  {errors.confirm && <p className="text-destructive text-xs mt-1">{errors.confirm}</p>}
                </div>
              </div>
            </>
          )}

          <div className="mt-6 flex gap-3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="px-5 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 py-3.5 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>{step === 1 ? 'Continue' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-5">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-coffee hover:underline">Terms</Link> and{' '}
            <Link to="/privacy-policy" className="text-coffee hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
