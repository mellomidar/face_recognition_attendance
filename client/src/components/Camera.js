import React, { useRef, useEffect } from "react";

export default function Webcam() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
          });
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <video className="cam-feed" ref={videoRef} />
  );
}