import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const TRACKS = [
  { id: 1, title: 'Café Mornings', artist: 'Alex Rivera', genre: 'Acoustic', duration: 214, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop' },
  { id: 2, title: 'Golden Hours', artist: 'Marcus Chen', genre: 'Jazz Piano', duration: 183, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop' },
  { id: 3, title: 'Midnight Synth', artist: 'Lana Vibe', genre: 'Ambient Synth', duration: 267, cover: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=80&h=80&fit=crop' },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function MusicPlayer({ mini = false }: { mini?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = TRACKS[current];

  useEffect(() => {
    const handlePlayTrackEvent = (e: CustomEvent<{ artist: string }>) => {
      const idx = TRACKS.findIndex(t => t.artist.toLowerCase() === e.detail.artist.toLowerCase());
      if (idx !== -1) {
        setCurrent(idx);
        setPlaying(true);
        setProgress(0);
      }
    };
    window.addEventListener('play-track' as any, handlePlayTrackEvent);
    return () => {
      window.removeEventListener('play-track' as any, handlePlayTrackEvent);
    };
  }, []);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= track.duration) {
            next();
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, current]);

  const prev = () => { setCurrent(c => (c - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };
  const next = () => { setCurrent(c => (c + 1) % TRACKS.length); setProgress(0); };
  const toggleLike = (id: number) => setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);

  const pct = (progress / track.duration) * 100;

  if (mini) {
    return (
      <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border shadow-warm">
        <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{track.title}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
        <button onClick={() => setPlaying(p => !p)} className="w-8 h-8 rounded-full bg-coffee text-white flex items-center justify-center hover:bg-[hsl(25,40%,26%)] transition-colors">
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border shadow-warm-lg p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-coffee uppercase tracking-wider">
          <Music2 className="w-3.5 h-3.5" />
          Now Playing
        </div>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{track.genre}</span>
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          <img
            src={track.cover}
            alt={track.title}
            className={cn('w-24 h-24 rounded-2xl object-cover shadow-warm', playing && 'animate-float')}
          />
          {playing && (
            <div className="absolute inset-0 rounded-2xl animate-pulse-glow pointer-events-none" />
          )}
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground">{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div
          className="w-full h-1.5 bg-muted rounded-full cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setProgress(Math.round((x / rect.width) * track.duration));
          }}
        >
          <div
            className="h-full bg-coffee rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => toggleLike(track.id)}
          className={cn('p-1.5 rounded-lg transition-colors', liked.includes(track.id) ? 'text-red-500' : 'text-muted-foreground hover:text-foreground')}
        >
          <Heart className={cn('w-4 h-4', liked.includes(track.id) && 'fill-red-500')} />
        </button>
        <button onClick={prev} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-12 h-12 rounded-full bg-coffee text-white flex items-center justify-center hover:bg-[hsl(25,40%,26%)] transition-all hover:scale-105 shadow-warm"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <button onClick={next} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Track List */}
      <div className="mt-5 pt-4 border-t border-border space-y-2">
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setCurrent(i); setProgress(0); setPlaying(true); }}
            className={cn(
              'flex items-center gap-3 w-full px-2 py-2 rounded-lg transition-colors text-left',
              i === current ? 'bg-muted' : 'hover:bg-muted/50'
            )}
          >
            <img src={t.cover} alt={t.title} className="w-8 h-8 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className={cn('text-xs font-medium truncate', i === current ? 'text-coffee' : 'text-foreground')}>{t.title}</p>
              <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(t.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
