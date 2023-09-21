import { useDidMount } from "@/hooks/period";
import * as echarts from "echarts";
import {useEffect, useMemo, useState} from "react";
import color from "../color";

const Column = (props: any) => {
  const [datakey,setdatakey] = useState<boolean>(false)
  const didMount = useDidMount();

  //导出打印缓存
  const chartData = useMemo(()=> {
    props.dataKey=== true? setdatakey(props.dataKey): setdatakey(false)
    return props.dataList
  }, [props.dataList,props.dataKey]);

  useEffect(() => {

  }, [props]);
  useEffect(() => {
    if (didMount || datakey) {
      let lables:any[] = [],values:any[] = [];
      chartData.forEach((item:any)=>{
        lables.push(item.name)
      })
      chartData.forEach((item:any)=>{
        values.push(item.value)
      })
      const chartDom = document.getElementById(
        props.keys || "column"
      ) as HTMLElement;
      //解决dom重复渲染
      let myChart = echarts.getInstanceByDom(chartDom);
      if (!myChart) // 如果不存在则创建
      {
        myChart = echarts.init(chartDom);
      }
      // const myChart = echarts.init(chartDom);

      let isAuto = false;
      if (lables.length > 5) {
        isAuto = true;
      }
      let width = (chartDom.clientWidth - 80) / values.length / 2;
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = isAuto
            ? [shape.x - width, shape.y - 4]
            : [shape.x - 20, shape.y - 4];
          const c2 = isAuto
            ? [xAxisPoint[0] - width, xAxisPoint[1] - 4]
            : [xAxisPoint[0] - 20, xAxisPoint[1] - 4];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          (ctx as CanvasRenderingContext2D | any)
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = isAuto
            ? [shape.x + width, shape.y - 4]
            : [shape.x + 20, shape.y - 4];
          const c3 = isAuto
            ? [xAxisPoint[0] + width, xAxisPoint[1] - 4]
            : [xAxisPoint[0] + 20, xAxisPoint[1] - 4];
          const c4 = [xAxisPoint[0], xAxisPoint[1]];
          (ctx as CanvasRenderingContext2D | any)
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y + 4];
          const c2 = isAuto
            ? [shape.x + width, shape.y - 4]
            : [shape.x + 20, shape.y - 4];
          const c3 = [shape.x, shape.y - 13];
          const c4 = isAuto
            ? [shape.x - width, shape.y - 4]
            : [shape.x - 20, shape.y - 4];
          (ctx as CanvasRenderingContext2D | any)
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);

      const option = {
        backgroundColor: "rgba(0, 43, 77, 0.9)",
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          // show: false,
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: lables,
          axisLine: {
            show: true,
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "rgba(40, 176, 254, 0.1)",
                },
                {
                  offset: 1,
                  color: "rgba(40, 176, 254, 0.1)",
                },
              ]),
            },
          },
          offset: 10,
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: "#FFF",
          },
        },
        yAxis: {
          type: "value",
          // 分格线
          splitLine: {
            show: true,
            lineStyle: {
              color: "#11366e",
            },
          },
        },
        series: [
          {
            data: values,
            type: "custom",
            renderItem: (params: any, api: any) => {
              const dataIndex = params.dataIndex;
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color:
                            color.bar[dataIndex % color.barLength].left.top,
                        },
                        {
                          offset: 1,
                          color:
                            color.bar[dataIndex % color.barLength].left.bottom,
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color:
                            color.bar[dataIndex % color.barLength].right.top, // 顶部
                        },
                        {
                          offset: 1,
                          color:
                            color.bar[dataIndex % color.barLength].right.bottom, // 底部
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: color.bar[dataIndex % color.barLength].top.top,
                        },
                        {
                          offset: 1,
                          color:
                            color.bar[dataIndex % color.barLength].top.bottom,
                        },
                      ]),
                    },
                  },
                ],
              };
            },
          },
        ],
      };
      myChart.setOption(option);
    }
    return () => {};
  }, [ didMount,chartData,props,datakey]);

  return <div id={props.keys || "column"} style={{ height: "100%" }}></div>;
};

export default Column;
