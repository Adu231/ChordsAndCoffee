import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Coffee, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-8 shadow-warm-lg animate-float">
          <Coffee className="w-10 h-10 text-amber-200" />
        </div>
        <div className="text-8xl font-display font-bold text-coffee/20 mb-2 select-none">404</div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Looks like this page wandered off stage. The URL you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-coffee text-white font-semibold rounded-xl hover:bg-[hsl(25,40%,26%)] shadow-warm transition-all hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/features" className="text-muted-foreground hover:text-coffee transition-colors">Features</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-coffee transition-colors">Pricing</Link>
          <Link to="/about" className="text-muted-foreground hover:text-coffee transition-colors">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-coffee transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
