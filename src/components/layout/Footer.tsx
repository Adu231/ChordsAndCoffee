import { Link } from 'react-router-dom';
import { Coffee, Music, Heart, Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Careers', href: '/careers' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
};

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(220,27%,10%)] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-warm">
                <Coffee className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-white">ChordsAndCoffee</span>
                <span className="text-xs font-body text-gold font-medium">Music & Café Community</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Where musicians, cafés, and music lovers come together to perform, collaborate, learn, and build lasting creative connections.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-3.5 h-3.5 text-gold/70" />
                <span>San Francisco, CA 94102</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-3.5 h-3.5 text-gold/70" />
                <span>hello@chordsandcoffee.com</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-sm text-white/80 mb-4 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-semibold text-white text-lg mb-1">Stay in tune with us</h4>
              <p className="text-sm text-white/50">Get the latest on events, artists, and updates.</p>
            </div>
            <form
              className="flex gap-2 w-full sm:w-auto"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold/60 focus:bg-white/15 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gold text-[hsl(220,27%,12%)] font-semibold text-sm rounded-lg hover:bg-[hsl(43,87%,55%)] transition-colors shadow-gold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ChordsAndCoffee. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for music lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
