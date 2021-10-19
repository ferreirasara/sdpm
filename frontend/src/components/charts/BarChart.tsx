import { useState } from 'react'
import Chart from 'bizcharts/lib/components/Chart';
import Legend from 'bizcharts/lib/components/Legend';
import Axis from 'bizcharts/lib/components/Axis';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Interval from 'bizcharts/lib/geometry/Interval';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { colorList } from '../../utils/colorList';

export interface Props {
  axis: string[]
  data: { name: string, cont: number, percentage?: number }[]
  scale?: { [key: string]: any }
  maxBarsPerPage?: number
  showLegend?: boolean
  usePercentage?: boolean
  externalFill?: (color: string) => string,
  suffix?: string
}

const BarChart = (props: Props) => {
  const windowWidth = window.innerWidth
  const { externalFill, axis, data, scale, showLegend = false, maxBarsPerPage = windowWidth < 1500 ? 10 : 20, usePercentage = false } = props

  const xAxisName = axis[0]
  const yAxisName = axis[1]

  //  calc percentageValues
  // data && addPercentageDataInCountType(data) 

  //change key names
  const newData = data && data.map(d => {
    return { [xAxisName]: d.name, [yAxisName]: d.cont, percentage: d.percentage }
  })

  // used for pagination
  const suffix = props.usePercentage ? '%' : (props.suffix ? ' ' + props.suffix : '');
  const [skip, setSkip] = useState(0)
  const hasPages = data && data.length > maxBarsPerPage

  const data2 = hasPages ? newData.slice(skip, skip + maxBarsPerPage) : newData

  const position = xAxisName + "*" + (usePercentage ? 'percentage' : yAxisName);

  return <>
    {hasPages &&
      //Pagination arrows
      <div style={{ fontSize: "1.8em", color: "blue", textAlign: "center" }}>
        {skip > 0 ?
          <CaretLeftOutlined onClick={() => setSkip(Math.max(skip - maxBarsPerPage, 0))} /> :
          <CaretLeftOutlined style={{ color: "gray" }} />
        }
        {skip + maxBarsPerPage < (data.length - 1) ?
          <CaretRightOutlined onClick={() => setSkip(Math.min(skip + maxBarsPerPage, data.length - 1))} /> :
          <CaretRightOutlined style={{ color: "gray" }} />
        }
      </div>
    }

    <Chart style={{ width: '90%' }} height={400} data={data2} scale={scale} autoFit interactions={['active-region']}>
      <Axis title name={xAxisName} />
      <Axis title name={yAxisName} />
      {showLegend ? <Legend /> : null}
      <Tooltip shared /* crosshairs={{ type: 'x' }} */ />
      <Interval
        position={position}
        color={externalFill ? [xAxisName, externalFill] : [xAxisName, colorList]}
        tooltip={props.usePercentage ? [
          `percentage`,
          (percentage) => {
            return {
              name: "Porcentagem",
              value: percentage + suffix
            };
          }
        ] : [
          `${yAxisName}`, // 'Quantidade' axis
          (count) => {
            return {
              name: "Quantidade",
              value: count + suffix
            };
          }
        ]}
      />
    </Chart>
  </>;
}

export default BarChart;