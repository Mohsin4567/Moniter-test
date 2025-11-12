import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ColorPaletteGenerator } from './components/ColorPaletteGenerator';
import { SvgShapeGenerator } from './components/SvgShapeGenerator';
import { ComponentScaffolder } from './components/ComponentScaffolder';
import { RegexGenerator } from './components/RegexGenerator';
import { MonitorTest } from './components/MonitorTest';
import { Tool } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.ColorPalette);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const renderActiveTool = () => {
    switch (activeTool) {
      case Tool.ColorPalette:
        return <ColorPaletteGenerator />;
      case Tool.SvgShape:
        return <SvgShapeGenerator />;
      case Tool.ComponentScaffolder:
        return <ComponentScaffolder />;
      case Tool.RegexGenerator:
        return <RegexGenerator />;
      case Tool.MonitorTest:
        return <MonitorTest />;
      default:
        return <ColorPaletteGenerator />;
    }
  };

  const currentTool = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 md:justify-end">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Open sidebar"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
           <div className="flex items-center space-x-3">
            {currentTool && (
              <>
                <span className="text-xl text-purple-400">{currentTool.icon}</span>
                <h1 className="text-xl font-semibold">{currentTool.name}</h1>
              </>
            )}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderActiveTool()}
        </div>
      </main>
    </div>
  );
};

export default App;
