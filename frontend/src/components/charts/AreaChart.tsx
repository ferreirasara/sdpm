import * as React from 'react';
import Chart from 'bizcharts/lib/components/Chart';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Legend from 'bizcharts/lib/components/Legend';
import Axis from 'bizcharts/lib/components/Axis';
import Area from 'bizcharts/lib/geometry/Area';
import Line from 'bizcharts/lib/geometry/Line';

const width100: React.CSSProperties = {
  maxWidth: "100%",
}

export interface Props {
  axis: string[]
  data: { [key: string]: string | number }[]
  scale?: { [key: string]: any }
}

const AreaChart = (props: Props) => {
  const { axis, data, scale } = props

  return <>
    <Chart style={width100} height={400} data={data} scale={scale} autoFit>
      <Legend itemHeight={60} />
      <Axis name={axis[0]} />
      <Axis name={axis[1]} />
      <Tooltip shared showCrosshairs showMarkers />
      <Area type="area" position={`${axis[0]}*${axis[1]}`} color="case" shape="smooth" />
      <Line type="line" position={`${axis[0]}*${axis[1]}`} size={1} color="case" shape="smooth" />
    </Chart>
  </>
}

export default AreaChart;