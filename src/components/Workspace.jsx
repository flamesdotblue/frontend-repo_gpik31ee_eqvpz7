import React, { useMemo, useState } from 'react';
import { Plug, PlayCircle, History, ShieldCheck, FileText, Copy } from 'lucide-react';

const TabButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition ${active ? 'bg-white/10 border-white/20' : 'bg-white/5/0 border-white/10 hover:bg-white/10'}`}
  >
    <Icon size={16} /> <span className="text-sm">{label}</span>
  </button>
);

function PluginsTab() {
  const plugins = [
    { name: 'Polygon CDK', desc: 'Modular L2 stack for EVM chains', compat: 'EVM', version: '1.2.0' },
    { name: 'zkSync ZK Stack', desc: 'ZK rollup framework for hyper scalability', compat: 'EVM', version: '0.9.4' },
    { name: 'Optimism Orbit', desc: 'Optimistic rollups with shared sequencing', compat: 'EVM', version: '3.1.1' },
    { name: 'Scroll', desc: 'ZK rollup designed for native EVM', compat: 'EVM', version: '0.6.2' },
    { name: 'StarkNet (soon)', desc: 'ZK-STARK based L2', compat: 'Non-EVM', version: '—' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="text-lg font-semibold">ZeroSync Plugins</div>
        <button className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-400/20">Install Custom Plugin</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plugins.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-cyan-300"><Plug size={16} /></div>
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-zinc-400">{p.desc}</div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">v{p.version}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{p.compat}</span>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg py-2">Install</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulationTab() {
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const run = async () => {
    if (running) return;
    setRunning(true);
    const steps = [
      '✓ Deploying mock rollup contracts',
      '✓ Sequencer started',
      '✓ Batching 22 transactions',
      '✓ Proof generated',
      '✓ Proof anchored on L1 (Sepolia)'
    ];
    setLogs([]);
    for (const s of steps) {
      await new Promise(r => setTimeout(r, 700));
      setLogs(prev => [...prev, s]);
    }
    setRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3 text-sm text-zinc-400">Simulation Log</div>
        <div className="h-64 overflow-auto font-mono text-xs space-y-1">
          {logs.map((l, i) => (
            <div key={i} className="text-zinc-300">{l}</div>
          ))}
        </div>
        <button onClick={run} disabled={running} className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-400/20 disabled:opacity-50">
          <PlayCircle size={16} /> {running ? 'Running…' : 'Run Full Simulation'}
        </button>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-sm text-zinc-400 mb-3">Results</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-zinc-400 text-xs">Gas saved</div>
            <div className="text-lg font-semibold">92%</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-zinc-400 text-xs">Finality time</div>
            <div className="text-lg font-semibold">14.2s</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-zinc-400 text-xs">Proof latency</div>
            <div className="text-lg font-semibold">3.8s</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-zinc-400 text-xs">Warnings</div>
            <div className="text-lg font-semibold">None</div>
          </div>
        </div>
        <button className="mt-4 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-3 py-2">View Summary Report</button>
      </div>
    </div>
  );
}

function HistoryTab() {
  const rows = [
    { id: 12, tx: 18, gas: '92%', finality: '13.4s', status: 'Verified', date: 'Oct 27' },
    { id: 13, tx: 22, gas: '93%', finality: '14.2s', status: 'Verified', date: 'Oct 27' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs text-zinc-400">Batches processed</div>
          <div className="text-2xl font-semibold">24</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs text-zinc-400">Avg proof time</div>
          <div className="text-2xl font-semibold">3.9s</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs text-zinc-400">Gas vs L1 baseline</div>
          <div className="text-2xl font-semibold">-92%</div>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <div className="bg-white/5 px-4 py-2 text-xs text-zinc-400">Past simulation runs</div>
        <div className="divide-y divide-white/5">
          <div className="grid grid-cols-6 text-xs text-zinc-400 px-4 py-2">
            <div>Batch</div><div>Tx Count</div><div>Gas Saved</div><div>Finality</div><div>Proof Status</div><div>Date</div>
          </div>
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-6 px-4 py-2 text-sm">
              <div>{r.id}</div><div>{r.tx}</div><div>{r.gas}</div><div>{r.finality}</div><div>✅ {r.status}</div><div>{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProofTab() {
  const proof = {
    batchId: 4,
    proofHash: '0xabc123...',
    publicInputs: ['0x01', '0x02', '0x03'],
    verificationStatus: 'verified',
  };
  const copy = () => navigator.clipboard.writeText(JSON.stringify(proof, null, 2));
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'proof.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl bg-black/40 border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between bg-white/5 px-4 py-2 text-xs text-zinc-400">
        <span>Proof JSON</span>
        <div className="flex items-center gap-2">
          <button onClick={copy} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/10"><Copy size={12} /> Copy</button>
          <button onClick={exportJson} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/10">Export</button>
        </div>
      </div>
      <pre className="p-4 font-mono text-xs overflow-auto">{JSON.stringify(proof, null, 2)}</pre>
    </div>
  );
}

function DocsTab() {
  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">Docs / Tutorials</div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm leading-6">
        <details open>
          <summary className="cursor-pointer text-cyan-300">Getting Started with ZeroSync CLI</summary>
          <pre className="mt-2 bg-black/40 border border-white/10 p-3 rounded-lg text-xs font-mono">$ npx zerosync init myrollup{`\n`}$ npx zerosync dev{`\n`}$ npx zerosync simulate</pre>
        </details>
        <details className="mt-3">
          <summary className="cursor-pointer text-cyan-300">How ProofEngine Works</summary>
          <p className="mt-2 text-zinc-300">ProofEngine batches transactions, generates proofs using your selected backend, and anchors on L1 with configurable cadence.</p>
        </details>
        <details className="mt-3">
          <summary className="cursor-pointer text-cyan-300">Adding Plugins</summary>
          <p className="mt-2 text-zinc-300">Install ecosystem plugins to bootstrap your rollup with pre-built components and reference configs.</p>
        </details>
      </div>
    </div>
  );
}

export default function Workspace() {
  const [tab, setTab] = useState('plugins');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TabButton icon={Plug} label="Plugins" active={tab === 'plugins'} onClick={() => setTab('plugins')} />
        <TabButton icon={PlayCircle} label="Simulation & Audit" active={tab === 'sim'} onClick={() => setTab('sim')} />
        <TabButton icon={History} label="History" active={tab === 'history'} onClick={() => setTab('history')} />
        <TabButton icon={ShieldCheck} label="Proof Viewer" active={tab === 'proof'} onClick={() => setTab('proof')} />
        <TabButton icon={FileText} label="Docs" active={tab === 'docs'} onClick={() => setTab('docs')} />
      </div>

      {tab === 'plugins' && <PluginsTab />}
      {tab === 'sim' && <SimulationTab />}
      {tab === 'history' && <HistoryTab />}
      {tab === 'proof' && <ProofTab />}
      {tab === 'docs' && <DocsTab />}
    </div>
  );
}
