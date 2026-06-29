import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollRestoration() {
  const { pathname, key } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, key]);
  return null;
}

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-coffee text-white shadow-warm-lg flex items-center justify-center transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
