import React from 'react';
import { X, Check } from 'lucide-react';

export const SizeGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const sizeChart = [
    { uk: 'UK 6', us: 'US 7', eu: 'EU 40', cm: '25.0 cm' },
    { uk: 'UK 7', us: 'US 8', eu: 'EU 41', cm: '25.8 cm' },
    { uk: 'UK 8', us: 'US 9', eu: 'EU 42.5', cm: '26.7 cm' },
    { uk: 'UK 9', us: 'US 10', eu: 'EU 44', cm: '27.5 cm' },
    { uk: 'UK 10', us: 'US 11', eu: 'EU 45', cm: '28.3 cm' },
    { uk: 'UK 11', us: 'US 12', eu: 'EU 46', cm: '29.2 cm' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#13151E] border border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div>
          <h2 className="text-base font-bold text-white">Footwear Sizing & Metric Guide</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            AuraFit shoes fit true to standard athletic sizing.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0E1017] text-zinc-400 font-semibold border-b border-zinc-800">
              <tr>
                <th className="p-2.5">UK / India</th>
                <th className="p-2.5">US</th>
                <th className="p-2.5">EU</th>
                <th className="p-2.5">Length (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200 font-mono">
              {sizeChart.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/40">
                  <td className="p-2.5 font-bold text-white">{row.uk}</td>
                  <td className="p-2.5">{row.us}</td>
                  <td className="p-2.5">{row.eu}</td>
                  <td className="p-2.5 text-zinc-400">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-700 text-xs text-zinc-200 space-y-1">
          <div className="font-semibold flex items-center gap-1 text-white">
            <Check className="h-3.5 w-3.5 text-zinc-300" />
            100% Free Doorstep Size Exchange
          </div>
          <p className="text-[11px] text-zinc-400">
            If the fit isn't 100% perfect, our courier picks it up and exchanges the size for free within 48 hours!
          </p>
        </div>
      </div>
    </div>
  );
};
