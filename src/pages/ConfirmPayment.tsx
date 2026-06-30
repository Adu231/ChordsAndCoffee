import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Coffee, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ConfirmPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve tipping state parameters from route navigate state (fallback if direct page access)
  const tipInfo = location.state as { artist: string; amount: number } | null;
  const artist = tipInfo?.artist || 'Alex Rivera';
  const amount = tipInfo?.amount || 10;
  
  const processingFee = parseFloat((amount * 0.05).toFixed(2));
  const total = parseFloat((amount + processingFee).toFixed(2));

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expiry || !cvc) {
      toast.error('Please fill in all credit card details.');
      return;
    }
    setLoading(true);
    // Simulate payment gateway response delay
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    toast.success(`Payment of $${total.toFixed(2)} processed successfully! Direct tip sent to ${artist}.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card border border-border rounded-2xl shadow-warm overflow-hidden grid md:grid-cols-5">
        
        {/* Left side: Summary Panel */}
        <div className="md:col-span-2 bg-[hsl(220,27%,10%)] text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gold rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-coffee rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 space-y-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider mb-2">Secure Payout</span>
              <h2 className="font-display font-bold text-2xl">Confirm Payment</h2>
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex justify-between text-xs text-white/60">
                <span>Direct Tip to {artist}</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Processing Fee (5%)</span>
                <span>${processingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-semibold">
                <span className="text-gold">Total Amount</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 border-t border-white/10 pt-6 text-[10px] text-white/40 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Payments are encrypted with industry standard 256-bit SSL. Your financial details never touch our servers directly.</span>
          </div>
        </div>

        {/* Right side: Payment form */}
        <div className="md:col-span-3 p-8">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-coffee" />
            <h3 className="font-display font-semibold text-lg text-foreground">Credit Card Details</h3>
          </div>
          
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Cardholder Name</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-coffee/20"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                  placeholder="4000 1234 5678 9010"
                  maxLength={19}
                  className="w-full pl-3.5 pr-10 py-2.5 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-coffee/20"
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Expiry Date</label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-coffee/20"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">CVC / CVV</label>
                <input
                  type="password"
                  required
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  placeholder="•••"
                  maxLength={3}
                  className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-coffee/20"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border mt-6 flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-coffee text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-warm disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> Pay ${total.toFixed(2)}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-5 py-3 border border-border text-muted-foreground hover:bg-muted text-xs font-semibold rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
