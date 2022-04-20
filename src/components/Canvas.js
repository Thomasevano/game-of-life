import React, {useEffect, useRef} from "react";

function Canvas(configuration, previousConfiguration = []) {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.fillStyle = '#FFFFFF'
        previousConfiguration.forEach(cell => context.fillRect(cell.x, cell.y, cell.x, cell.y))

        context.fillStyle = '#000000'
        configuration.forEach(cell => context.fillRect(cell.x, cell.y, cell.x, cell.y))
    }, [])

    return (
        <canvas ref={canvasRef} className="w-1/3" style={{height: '450px'}}></canvas>
    );
}

export default Canvas;