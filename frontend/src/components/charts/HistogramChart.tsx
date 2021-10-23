import React, { useMemo } from "react";
import Chart from "bizcharts/lib/components/Chart";
import Axis from "bizcharts/lib/components/Axis";
import Tooltip from "bizcharts/lib/components/Tooltip";
import Interval from "bizcharts/lib/geometry/Interval";
import "@antv/data-set/lib/api/statistics"
import "@antv/data-set/lib/transform/bin/histogram"
import { DataSet } from "@antv/data-set/lib/data-set";

export interface Props {
  data?: number[]
  binWidth: number
  title?: string[]
  fill?: string
}

const HistogramChart = (props: Props) => {
  let scale
  const { title, fill } = props
  if (title)
    scale = {
      value: {
        nice: false, min: 400,
        tickInterval: 50
      },
      count: { max: 14 },
      valor: {
        alias: title[0]
      },
      quantidade: {
        alias: title[1]
      }
    };
  else
    scale = {
      value: {
        nice: false, min: 400,
        tickInterval: 50
      },
      count: { max: 14 }
    };
  const { data = [], binWidth } = props
  //const offset = 50

  let dataView: any = useMemo(() => {
    const histData = data.map(cur => { return { valor: cur } })
    const ds = new DataSet()
    return ds.createView().source(histData).transform({
      type: "bin.histogram",
      field: "valor",
      binWidth,
      as: ["valor", "quantidade"]
    })
  }, [data, binWidth])

  return <>
    <Chart style={{ width: "90%" }} height={400} data={dataView} scale={scale} autoFit interactions={["active-region"]}>
      <Axis
        title={!!title}
        name="valor"
        label={{
          style: {
            textAlign: "center",
            fill: "#404040",
            fontSize: 12,
            rotate: 30,
            textBaseline: "top",
            fontWeight: "bold"
          },
          autoRotate: false
        }}
      />
      {title ? <Axis title name="quantidade" /> : <Axis name="quantidade" />}
      <Tooltip shared /* inPlot={false} position={"top"} */ />
      <Interval position="valor*quantidade" color={fill || "#7AC0A7"} />
    </Chart>
  </>
}

export default HistogramChart
