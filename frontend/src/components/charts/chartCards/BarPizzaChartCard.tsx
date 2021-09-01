import { Card, Tooltip, Button } from 'antd'
import BarChart from '../BarChart'
import { FundProjectionScreenOutlined, PercentageOutlined } from '@ant-design/icons'
import React from 'react'
import PizzaChart from '../PizzaChart'
import { addPercentageDataInContType, ContType } from '../../../utils/calculations'

interface Props {
  title: String
  data: ContType[]
  axis?: string[]
  changeGraph?: boolean | null
  graphType?: GraphType
  showGraphType?: string
  style?: React.CSSProperties
  maxBarsPerPage?: number
  usePercentage?: boolean
  extra?: React.ReactNode
  fill?: (color: string) => string
}

type GraphType = 'PIZZACHART' | 'BARCHART'

export interface ContTypeWithPercentage {
  name: string,
  cont: number,
  percentage?: number,
}

const BarPizzaChartCard = (props: Props) => {

  const { fill, title, data, style, maxBarsPerPage,
    usePercentage, extra, changeGraph = true, graphType = 'BARCHART',
    axis = ["Tipo", "Quantidade"]
  } = props;

  const [dataUsePercentage, setDataUsePercentage] = React.useState(false)
  const [showGraphType, setshowGraphType] = React.useState<GraphType>(graphType)

  const showPercentageTooltip = (usePercentage !== undefined || null)

  const dataUsePercentageHandler = () => {
    if (dataUsePercentage) setDataUsePercentage(false)
    else setDataUsePercentage(true)
    if (changeGraph) {
      if (showGraphType === 'BARCHART') setshowGraphType('PIZZACHART')
      else setshowGraphType('BARCHART')
    }
  }

  const data2: ContTypeWithPercentage[] = data
  addPercentageDataInContType(data2)

  axis.push('Porcentagem')

  return <Card
    title={title}
    style={style}
    extra={<>
      {showPercentageTooltip && <>
        <Tooltip title={dataUsePercentage ? 'Mudar para valores absolutos' : 'Mudar para porcentagem'}>
          <Button
            shape={'circle'}
            size={'small'}
            icon={dataUsePercentage ? <FundProjectionScreenOutlined /> : <PercentageOutlined />}
            onClick={dataUsePercentageHandler}
          />
        </Tooltip>
        {' '}{extra}</>}
    </>}
  >
    {
      showGraphType === 'PIZZACHART' ?
        <PizzaChart data={data} usePercentage={dataUsePercentage} externalFill={fill} /> :
        <BarChart
          data={data2}
          maxBarsPerPage={maxBarsPerPage}
          axis={axis}
          usePercentage={dataUsePercentage}
          externalFill={fill}
        />
    }

  </Card>
}

export default BarPizzaChartCard;