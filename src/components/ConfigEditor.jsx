import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Save, Upload, AlertTriangle } from 'lucide-react';

const defaultConfig = {
  rollup: 'mock-zk',
  baseChain: 'ethereum',
  rpcUrl: 'https://sepolia.infura.io/v3/<key>',
  proofEngine: 'mock',
  batchSize: 10,
};

export default function ConfigEditor() {
  const [text, setText] = useState(() => JSON.stringify(defaultConfig, null, 2));
  const [valid, setValid] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      JSON.parse(text);
      setValid(true);
      setError('');
    } catch (e) {
      setValid(false);
      setError(String(e.message));
    }
  }, [text]);

  const pretty = () => {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
    } catch {}
  };

  const exportJson = () => {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zerosync.config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const validityBadge = useMemo(() => (
    valid ? (
      <span className="inline-flex items-center gap-2 text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-3 py-1.5 rounded-full text-xs">
        <CheckCircle2 size={14} /> Valid JSON
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 text-amber-300 bg-amber-500/10 border border-amber-400/20 px-3 py-1.5 rounded-full text-xs">
        <AlertTriangle size={14} /> Invalid JSON
      </span>
    )
  ), [valid]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">Config Editor</div>
        {validityBadge}
        {!valid && (
          <span className="text-xs text-zinc-400">{error}</span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <button onClick={pretty} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10">Validate</button>
          <button onClick={exportJson} className="inline-flex items-center gap-2 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 px-3 py-1.5 rounded-lg border border-cyan-400/20">
            <Upload size={14} /> Export Config
          </button>
          <button disabled={!valid} className="inline-flex items-center gap-2 text-xs bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 px-3 py-1.5 rounded-lg border border-fuchsia-400/20 disabled:opacity-50">
            <Save size={14} /> Save Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-sm text-zinc-400 mb-2">Configs</div>
          <button className="w-full text-left text-sm px-3 py-2 rounded-lg bg-white/10 border border-white/10">zerosync.config.json</button>
          <button className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-white/10 border border-white/10/50">plugin-config.json</button>
        </div>
        <div className="lg:col-span-3 bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-2 bg-white/5 border-b border-white/10 text-xs text-zinc-400">JSON</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className="w-full h-[420px] p-4 font-mono text-sm bg-transparent outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
