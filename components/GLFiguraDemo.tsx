import React, { useEffect, useRef } from 'react'
import gl from 'gl'
import figura from 'figura'

const GLFiguraDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const width = 300
      const height = 300
      const glContext = gl(width, height)
      
      if (glContext) {
        const f = figura(glContext)

        f.background(0.9, 0.9, 0.9, 1)
        f.fill(1, 0, 0, 1)
        f.rect(100, 100, 100, 100)

        f.fill(0, 1, 0, 1)
        f.circle(150, 150, 50)

        f.stroke(0, 0, 1, 1)
        f.line(0, 0, 300, 300)

        f.render()

        // Copy the gl context to the canvas
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          const imageData = ctx.createImageData(width, height)
          glContext.readPixels(0, 0, width, height, glContext.RGBA, glContext.UNSIGNED_BYTE, imageData.data)
          ctx.putImageData(imageData, 0, 0)
        }
      }
    }
  }, [])

  return <canvas ref={canvasRef} width={300} height={300} />
}

export default GLFiguraDemo

