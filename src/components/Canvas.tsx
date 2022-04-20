import React, { useEffect, useRef } from "react";
import { Cell, Configuration } from "../core/core.types";

type CanvasProps = {
    configuration: Configuration;
    previousConfiguration: Configuration;
    dimensions: number;
}

const Canvas = ({configuration, previousConfiguration, dimensions}: CanvasProps) => {

    const canvasRef = useRef(null)

    // Dessin de la configuration (suppression de l'ancienne configuration au préalable)
    useEffect(() => {
        const canvas = canvasRef.current
        // @ts-ignore
        const context = canvas.getContext('2d')

        context.fillStyle = '#FFFFFF'
        previousConfiguration.forEach((cell: Cell) => context.fillRect(cell.x, cell.y, 1, 1))

        context.fillStyle = '#FF0000'
        configuration.forEach((cell: Cell) => context.fillRect(cell.x, cell.y, 1, 1))
    }, [configuration, previousConfiguration, dimensions])

    return (
        <canvas ref={canvasRef} width={dimensions} height={dimensions} className="border-cyan-400 border-2 bg-amber-50" style={{height: '500px', width: '500px'}}></canvas>
    );
}

export default Canvas;