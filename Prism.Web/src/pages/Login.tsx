import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { PrismLogo } from "@/components/PrismLogo";
import { useAuth } from "@/lib/AuthContext";

const LANDING_URL = import.meta.env.VITE_LANDING_URL || "/";
const isExternalLanding = LANDING_URL !== "/";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18A13.93 13.93 0 0 1 10.9 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.93 21.93 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export function Login() {
  const { user, isLoading, signInWithGoogle, signInAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/";

  useEffect(() => {
    if (!isLoading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, user, navigate, redirectTo]);

  if (!isLoading && user) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    navigate(redirectTo, { replace: true });
  };

  const handleGuestSignIn = async () => {
    await signInAsGuest();
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden flex items-center justify-center font-sans">
      
      {/* Light weight animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-orange-400 via-orange-100 to-orange-50"></div>
      
      {/* Animated Concentric circles */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] border-[1.5px] border-white rounded-full opacity-0" style={{ animation: 'ripple 12s linear infinite' }} />
        <div className="absolute w-[600px] h-[600px] border-[1.5px] border-white rounded-full opacity-0" style={{ animation: 'ripple 12s linear infinite 3s' }} />
        <div className="absolute w-[600px] h-[600px] border-[1.5px] border-white rounded-full opacity-0" style={{ animation: 'ripple 12s linear infinite 6s' }} />
        <div className="absolute w-[600px] h-[600px] border-[1.5px] border-white rounded-full opacity-0" style={{ animation: 'ripple 12s linear infinite 9s' }} />
      </div>


      {/* Top Left Logo */}
      <a 
        href={LANDING_URL}
        target={isExternalLanding ? "_blank" : undefined}
        rel={isExternalLanding ? "noreferrer" : undefined}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2.5 z-20 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-slate-900 rounded-lg">
          <PrismLogo className="w-5 h-5" />
        </div>
        <span className="font-bold text-slate-900 text-lg tracking-tight">Prism</span>
      </a>

      {/* Center Card */}
      <div className="relative z-10 w-full max-w-[440px] mx-4 rounded-[2rem] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden border border-white/60">
        
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-orange-50 to-white -z-10" />

        <div className="px-8 pt-10 pb-8 flex flex-col items-center">
          
          <div className="flex items-center justify-center w-[52px] h-[52px] bg-white rounded-[1.25rem] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
             <LogIn className="w-[22px] h-[22px] text-gray-800 ml-0.5" strokeWidth={2.5} />
          </div>

          <h1 className="text-[26px] font-bold text-gray-900 mb-[6px] text-center tracking-tight">
            Sign in to Prism
          </h1>
          
          <p className="text-[14px] text-gray-500 text-center mb-8 leading-relaxed max-w-[320px]">
            Make a new doc to bring your words, data, and teams together. For free
          </p>

          <div className="w-full space-y-[14px]">
            
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 h-[46px] bg-white rounded-xl border border-gray-200/80 shadow-sm hover:bg-gray-50 text-gray-800 text-[14px] font-medium transition-colors"
            >
              <GoogleLogo className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Separator */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 border-b-[2px] border-dotted border-gray-200"></div>
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Or</span>
              <div className="flex-1 border-b-[2px] border-dotted border-gray-200"></div>
            </div>

            <button 
              type="button"
              onClick={handleGuestSignIn}
              className="w-full h-[46px] bg-[#1c1c1e] hover:bg-black text-white rounded-xl text-[14px] font-medium transition-colors shadow-sm"
            >
              Guest Access
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
