import * as React from 'react';
import Chart from 'bizcharts/lib/components/Chart';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Coordinate from 'bizcharts/lib/components/Coordinate';
import Interval from 'bizcharts/lib/geometry/Interval';
import { colorList } from '../../utils/colorList';
import { contTypesSum } from '../../utils/calculations';

export type PizzaChartProps = {
  data: { name: string, cont: number, percentage?: number }[],
  usePercentage?: boolean,
  externalFill?: (color: string) => string,
  suffix?: string,
}


const PizzaChart = (props: PizzaChartProps) => {
  let data = props.data && props.data.filter(cur => cur.cont > 0);

  const suffix = props.usePercentage ? '%' : (props.suffix ? ' ' + props.suffix : '');
  const externalFill = props.externalFill

  if (props?.data?.some(d => !d.percentage)) {
    // has some registry with no percentage saved case
    const sum = contTypesSum(props.data);
    data = data.map(ct => {
      ct.percentage = ct.cont / sum;
      return ct;
    })
  }

  return (
    <Chart style={{ width: '90%' }} height={400} data={data} autoFit interactions={['active-region', 'element-active', 'element-selected']}>
      <Coordinate type="theta" radius={0.8} />
      <Tooltip title='name' /* shared */ /* showTitle={false} */ />
      <Interval
        position="percentage"
        adjust="stack"
        color={externalFill ? ['name', externalFill] : ['name', colorList]}
        tooltip={props.usePercentage ? [
          "percentage",
          (percentage) => {
            return {
              name: "Porcentagem",
              value: percentage + suffix
            };
          }
        ] : [
            "cont",
            (count) => {
              return {
                name: "Quantidade",
                value: count + suffix
              };
            }
          ]}
        label={'name'}
      >
      </Interval>
    </Chart>
  ); // end of return JSX
} // end of pizzaChart function

export default PizzaChart;
