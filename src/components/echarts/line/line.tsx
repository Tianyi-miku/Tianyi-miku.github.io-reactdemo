import { useDidMount } from "@/hooks/period";
import * as echarts from "echarts";
import {useEffect, useMemo, useState} from "react";
import color from "../color";

const Line = (props: any) => {
  const [datakey,setdatakey] = useState<boolean>(false)
  const didMount = useDidMount();


//导出打印缓存
  //导出打印缓存
  const chartData = useMemo(()=> {
    props.dataKey=== true? setdatakey(props.dataKey): setdatakey(false)
    return props.dataList
  }, [props.dataList,props.dataKey]);

  useEffect(() => {
    if (didMount || datakey) {
      let lables:any[] = [],values:any[] = []
      chartData.forEach((item:any)=>{
        lables.push(item.name)
      })
      chartData.forEach((item:any)=>{
        values.push(item.value)
      })
      const chartDom = document.getElementById(
        props.keys || "line"
      ) as HTMLElement;

      //解决dom重复渲染
      let myChart = echarts.getInstanceByDom(chartDom);
      if (!myChart) // 如果不存在则创建
      {
        myChart = echarts.init(chartDom);
      }

      let series: any = [];
      values.forEach((item: any, index) => {
        series.push({
          name: item,
          type: "line",
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            color: `rgb(${color.line[index % color.lineLength]})`,
            shadowColor: "rgba(0, 0, 0, .3)",
          },
          itemStyle: {
            color: `rgb(${color.line[index % color.lineLength]})`,
            borderColor: "#fff",
            borderWidth: 1,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: `rgba(${color.line[index % color.lineLength]},0.3)`,
                },
                {
                  offset: 1,
                  color: `rgba(${color.line[index % color.lineLength]},0)`,
                },
              ],
              false
            ),
            shadowColor: `rgba(${color.line[index % color.lineLength]}, 0.9)`,
            shadowBlur: 20,
          },
          data: values,
        });
      });
      const option = {
        backgroundColor: "rgba(0, 43, 77, 0.9)",
        legend: {
          right: 10,
          top: 6,
          color: "#fff",
        },
        tooltip: {
          trigger: "item",
          confine: false,
          fontSize: 12,
          backgroundColor: "transparent",
          formatter: function (params: { seriesName: any; value: any }) {
            // return `<div class='tooltip'>${params.seriesName} : ${params.value}</div>`
            return `  <div class='tooltip'>${params?.value}</div>`;
          },
          extraCssText: "box-shadow: 0 0 20px #00C7FF inset;",
        },
        grid: {
          left: 40,
          right: 40,
          bottom: 40,
          top: 40,
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
            },
            splitArea: {
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            offset: 10,
            data: lables || [],
            inverse: true,
          },
        ],

        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          max: 100,
          // 坐标值标注
          axisLabel: {
            show: true,
            color: "rgba(40, 176, 254, 0.3)",
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#11366e",
            },
          },
        },
        series,
      };
      myChart.setOption(option);
    }
    return () => {};
  }, [ didMount,chartData,props,datakey]);

  return <div id={props.keys || "line"} style={{ height: "100%" }}></div>;
};

export default Line;
