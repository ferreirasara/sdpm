import * as React from "react";
import Chart from "bizcharts/lib/components/Chart";
import Tooltip from "bizcharts/lib/components/Tooltip";
import Legend from "bizcharts/lib/components/Legend";
import Axis from "bizcharts/lib/components/Axis";
import Point from "bizcharts/lib/geometry/Point";
import Line from "bizcharts/lib/geometry/Line";

const width100: React.CSSProperties = {
  maxWidth: "100%",
}

export interface Props {
  axis: string[]
  data: { [key: string]: string | number }[]
  scale?: { [key: string]: any }
}

const LineChart = (props: Props) => {
  const { axis, data, scale } = props

  return <>
    <Chart style={width100} height={400} data={data} scale={scale} autoFit>
      <Legend itemHeight={60} />
      <Axis name={axis[0]} />
      <Axis name={axis[1]} />
      <Tooltip shared showCrosshairs showMarkers />
      <Line position={`${axis[0]}*${axis[1]}`} size={1} color="case" shape="smooth" />
      <Point
        type="point"
        position={`${axis[0]}*${axis[1]}`}
        size={4}
        color="case"
        shape={"circle"}
        style={{
          stroke: "#fff",
          lineWidth: 1
        }}
      />
    </Chart>
  </>
}

export default LineChart;