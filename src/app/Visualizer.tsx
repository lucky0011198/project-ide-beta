import React, { useState, useEffect } from "react";

const Visualizer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('/src/app/canvas.html');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        setHtmlContent(content);
      } catch (error) {
        console.error("Failed to fetch HTML content:", error);
        setHtmlContent("<h1>Error loading content</h1>");
      }
    };

    fetchHtmlContent();
  }, []);

  const handleIframeLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = event.currentTarget;
    if (iframe.contentWindow) {
      iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
    }
  };

  return (
    <div className="flex-1 mesh-bg">
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        title="Canvas Visualization"
        sandbox="allow-scripts"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default Visualizer;
