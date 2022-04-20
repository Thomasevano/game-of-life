import React, {createRef, useEffect, useRef} from "react";
import {Cell, Configuration} from "../core/core.types";

// @ts-ignore
const Canvas = ({configuration, previousConfiguration}) => {

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
    }, [configuration, previousConfiguration])

    return (
        <canvas ref={canvasRef} width="150" height="150" className="border-cyan-400 border-2 bg-amber-50" style={{height: '400px', width: '400px'}}></canvas>
    );
}

export default Canvas;