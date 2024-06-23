// src/ParallaxBackground.tsx
import React, { useEffect, useState } from 'react';
import kittyimage from './assets/images/gratisography-cyber-kitty.jpg';
import dogimage from './assets/images/gratisography-cyber-kitty.jpg'; // Example different image
import './App.css'; // Import the CSS file for styles

interface Piece {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}

const ParallaxBackground: React.FC = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      setPieces((prevPieces) =>
        prevPieces.map((piece) => {
          const distance = Math.hypot(clientX - (piece.originalX + 25), clientY - (piece.originalY + 25));
          if (distance < 100) {
            const angle = Math.atan2(clientY - (piece.originalY + 25), clientX - (piece.originalX + 25));
            const x = piece.originalX + Math.cos(angle) * (100 - distance) * 0.2;
            const y = piece.originalY + Math.sin(angle) * (100 - distance) * 0.2;
            return { ...piece, x, y };
          }
          return { ...piece, x: piece.originalX, y: piece.originalY };
        })
      );
    };

    const piecesArray: Piece[] = [];
    const pieceSize = 50;
    const imageSize = 500;
    for (let y = 0; y < imageSize; y += pieceSize) {
      for (let x = 0; x < imageSize; x += pieceSize) {
        piecesArray.push({
          x,
          y,
          originalX: x,
          originalY: y,
        });
      }
    }
    setPieces(piecesArray);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex bg-cover bg-center bg-black" style={{ backgroundImage: `url(${kittyimage})` }}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="grid grid-cols-[repeat(10,_50px)] h-[500px] pointer-events-none">
    {pieces.map((piece, index) => (
      <img
        key={index}
        className="absolute [background-size:500px_500px] ease-out duration-500"
        style={{
          backgroundImage: `url(${dogimage})`,
          backgroundPosition: `-${piece.originalX}px -${piece.originalY}px`,
          transform: `translate(${piece.x}px, ${piece.y}px)`,
          width: '49px', // 50px - 1px for spacing
          height: '49px', // 50px - 1px for spacing
          margin: '1px',
        }}
      ></img>
    ))}
  </div>
</div>

      
    </div>
  );
};

export default ParallaxBackground;
