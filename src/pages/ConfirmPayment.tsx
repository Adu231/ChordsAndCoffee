import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

/* --- helpers ------------------------------------------------------------ */

/** Format raw digits ? "4000 1234 5678 9010" */
const formatCardNumber = (raw: string) =>
  raw
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

/** Format raw input ? "MM/YY", auto-inserts slash */
const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2);
};

/** Validate expiry: month 01-12, card must not be expired */
const validateExpiry = (value: string): string => {
  if (!/^\d{2}\/\d{2}$/.test(value)) return 'Enter date as MM/YY';
  const [mmStr, yyStr] = value.split('/');
  const month = parseInt(mmStr, 10);
  const year  = 2000 + parseInt(yyStr, 10);
  if (month < 1 || month > 12) return 'Month must be between 01 and 12';
  const now = new Date();
  // First day of the month AFTER expiry month — card is valid until end of expiry month
  const cardExpiry = new Date(year, month, 1);
  if (cardExpiry <= now) return 'This card has expired — check the date';
  return '';
};

/* --- component ----------------------------------------------------------- */

export default function ConfirmPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const tipInfo = location.state as { artist: string; amount: number } | null;
  const artist  = tipInfo?.artist || 'Alex Rivera';
  const amount  = tipInfo?.amount || 10;

  const processingFee = parseFloat((amount * 0.05).toFixed(2));
  const total         = parseFloat((amount + processingFee).toFixed(2));

  /* field values */
  const [cardName,   setCardName]   = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry,     setExpiry]     = useState('');
  const [cvc,        setCvc]        = useState('');
  const [loading,    setLoading]    = useState(false);

  /* inline error messages */
  const [nameError,   setNameError]   = useState('');
  const [numberError, setNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvcError,    setCvcError]    = useState('');

  /* -- field change handlers -- */

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z .'-]/g, '');
    const upper   = cleaned.toUpperCase();
    setCardName(upper);
    if (upper.trim().length > 0 && upper.trim().split(/\s+/).length < 2) {
      setNameError('Please enter your full name (first and last)');
    } else {
      setNameError('');
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    const digits = formatted.replace(/\s/g, '');
    if (digits.length > 0 && digits.length < 16) {
      setNumberError('Card number must be 16 digits');
    } else {
      setNumberError('');
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    if (formatted.length === 5) {
      setExpiryError(validateExpiry(formatted));
    } else {
      setExpiryError('');
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(digits);
    if (digits.length > 0 && digits.length < 3) {
      setCvcError('CVC must be exactly 3 digits');
    } else {
      setCvcError('');
    }
  };

  /* -- form submit -- */

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!cardName.trim() || cardName.trim().split(/\s+/).length < 2) {
      setNameError('Enter your full name (first and last) in UPPERCASE');
      valid = false;
    }

    const numDigits = cardNumber.replace(/\s/g, '');
    if (numDigits.length !== 16) {
      setNumberError('Card number must be exactly 16 digits');
      valid = false;
    }

    if (expiry.length < 5) {
      setExpiryError('Enter expiry date in MM/YY format');
      valid = false;
    } else {
      const err = validateExpiry(expiry);
      if (err) { setExpiryError(err); valid = false; }
    }

    if (cvc.length !== 3) {
      setCvcError('CVC must be exactly 3 digits');
      valid = false;
    }

    if (!valid) {
      toast.error('Please fix the highlighted errors before proceeding.');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    toast.success(`Payment of $${total.toFixed(2)} processed! Tip sent to ${artist}.`);
    navigate('/dashboard');
  };

  /* -- style helpers -- */
  const base = 'w-full px-3.5 py-2.5 border rounded-xl bg-card text-xs text-foreground focus:outline-none focus:ring-2';
  const err  = 'border-rose-500 focus:ring-rose-400/30';
  const ok   = 'border-border focus:ring-coffee/20';

  const Err = ({ msg }: { msg: string }) =>
    msg ? (
      <p className="mt-1.5 text-[10px] text-rose-500 flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-rose-500 text-white text-center text-[8px] leading-3 font-bold flex-shrink-0 inline-flex items-center justify-center">!</span>
        {msg}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-background pt-16 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card border border-border rounded-2xl shadow-warm overflow-hidden grid md:grid-cols-5">

        {/* Left: Summary Panel */}
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase tracking-wider mb-2">
                Secure Payout
              </span>
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
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Payments are encrypted with 256-bit SSL. Your financial details never touch our servers directly.</span>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="md:col-span-3 p-8">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-coffee" />
            <h3 className="font-display font-semibold text-lg text-foreground">Credit Card Details</h3>
          </div>

          <form onSubmit={handlePay} className="space-y-5" noValidate>

            {/* Cardholder Name */}
            <div>
              <label htmlFor="cardName" className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                Cardholder Name <span className="text-coffee normal-case font-normal">(auto UPPERCASE)</span>
              </label>
              <input
                id="cardName"
                type="text"
                value={cardName}
                onChange={handleNameChange}
                placeholder="JOHN DOE"
                autoComplete="cc-name"
                className={`${base} ${nameError ? err : ok} tracking-widest font-semibold`}
              />
              <Err msg={nameError} />
            </div>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Card Number</label>
              <div className="relative">
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={handleNumberChange}
                  placeholder="4000 1234 5678 9010"
                  maxLength={19}
                  autoComplete="cc-number"
                  className={`${base} ${numberError ? err : ok} pl-3.5 pr-10 tracking-widest`}
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Err msg={numberError} />
            </div>

            {/* Expiry + CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                  Expiry <span className="normal-case font-normal">(MM/YY)</span>
                </label>
                <input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  autoComplete="cc-exp"
                  className={`${base} ${expiryError ? err : ok} tracking-widest`}
                />
                <Err msg={expiryError} />
              </div>

              <div>
                <label htmlFor="cvc" className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">CVC / CVV</label>
                <input
                  id="cvc"
                  type="password"
                  inputMode="numeric"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder="&bull;&bull;&bull;"
                  maxLength={3}
                  autoComplete="cc-csc"
                  className={`${base} ${cvcError ? err : ok}`}
                />
                <Err msg={cvcError} />
              </div>
            </div>

            {/* Rules hint */}
            <p className="text-[10px] text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 border border-border leading-relaxed">
              ?? Name is auto-uppercased. Expiry month must be <strong>01–12</strong>. Expired cards are rejected. CVC is exactly 3 digits.
            </p>

            {/* Actions */}
            <div className="pt-2 border-t border-border flex flex-col sm:flex-row gap-2">
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
