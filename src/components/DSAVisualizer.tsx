import React, { useState, useEffect, useCallback, useRef } from 'react';
import CodeEditor from '@/app/CodeEditor';
import Visualizer from '@/app/Visualizer';

const DSAVisualizer: React.FC = () => {
  const [editorWidth, setEditorWidth] = useState<number>(900);
  const resizableRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const MIN_WIDTH = 400;
  const MAX_WIDTH = 900;

  const handleResizeStart = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    startX.current = event.clientX;
    startWidth.current = editorWidth;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [editorWidth]);

  const handleResize = useCallback((event: MouseEvent) => {
    if (!isResizing.current) return;
    const diff = event.clientX - startX.current;
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth.current + diff));
    setEditorWidth(newWidth);
  }, []);

  const handleResizeEnd = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleResizeEnd);
  }, [handleResize]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const diff = event.key === 'ArrowRight' ? 10 : -10;
      setEditorWidth((prevWidth) => Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, prevWidth + diff)));
    }
  }, []);

  useEffect(() => {
    const resizeHandle = resizableRef.current?.querySelector('#resizeHandle');
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', handleResizeStart as any);
      resizeHandle.addEventListener('keydown', handleKeyDown as any);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener('mousedown', handleResizeStart as any);
        resizeHandle.removeEventListener('keydown', handleKeyDown as any);
      }
    };
  }, [handleResizeStart, handleKeyDown]);

  const handleRunCode = () => {
    // Implement run code functionality
    console.log('Running code...');
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-[calc(100vh-64px)] bg-mesh-pattern bg-cover bg-repeat">
      <div className="flex flex-row justify-center h-full w-full overflow-hidden">
        <div className="relative flex mr-auto h-full" ref={resizableRef}>
          <div
            className="bg-gray-200 h-full flex items-center justify-center select-none"
            style={{ width: `${editorWidth}px` }}
          >
            <div className="w-full max-w-4xl h-full relative ">
              <CodeEditor/>
              <button
                onClick={handleRunCode}
                className="absolute bottom-5 right-5 px-4 py-2 bg-blue-300 text-white font-bold rounded-md hover:bg-blue-700 text-sm"
              >
                Run Code
              </button>
            </div>
           <div
              id="resizeHandle"
              className="absolute top-0 right-0 w-1 h-full bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors"
              role="separator"
              aria-label="Resize panel"
              tabIndex={0}
            />
          </div>
        </div>
        <Visualizer/>
      </div>
    </div>
  );
};

export default DSAVisualizer;
