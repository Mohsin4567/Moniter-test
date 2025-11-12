import React from 'react';
import { Tool } from '../types';
import { TOOLS } from '../constants';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool, isSidebarOpen, setIsSidebarOpen }) => {
  const handleToolClick = (toolId: Tool) => {
    setActiveTool(toolId);
    if (window.innerWidth < 768) { // md breakpoint in tailwind
      setIsSidebarOpen(false);
    }
  };

  const navContent = (
    <nav className="mt-5 flex-1 px-2 space-y-1">
      {TOOLS.map((tool) => (
        <a
          key={tool.id}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleToolClick(tool.id);
          }}
          className={`
            ${activeTool === tool.id
              ? 'bg-purple-800 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }
            group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150
          `}
        >
          <span className="mr-3">{tool.icon}</span>
          {tool.name}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setIsSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-white">Frontend Dev Toolbox</h1>
            </div>
            {navContent}
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-white">Frontend Dev Toolbox</h1>
              </div>
              {navContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
