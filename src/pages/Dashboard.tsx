import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Coffee } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'fan':
          navigate('/music-lover', { replace: true });
          break;
        case 'musician':
          navigate('/musician', { replace: true });
          break;
        case 'teacher':
          navigate('/music-teacher', { replace: true });
          break;
        case 'venue':
          navigate('/venue-owner', { replace: true });
          break;
        case 'organizer':
          navigate('/event-organizer', { replace: true });
          break;
        case 'sponsor':
          navigate('/brand-sponsor', { replace: true });
          break;
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-coffee/10 flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-8 h-8 text-coffee" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access your dashboard.</p>
          <Link to="/login" className="px-6 py-3 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-coffee border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Redirecting to your workspace...</p>
      </div>
    </div>
  );
}
