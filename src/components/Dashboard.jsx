import React, { useMemo } from 'react';
import Spline from '@splinetool/react-spline';
import { Activity, Zap, Server, Timer, ChevronRight, Play, Shield } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, hint }) => (
  <div className="flex items-center gap-4 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4">
    <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-cyan-300">
      <Icon size={18} />
    </div>
    <div>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {hint && <div className="text-[10px] text-zinc-500 mt-0.5">{hint}</div>}
    </div>
  </div>
);

const ActivityItem = ({ text }) => (
  <div className="text-xs text-zinc-300/90 font-mono">
    {text}
  </div>
);

export default function Dashboard() {
  const activity = useMemo(() => ([
    '[Batch #3] 22 tx batched | Proof verified | Anchored on Sepolia',
    '[Batch #4] 18 tx batched | Gas saved: 93% | Finality: 14.2s',
  ]), []);

  return (
    <div className="space-y-8">
      {/* Hero with Spline */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C0D13] to-[#0A0B0F]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
          <div className="p-8 md:p-10 flex flex-col justify-center gap-4 relative z-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
              ZeroSync Playground
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">Spin up, simulate, and deploy rollups with one SDK.</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 transition px-4 py-2 rounded-xl border border-cyan-400/20">
                <Play size={16} /> Start Simulation
              </button>
              <button className="inline-flex items-center gap-2 bg-fuchsia-500/20 text-fuchsia-200 hover:bg-fuchsia-500/30 transition px-4 py-2 rounded-xl border border-fuchsia-400/20">
                <Shield size={16} /> Deploy Anchor Contract
              </button>
              <button className="inline-flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 transition px-4 py-2 rounded-xl border border-white/10">
                View Proof Details
              </button>
            </div>
            <div className="text-[11px] text-zinc-500 pt-2">Powered by ZeroSync SDK — unified framework for rollup devs.</div>
          </div>
          <div className="relative">
            <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0F] via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard icon={Activity} label="Batches processed" value="24" />
        <MetricCard icon={Zap} label="Gas saved" value="92%" hint="vs L1 baseline" />
        <MetricCard icon={Timer} label="Avg finality" value="13.8s" />
        <MetricCard icon={Server} label="Sequencer" value="Active" />
        <MetricCard icon={ChevronRight} label="Base chain" value="Ethereum" />
      </div>

      {/* Pipeline + Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="text-sm text-zinc-400 mb-4">Pipeline</div>
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
            {['Pending Transactions', 'Batched', 'Proof Generated', 'Anchored on L1'].map((stage, i) => (
              <div key={stage} className="flex items-center gap-4">
                <div className="flex-1 min-w-[180px] px-4 py-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border border-white/10">
                  <div className="text-xs text-zinc-400">Stage {i+1}</div>
                  <div className="text-sm font-medium">{stage}</div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block w-10 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10">
          <div className="text-sm text-zinc-400 mb-3">Live activity</div>
          <div className="space-y-2">
            {activity.map((a, idx) => (
              <ActivityItem key={idx} text={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
