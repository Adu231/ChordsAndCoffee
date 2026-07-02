import { useState } from 'react';
import {
  LayoutDashboard, Users, CheckCircle, AlertCircle, DollarSign, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: CheckCircle, label: 'Platform Settings', id: 'manage-platform' },
  { icon: Users, label: 'Verify Artists', id: 'verify-artists' },
  { icon: AlertCircle, label: 'Moderation', id: 'moderation' },
  { icon: DollarSign, label: 'Revenue Split', id: 'revenue-split' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // ----------------------------------------------------
  // ADMIN STATES
  // ----------------------------------------------------
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: 'Alex Rivera', genre: 'Acoustic / Indie Folk', joined: 'Jun 15, 2026', bio: 'Acoustic singer-songwriter focusing on raw storytelling.', socialLink: 'https://instagram.com/alexrivera' },
    { id: 2, name: 'Lana Vibe', genre: 'Indie Pop / Electronic', joined: 'Jun 22, 2026', bio: 'Synthpop and dream pop soundscapes creator.', socialLink: 'https://soundcloud.com/lanavibe' }
  ]);
  const [moderationReports, setModerationReports] = useState([
    { id: 1, author: 'troublemaker', reason: 'Spam Ad', message: 'Buy cheap streams and followers fast at scamlink.com!', contentId: 'post-9428' },
    { id: 2, author: 'angryfan', reason: 'Harassment', message: 'This artist is a complete fake and stole their song lyrics!', contentId: 'post-1053' }
  ]);

  // Platform configuration states
  const [platformFeePercentage, setPlatformFeePercentage] = useState('10');
  const [maintenanceMode, setMaintenanceMode] = useState('Disabled');
  const [allowRegistration, setAllowRegistration] = useState('Yes');
  const [globalRateLimit, setGlobalRateLimit] = useState('120');
  const [maxUploadLimit, setMaxUploadLimit] = useState('25');
  const [minWithdrawalThreshold, setMinWithdrawalThreshold] = useState('50');
  const [adminContactEmail, setAdminContactEmail] = useState('admin@chordsandcoffee.com');

  // Interactive verification reject modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingArtistId, setRejectingArtistId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('Insufficient social links/portfolio info.');

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout
      roleLabel="Admin"
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <div className="text-left animate-in fade-in duration-200">
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
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto text-left animate-in fade-in duration-200">
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
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4 text-left animate-in fade-in duration-200">
          <h3 className="font-semibold text-foreground mb-4">Artist Verification Requests</h3>
          <div className="space-y-3">
            {pendingVerifications.map(app => (
              <div key={app.id} className="p-4 border border-border rounded-xl bg-muted/15 text-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground text-sm"> {app.name}</p>
                    <p className="text-muted-foreground mt-0.5">Genre: {app.genre} • Applied: {app.joined}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPendingVerifications(pendingVerifications.filter(a => a.id !== app.id));
                        toast.success(`Artist "${app.name}" approved and verified successfully! checkmark added. 🛡️`);
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
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-4 text-left animate-in fade-in duration-200">
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
                        toast.success('Flagged content successfully removed from platform. 🗑️');
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
        <div className="bg-card rounded-2xl border border-border p-5 max-w-xl mx-auto space-y-6 text-left animate-in fade-in duration-200">
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

      {/* Artist Verification Reject Reasons Modal */}
      {showRejectModal && rejectingArtistId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-semibold text-foreground text-sm font-bold"> Decline Verification Request</h4>
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
                 Submitting this decline sends a notification email to the artist detailing the reject reason, allowing them to re-apply once resolved.
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
    </DashboardLayout>
  );
}
