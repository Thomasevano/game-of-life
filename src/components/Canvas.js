import React, {useEffect, useRef} from "react";
import * as gameOfLife from '../core/core';

function Canvas({configuration, previousConfiguration}) {

    const canvasRef = useRef("canvas")

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.fillStyle = '#FFFFFF'
        previousConfiguration.forEach(cell => context.fillRect(cell.x, cell.y, 1, 1))

        context.fillStyle = '#FF0000'
        configuration.forEach(cell => context.fillRect(cell.x, cell.y, 1, 1))
    }, [configuration, previousConfiguration])

    return (
        <canvas ref={canvasRef} width="100" height="100" className="border-amber-200 border-2 bg-amber-50" style={{height: '400px', width: '400px'}}></canvas>
    );
}

export default Canvas;