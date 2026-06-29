import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Music, Calendar, Users, Star, Edit2, Check, X,
  Instagram, Twitter, Youtube, Share2, Award, Play, Heart
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import MusicPlayer from '@/components/features/MusicPlayer';

const tabs = ['Overview', 'Music', 'Events', 'Community'];

const portfolio = [
  { title: 'Café Mornings EP', year: '2024', type: 'EP', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop' },
  { title: 'Unplugged Sessions', year: '2023', type: 'Album', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
  { title: 'Golden Hours Single', year: '2024', type: 'Single', cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=200&h=200&fit=crop' },
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [editData, setEditData] = useState({ bio: user?.bio || '', location: user?.location || '' });

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

  const handleSave = () => {
    updateProfile(editData);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Banner */}
      <div className="h-48 lg:h-64 bg-gradient-to-r from-[hsl(25,32%,25%)] to-[hsl(220,27%,18%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Profile link copied!'); }}
            className="flex items-center gap-2 px-4 py-2 glass text-white text-sm font-medium rounded-xl hover:bg-white/15 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share Profile
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-2xl object-cover border-4 border-background shadow-warm-lg" />
              {user.verified && (
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-sm">
                  <Award className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground">{user.name}</h1>
                {user.verified && <span className="px-2.5 py-0.5 bg-gold/15 text-gold text-xs font-semibold rounded-full border border-gold/30">Verified Artist</span>}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.location}</span>
                <span className="flex items-center gap-1"><Music className="w-3.5 h-3.5" />{user.genres.join(', ')}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.success('Following Alex Rivera!')}
                className="px-5 py-2.5 bg-coffee text-white text-sm font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all"
              >
                Follow
              </button>
              <button
                onClick={() => setEditing(true)}
                className="p-2.5 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 mb-6 p-5 bg-card rounded-2xl border border-border">
          <div className="text-center">
            <div className="font-display font-bold text-xl text-foreground">{user.followers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-xl text-foreground">{user.following}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-xl text-foreground">42.8K</div>
            <div className="text-xs text-muted-foreground">Total Streams</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-xl text-foreground">18</div>
            <div className="text-xs text-muted-foreground">Performances</div>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <a href="#" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Instagram className="w-4.5 h-4.5" /></a>
            <a href="#" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Twitter className="w-4.5 h-4.5" /></a>
            <a href="#" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Youtube className="w-4.5 h-4.5" /></a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-xl p-1 w-fit">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 pb-16">
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {activeTab === 'Overview' && (
              <>
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">About</h3>
                    {!editing && (
                      <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {editing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editData.bio}
                        onChange={e => setEditData(p => ({ ...p, bio: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-coffee/40"
                        placeholder="Tell your story..."
                      />
                      <input
                        value={editData.location}
                        onChange={e => setEditData(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coffee/40"
                        placeholder="Location"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-coffee text-white text-sm rounded-lg">
                          <Check className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-2 border border-border text-sm rounded-lg text-muted-foreground hover:bg-muted">
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
                  )}
                </div>

                {/* Genres & Instruments */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Genres & Instruments</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Genres</p>
                      <div className="flex flex-wrap gap-2">
                        {user.genres.map(g => <span key={g} className="px-3 py-1 bg-coffee/10 text-coffee text-xs font-medium rounded-full">{g}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Instruments</p>
                      <div className="flex flex-wrap gap-2">
                        {user.instruments.map(i => <span key={i} className="px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-full">{i}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Discography</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {portfolio.map(p => (
                      <div key={p.title} className="group cursor-pointer">
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                          <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.type} · {p.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <MusicPlayer mini />
            <div className="bg-card rounded-2xl border border-border p-5">
              <h4 className="font-semibold text-foreground mb-3">Next Performance</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 flex flex-col items-center justify-center">
                  <span className="text-xs text-coffee font-semibold">JUL</span>
                  <span className="text-xl font-display font-bold text-coffee leading-none">5</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Open Mic Night</p>
                  <p className="text-xs text-muted-foreground">The Grind Café · 8:00 PM</p>
                  <button
                    onClick={() => toast.success('RSVP confirmed!')}
                    className="mt-2 text-xs text-coffee font-medium hover:underline"
                  >
                    Get Tickets →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
