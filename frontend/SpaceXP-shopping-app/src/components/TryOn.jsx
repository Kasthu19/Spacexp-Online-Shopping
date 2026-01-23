import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';

export default function TryOn({ clothingImage }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  // Load BodyPix model
  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await bodyPix.load();
      setModel(loadedModel);
      console.log('BodyPix model loaded');
    };
    loadModel();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Cannot access camera. Please allow camera permissions.');
    }
  };

  // AR Overlay effect
  const applyAROverlay = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Segment person from background
    const segmentation = await model.segmentPerson(video, {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    });

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Create mask from segmentation
    const mask = bodyPix.toMask(segmentation);
    ctx.putImageData(mask, 0, 0);

    // Apply clothing overlay
    if (clothingImage) {
      const img = new Image();
      img.src = clothingImage;
      img.onload = () => {
        ctx.drawImage(img, 100, 150, 200, 200);
      };
    }
  };

  useEffect(() => {
    if (isCameraOn && model) {
      const interval = setInterval(applyAROverlay, 100);
      return () => clearInterval(interval);
    }
  }, [isCameraOn, model]);

  return (
    <div className="ar-tryon-container p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">AR Virtual Try-On</h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            className="border rounded"
            style={{ width: '320px', height: '240px' }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
            style={{ width: '320px', height: '240px' }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={startCamera}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isCameraOn}
          >
            {isCameraOn ? 'Camera Active' : 'Start Camera'}
          </button>
          
          <div className="text-sm text-gray-600">
            <p>🔹 Allow camera access when prompted</p>
            <p>🔹 Stand in front of camera</p>
            <p>🔹 See virtual clothing overlay</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold">Try These Items:</h4>
            <div className="flex gap-2 mt-2">
              <button className="border px-3 py-1 rounded text-sm">T-Shirt</button>
              <button className="border px-3 py-1 rounded text-sm">Jacket</button>
              <button className="border px-3 py-1 rounded text-sm">Dress</button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Note: AR try-on demo using TensorFlow BodyPix
      </p>
    </div>
  );
}