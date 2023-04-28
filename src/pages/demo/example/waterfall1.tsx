import { useEffect, useRef } from "react"

//四个一组颜色
let colormap = require('colormap')
let colors = colormap({
  colormap: 'jet',
  nshades: 1000,
  format: 'rba',
  alpha: 1
})

//模拟颜色，后期需要对应点的颜色
const insetImageData = (imageData: any) => {
  for (let i = 0; i < colors.length; i++) {
    let color = colors[i]
    imageData.data[imageData.data.length - i * 4 + 0] = color[0];
    imageData.data[imageData.data.length - i * 4 + 1] = color[1];
    imageData.data[imageData.data.length - i * 4 + 2] = color[2];
    imageData.data[imageData.data.length - i * 4 + 3] = 255;
  }
  return imageData
}

const Waterfall = () => {
  const canvasRef: any = useRef(undefined)

  useEffect(() => {
    const canvas = canvasRef.current;
    const waterFallCtx = canvas.getContext("2d");

    //宽度与高度
    let dd = waterFallCtx.createImageData(500, 1)
    let imageData = insetImageData(dd)

    //第一行数据
    waterFallCtx.putImageData(imageData, 0, 0)

    setInterval(() => {
      let dd = waterFallCtx.createImageData(500, 1)
      let imageData = insetImageData(dd)
      
      waterFallCtx.drawImage(waterFallCtx.canvas, 0, 0, 300, 300 - 1, 0, 1, 300, 300 - 1)
      waterFallCtx.putImageData(imageData, 0, 1)
    }, 1000)

    return () => {
    }
  }, [canvasRef])


  return (
    <canvas id="canvasRef" ref={canvasRef} ></canvas>
  )
}

export default Waterfall