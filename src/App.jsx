import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import ConfigEditor from './components/ConfigEditor.jsx';
import Workspace from './components/Workspace.jsx';

function App() {
  const [view, setView] = useState('dashboard');

  const renderView = () => {
    if (view === 'dashboard') return <Dashboard />;
    if (view === 'config') return <ConfigEditor />;
    if (view.startsWith('workspace')) return <Workspace />;
    return <Dashboard />;
  };

  return (
    <Layout activeView={view} onChangeView={setView}>
      {renderView()}
    </Layout>
  );
}

export default App;
