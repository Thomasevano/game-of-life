import React, { useEffect, useRef } from "react";
import { Cell, Configuration } from "../core/core.types";

type CanvasProps = {
  configuration: Configuration;
  previousGenerationRef: Configuration;
  dimensions: number;
  trame: number;
}

const Canvas = ({ configuration, previousGenerationRef, dimensions, trame }: CanvasProps) => {

  const canvasRef = useRef(null)

  // Dessin de la configuration (suppression de l'ancienne configuration au préalable)
  useEffect(() => {
    const canvas = canvasRef.current
    // @ts-ignore
    const context = canvas.getContext('2d')

    if (trame === 0) {
      context.clearRect(0, 0, dimensions, dimensions)
    }
    else {
      context.fillStyle = '#FFFFFF'
      previousGenerationRef.forEach((cell: Cell) => context.fillRect(cell[0], cell[1], 1, 1))
    }

    context.fillStyle = '#FF0000'
    configuration.forEach((cell: Cell) => context.fillRect(cell[0], cell[1], 1, 1))
  }, [configuration, previousGenerationRef, dimensions])

  return (
    <canvas ref={canvasRef} width={dimensions} height={dimensions} className="border-cyan-400 border-2 bg-amber-50" style={{ height: '700px', width: '700px' }}></canvas>
  );
}

export default Canvas;
