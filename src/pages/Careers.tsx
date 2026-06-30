import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Coffee, Heart, Zap, Send } from 'lucide-react';
import { toast } from 'sonner';

const jobs = [
  { id: 'fe-eng', title: 'Senior Frontend Engineer (React/TS)', dept: 'Engineering', type: 'Full-time / Remote', pay: '$110K - $140K', loc: 'San Francisco, CA (or Remote)' },
  { id: 'comm-lead', title: 'Community Growth Manager', dept: 'Operations', type: 'Full-time / Hybrid', pay: '$70K - $90K', loc: 'Austin, TX' },
  { id: 'mktg-coord', title: 'Digital Marketing & Content Lead', dept: 'Marketing', type: 'Full-time / Remote', pay: '$80K - $100K', loc: 'Remote' },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(jobs[0].title);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please enter your name and email address.');
      return;
    }
    toast.success(`Application for ${selectedJob} submitted successfully! We'll be in touch.`);
    setName('');
    setEmail('');
    setNote('');
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 bg-[hsl(220,27%,10%)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-coffee rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 bg-gold/15 text-gold text-xs font-semibold rounded-full border border-gold/20 mb-4 uppercase tracking-wider">Join our team</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Help Us Build Where <span className="text-gold">Music Meets Coffee</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-xl mx-auto">
            We are a group of developers, designers, and coffee enthusiasts building a global stage for local music creators.
          </p>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-12">Our Perks & Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Coffee, title: 'Coffee & Café Allowance', desc: 'A monthly stipend to spend at any partner café. Work remote, enjoy great coffee on us.' },
              { icon: Heart, title: 'Acoustic Stipend', desc: 'We support local artists! Get $500/year to spend on concert tickets, instruments, or lessons.' },
              { icon: Zap, title: 'Accrued Paid Leaves', desc: 'Unlimited paid time off with a mandatory 3-week annual minimum to ensure everyone rests.' },
            ].map(perk => (
              <div key={perk.title} className="bg-card border border-border p-6 rounded-2xl hover:shadow-warm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-coffee/10 flex items-center justify-center mb-4">
                  <perk.icon className="w-5 h-5 text-coffee" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{perk.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions & Apply */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Open Positions List */}
            <div>
              <h2 className="font-display font-bold text-3xl text-foreground mb-8">Open Roles</h2>
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="p-5 bg-card border border-border rounded-2xl shadow-sm hover:border-coffee/50 transition-all flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground text-base mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.dept}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.loc}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold"><DollarSign className="w-3.5 h-3.5" />{job.pay}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJob(job.title);
                        toast.success(`Selected position: ${job.title}. Fill out the application details below!`);
                        document.getElementById('apply-form-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90 self-start transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="apply-form-section" className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">Submit Your Application</h2>
              <p className="text-xs text-muted-foreground mb-6">Select a job post, enter details, and send your interest sheet. We review all applications within 5 working days.</p>
              
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Applying For</label>
                  <select
                    value={selectedJob}
                    onChange={e => setSelectedJob(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  >
                    {jobs.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Cover Note / GitHub / Portfolio links</label>
                  <textarea
                    rows={4}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Why do you want to join ChordsAndCoffee?"
                    className="w-full px-3 py-2 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-coffee text-white font-semibold rounded-xl text-xs hover:opacity-90 flex items-center justify-center gap-2 shadow-warm"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Application
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
