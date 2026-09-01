import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  User, 
  Lock, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Radio
} from 'lucide-react';
import { Operator } from '../types';
import { IMAGES } from '../mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOperator: Operator;
  onLogin: (operator: Operator) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentOperator,
  onLogin
}) => {
  const [badgeId, setBadgeId] = useState<string>('VG-OP-7492');
  const [password, setPassword] = useState<string>('••••••••••');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (badgeId === 'VG-OP-7492') {
      const op: Operator = {
        id: 'op-01',
        badgeId: 'VG-OP-7492',
        name: 'Sgt. Marcus Vance',
        role: 'Chief Security Officer',
        shift: 'Alpha Shift (06:00 - 18:00)',
        avatar: IMAGES.operatorAvatar,
        activeTime: '07h 12m',
        isLoggedIn: true
      };
      onLogin(op);
      onClose();
    } else if (badgeId === 'VG-OP-3310') {
      const op: Operator = {
        id: 'op-02',
        badgeId: 'VG-OP-3310',
        name: 'Officer Elena Rostova',
        role: 'Senior Surveillance Specialist',
        shift: 'Beta Shift (18:00 - 06:00)',
        avatar: IMAGES.operatorAvatar2,
        activeTime: '01h 05m',
        isLoggedIn: true
      };
      onLogin(op);
      onClose();
    } else {
      setError('Invalid Officer Badge ID or expired cryptographic security token.');
    }
  };

  const handleQuickDemo = (type: 'marcus' | 'elena') => {
    if (type === 'marcus') {
      setBadgeId('VG-OP-7492');
      setPassword('••••••••••');
      const op: Operator = {
        id: 'op-01',
        badgeId: 'VG-OP-7492',
        name: 'Sgt. Marcus Vance',
        role: 'Chief Security Officer',
        shift: 'Alpha Shift (06:00 - 18:00)',
        avatar: IMAGES.operatorAvatar,
        activeTime: '07h 12m',
        isLoggedIn: true
      };
      onLogin(op);
      onClose();
    } else {
      setBadgeId('VG-OP-3310');
      setPassword('••••••••••');
      const op: Operator = {
        id: 'op-02',
        badgeId: 'VG-OP-3310',
        name: 'Officer Elena Rostova',
        role: 'Senior Surveillance Specialist',
        shift: 'Beta Shift (18:00 - 06:00)',
        avatar: IMAGES.operatorAvatar2,
        activeTime: '01h 05m',
        isLoggedIn: true
      };
      onLogin(op);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#131b2e] border border-[#00d2ff]/50 shadow-[0_0_40px_rgba(0,210,255,0.2)] overflow-hidden font-mono text-xs animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 bg-[#171f33] border-b border-[#3c494e]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#26fedc]" />
            <h3 className="font-bold text-sm text-[#dae2fd]">OPERATOR AUTHENTICATION CONSOLE</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[#0b1326] text-[#859399] hover:text-[#dae2fd]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0b1326] border border-[#3c494e]/40">
            <img 
              src={currentOperator.avatar} 
              alt={currentOperator.name} 
              className="w-12 h-12 rounded-lg object-cover border border-[#00d2ff]/40" 
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[10px] text-[#859399]">ACTIVE CONSOLE USER:</span>
              <div className="text-sm font-bold text-[#dae2fd]">{currentOperator.name}</div>
              <div className="text-[11px] text-[#26fedc]">{currentOperator.badgeId} • {currentOperator.role}</div>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6] text-[11px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ffb4ab] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[#859399]">Officer Badge Identifier (e.g. VG-OP-7492)</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#859399]" />
              <input
                type="text"
                required
                value={badgeId}
                onChange={(e) => {
                  setBadgeId(e.target.value);
                  setError(null);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#859399]">Biometric Cryptographic Token / PIN</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#859399]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1326] border border-[#3c494e]/50 text-[#dae2fd] focus:outline-none focus:border-[#00d2ff]"
              />
            </div>
          </div>

          {/* Quick Demo Switchers */}
          <div className="pt-2 border-t border-[#3c494e]/30 space-y-2">
            <span className="text-[10px] text-[#859399]">QUICK SWITCH OPERATOR PROFILE:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('marcus')}
                className="py-1.5 px-2 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-[#26fedc] border border-[#00d2ff]/30 text-[11px] text-center"
              >
                Sgt. Marcus Vance (CSO)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('elena')}
                className="py-1.5 px-2 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-[#a5e7ff] border border-[#3c494e]/50 text-[11px] text-center"
              >
                Officer Elena (Beta Shift)
              </button>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#0b1326] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#26fedc] text-[#003543] font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
