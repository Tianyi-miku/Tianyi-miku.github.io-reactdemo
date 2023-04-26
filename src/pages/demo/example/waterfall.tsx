import { useEffect, useRef } from "react"


const minDb = 0
const maxDb = 80
const squeeze = (data: number, outMin: any, outMax: number) => {
  if (data <= minDb) {
    return outMin
  } else if (data >= maxDb) {
    return outMax
  } else {
    return Math.round((data - minDb) / (maxDb - minDb) * outMax)
  }
}


let colormap = require('colormap')
let colormaps = colormap({
  colormap: 'jet',
  nshades: 150,
  format: 'rba',
  alpha: 1
})
console.log(colormaps);

const insetImageData = (imageData: any, data: any[]) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    const cindex = squeeze(data[i / 4], 0, 130)
    let color = colormaps[cindex]
    console.log(color);
    

    imageData.data[i + 0] = color[0]
    imageData.data[i + 1] = color[1]
    imageData.data[i + 2] = color[2]
    imageData.data[i + 3] = 255
  }
  return imageData
}

const Waterfall = () => {
  const canvasRef: any = useRef(undefined)
  const data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));


  useEffect(() => {
    const canvas = canvasRef.current;

    const waterFallCtx = canvas.getContext("2d");
    let ctx = canvas.getContext('2d')
    waterFallCtx.createImageData(data.length, 1)
    let imageData = waterFallCtx.createImageData(data.length, 1)
    imageData = insetImageData(imageData, data)

    waterFallCtx.putImageData(imageData, 0, 0)

    ctx.drawImage(waterFallCtx.canvas, 0, 0, 500, 1, 0, 0, 10, 10)

    let waterFallIndex = 0
    setInterval(() => {
      waterFallIndex++
      const data1 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));
      rowToImageData(data1)
    }, 1000);

    // 绘制单行图像
    const rowToImageData = (data: any[]) => {
      let canvasHeight = Math.floor(waterFallCtx.canvas.offsetHeight / 20);
      let imgOld = waterFallCtx.getImageData(0, 0, 500, canvasHeight * waterFallIndex + 1)
      let imageData = waterFallCtx.createImageData(1000, 1)

      imageData = insetImageData(imageData, data)

      for (let i = 0; i < canvasHeight; i++) {
        waterFallCtx.putImageData(imageData, 0, i)
      }
      waterFallCtx.putImageData(imgOld, 0, canvasHeight)
    }



  }, [canvasRef])


  return (
    <canvas id="canvasRef" ref={canvasRef}></canvas>
  )
}

export default Waterfall