import React, { useState, useRef, useCallback, useEffect } from 'react';

const TESTS = [
  { id: 'deadPixel', name: 'Dead Pixel Test', description: 'Cycle through solid colors to find dead or stuck pixels on your screen.' },
  { id: 'gradient', name: 'Gradient Test', description: 'Check for color banding issues with smooth color gradients.' },
  { id: 'contrast', name: 'Contrast Test', description: 'Evaluate your monitor\'s contrast with black and white patterns.' },
];

const PIXEL_TEST_COLORS = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'];

export const MonitorTest: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [currentPixelColorIndex, setCurrentPixelColorIndex] = useState(0);
  const testContainerRef = useRef<HTMLDivElement>(null);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(document.fullscreenElement !== null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  const toggleFullscreen = () => {
    if (!testContainerRef.current) return;
    if (!document.fullscreenElement) {
      testContainerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const startTest = (testId: string) => {
    setActiveTest(testId);
  };

  const stopTest = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setActiveTest(null);
    setCurrentPixelColorIndex(0);
  };

  const cyclePixelColor = () => {
    setCurrentPixelColorIndex((prevIndex) => (prevIndex + 1) % PIXEL_TEST_COLORS.length);
  };

  const renderTestSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TESTS.map(test => (
        <div key={test.id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">{test.name}</h3>
          <p className="text-gray-400 flex-grow mb-4">{test.description}</p>
          <button
            onClick={() => startTest(test.id)}
            className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Start Test
          </button>
        </div>
      ))}
    </div>
  );
  
  const renderActiveTest = () => {
    if (!activeTest) return null;

    let testContent;
    switch (activeTest) {
      case 'deadPixel':
        testContent = <div className="w-full h-full cursor-pointer" style={{ backgroundColor: PIXEL_TEST_COLORS[currentPixelColorIndex] }} onClick={cyclePixelColor} role="button" aria-label="Cycle to next color"></div>;
        break;
      case 'gradient':
        testContent = <div className="w-full h-full bg-gradient-to-r from-black to-white"></div>;
        break;
      case 'contrast':
        testContent = <div className="w-full h-full" style={{ backgroundImage: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)', backgroundSize: '20px 20px' }}></div>;
        break;
      default:
        testContent = null;
    }

    return (
      <div ref={testContainerRef} className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
        {testContent}
        <div className="absolute top-4 right-4 flex space-x-2 p-2 bg-black bg-opacity-50 rounded-lg">
          {activeTest === 'deadPixel' && (
             <button onClick={cyclePixelColor} title="Next Color" className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full" aria-label="Next Color">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          <button onClick={toggleFullscreen} title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} className="p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full" aria-label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
            {fullscreen ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 1v-4m0 0h-4m4 0l-5 5" /></svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m7 7v4m0 0h-4m4 0l-5-5m-7 7v-4m0 0H8m-4 0l5-5m7-7v4m0 0h4m-4 0l5 5" /></svg>
            }
          </button>
          <button onClick={stopTest} title="Exit Test" className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full" aria-label="Exit Test">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="absolute bottom-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg text-center">
            {activeTest === 'deadPixel' ? 'Click anywhere to cycle through colors. ' : ''} Press ESC to exit fullscreen.
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto">
      {!activeTest && (
        <>
            <h2 className="text-3xl font-bold mb-2 text-white">Monitor Testing Suite</h2>
            <p className="text-lg text-gray-400 mb-8">Select a test to begin diagnosing your monitor's performance and quality.</p>
        </>
      )}
      {activeTest ? renderActiveTest() : renderTestSelector()}
    </div>
  );
};