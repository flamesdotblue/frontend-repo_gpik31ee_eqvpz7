import React from 'react';
import { Home, Settings, Rocket, Plug, History, FileText, ShieldCheck } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors duration-200 
      ${active ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function Layout({ activeView, onChangeView, children }) {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white overflow-hidden">
      {/* Subtle glow background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-30 bg-cyan-600/40" />
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full blur-3xl opacity-20 bg-fuchsia-700/40" />
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 min-h-screen border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-5 pt-6 pb-4">
            <div className="text-xs uppercase tracking-widest text-zinc-400 mb-1">ZeroSync</div>
            <div className="text-xl font-semibold">Playground</div>
          </div>
          <nav className="px-3 space-y-2">
            <NavButton icon={Home} label="Dashboard" active={activeView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
            <NavButton icon={Settings} label="Config Editor" active={activeView === 'config'} onClick={() => onChangeView('config')} />
            <NavButton icon={Plug} label="Workspace" active={activeView === 'workspace'} onClick={() => onChangeView('workspace')} />
            <div className="mt-4 border-t border-white/10" />
            <NavButton icon={History} label="History & Analytics" active={activeView === 'workspace#history'} onClick={() => onChangeView('workspace#history')} />
            <NavButton icon={ShieldCheck} label="Proof Viewer" active={activeView === 'workspace#proof'} onClick={() => onChangeView('workspace#proof')} />
            <NavButton icon={FileText} label="Docs & Tutorials" active={activeView === 'workspace#docs'} onClick={() => onChangeView('workspace#docs')} />
          </nav>
          <div className="mt-auto p-4 text-xs text-zinc-400">
            Powered by <span className="text-cyan-400">ZeroSync SDK</span>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {/* Top bar */}
          <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A0B0F]/70 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
              <Rocket className="text-cyan-400" size={18} />
              <div>
                <div className="text-sm text-zinc-400">ZeroSync Playground</div>
                <div className="text-xs text-zinc-500 -mt-1">The Hardhat for Rollups</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Sequencer: Active
                </span>
                <span className="text-xs text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full">Base Chain: Ethereum</span>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
