import React, { useRef, useEffect, useState } from 'react';

interface NodeProps {
  id: string;
  index: number;
  val: string;
}

export const Node: React.FC<NodeProps> = ({ id, index, val }) => {
  return (
    <div id={id} className="w-20 h-24 flex flex-col items-center justify-between bg-white rounded-lg shadow-md p-2">
      <span className="text-sm font-semibold">{index}</span>
      <div className="w-full h-16 flex items-center justify-center bg-gray-100 rounded-md">
        <span className="text-lg font-bold">{val}</span>
      </div>
    </div>
  );
};

interface LineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const Line: React.FC<LineProps> = ({ start, end }) => {
  const lineLength = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

  return (
    <div
      className="absolute bg-gray-400"
      style={{
        width: `${lineLength}px`,
        height: '2px',
        left: `${start.x}px`,
        top: `${start.y}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
      }}
    />
  );
};

interface NodeData {
  id: string;
  index: number;
  val: string;
}

export const NodeContainer: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 'node1', index: 1, val: 'A' },
    { id: 'node2', index: 2, val: 'B' },
    { id: 'node3', index: 3, val: 'C' },
  ]);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNodePositions = () => {
      const newPositions: { [key: string]: { x: number; y: number } } = {};
      nodes.forEach((node) => {
        const element = document.getElementById(node.id);
        if (element && containerRef.current) {
          const rect = element.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          newPositions[node.id] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        }
      });
      setNodePositions(newPositions);
    };

    updateNodePositions();
    window.addEventListener('resize', updateNodePositions);
    return () => window.removeEventListener('resize', updateNodePositions);
  }, [nodes]);

  return (
    <div ref={containerRef} className="relative w-full h-96 bg-gray-50 p-4">
      {nodes.map((node) => (
        <div key={node.id} className="absolute" style={{ left: `${node.index * 120}px`, top: '50%', transform: 'translateY(-50%)' }}>
          <Node {...node} />
        </div>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`line-${node.id}-${nodes[index + 1].id}`}
          start={nodePositions[node.id] || { x: 0, y: 0 }}
          end={nodePositions[nodes[index + 1].id] || { x: 0, y: 0 }}
        />
      ))}
    </div>
  );
};
