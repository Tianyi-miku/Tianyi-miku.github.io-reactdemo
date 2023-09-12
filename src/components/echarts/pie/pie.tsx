import { useDidMount } from "@/hooks/period";
import * as echarts from "echarts";
import { useEffect } from "react";
import color from "../color";

type Props = {
  dataList: Array<any>;
  keys?: string; //key
  legendselet?: Function //选择方法，返回e
}

const Pie = (props: Props) => {
  const didMount = useDidMount();
  const chartData = props.dataList

  useEffect(() => {
    if (didMount) {
      const chartDom = document.getElementById(
        props.keys || "pie"
      ) as HTMLElement;

      //解决dom重复渲染
      let myChart = echarts.getInstanceByDom(chartDom);
      if (!myChart) // 如果不存在则创建
      {
        myChart = echarts.init(chartDom);
      }



      const option = {
        animation: false, // 取消动画
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 10,
          textStyle: {
            fontSize: 16,
            color: '#ffffff'
          },
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: chartData,
            center: ['45%', '45%'],
            label: {
              normal: {
                position: 'inner',
                show: false
              }
            },
          },
        ]
      };
      myChart.setOption(option);

      myChart.off('legendselectchanged')
      myChart.on('legendselectchanged', function (params: any) {
        myChart?.setOption({
          legend: { selected: { [params.name]: true } }
        })
        props.legendselet ? props.legendselet(params.name) : console.log(params.name);
      });

    }
    return () => { };
  }, [didMount, chartData, props]);

  return <div id={props.keys || "pie"} style={{ height: "100%" }}></div>;
};

export default Pie;
