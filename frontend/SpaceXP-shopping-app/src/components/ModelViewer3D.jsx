import React from 'react';
import '@google/model-viewer'; // IMPORT THIS

export default function ModelViewer3D({ modelUrl }) {
  if (!modelUrl) {
    return (
      <div style={{ width: '400px', height: '400px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No 3D model available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '300px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <model-viewer
        src={modelUrl}
        alt="3D Product Model"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '100%' }}
      >
        <div slot="progress-bar" style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: '#666'
        }}>
          Loading 3D model...
        </div>
      </model-viewer>
    </div>
  );
}