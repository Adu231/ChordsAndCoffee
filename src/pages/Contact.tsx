import { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const contactMethods = [
  { icon: Mail, label: 'Email Us', value: 'hello@chordsandcoffee.com', desc: 'We reply within 24 hours.' },
  { icon: Phone, label: 'Call Us', value: '+1 (415) 555-0182', desc: 'Mon–Fri, 9AM–6PM PST' },
  { icon: MapPin, label: 'Visit Us', value: 'San Francisco, CA 94102', desc: 'By appointment only.' },
];

const topics = ['General Inquiry', 'Artist Support', 'Venue Partnership', 'Technical Issue', 'Billing & Payments', 'Press & Media', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General Inquiry', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: string, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    setErrors(p => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.length < 20) errs.message = 'Message must be at least 20 characters.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-16 bg-[hsl(220,27%,10%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-5xl text-white mb-4">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="text-white/65 text-lg">Have a question, partnership idea, or need support? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {contactMethods.map(m => (
              <div key={m.label} className="text-center p-6 bg-background rounded-2xl border border-border hover:shadow-warm transition-all">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 flex items-center justify-center mx-auto mb-3">
                  <m.icon className="w-5 h-5 text-coffee" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{m.label}</h4>
                <p className="text-coffee font-medium text-sm mb-1">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display font-bold text-3xl text-foreground mb-6">Send a Message</h2>

              {sent ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'General Inquiry', subject: '', message: '' }); }}
                    className="mt-5 px-5 py-2.5 bg-coffee text-white text-sm font-medium rounded-xl hover:bg-[hsl(25,40%,26%)] transition-colors shadow-warm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <input value={form.name} onChange={e => update('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.name ? 'border-destructive' : 'border-border'}`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.email ? 'border-destructive' : 'border-border'}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Topic</label>
                    <select value={form.topic} onChange={e => update('topic', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40"
                    >
                      {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                    <input value={form.subject} onChange={e => update('subject', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 ${errors.subject ? 'border-destructive' : 'border-border'}`}
                      placeholder="Brief subject line"
                    />
                    {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5}
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-coffee/40 resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? <p className="text-destructive text-xs">{errors.message}</p> : <span />}
                      <span className="text-xs text-muted-foreground">{form.message.length}/1000</span>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="flex items-center gap-2 px-6 py-3.5 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-coffee" /> Response Times</h4>
                <div className="space-y-2.5">
                  {[
                    { label: 'General inquiries', time: 'Within 24 hours' },
                    { label: 'Technical support', time: 'Within 4 hours' },
                    { label: 'Billing issues', time: 'Within 2 hours' },
                    { label: 'Partnership requests', time: 'Within 48 hours' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="text-coffee font-medium">{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-coffee" /> Quick Help</h4>
                <div className="space-y-2">
                  {['Help Center & Documentation', 'Video tutorials', 'Community forums', 'Status page'].map(link => (
                    <button key={link} className="block w-full text-left text-sm text-coffee hover:underline py-1">{link} →</button>
                  ))}
                </div>
              </div>

              <div className="bg-coffee/5 border border-coffee/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-coffee uppercase tracking-wider mb-2">Artist Partnerships</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Looking to partner your venue or brand with ChordsAndCoffee? Email us at <span className="text-coffee">partners@chordsandcoffee.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
