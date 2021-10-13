import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import highlightText from "../../../utils/highlightText";
import { SimulationExecution } from "../../../utils/types";

export interface DetailsTableProps {
  algorithm: string,
  simulationExecution?: SimulationExecution[]
}

export default function DetailsTable(props: DetailsTableProps) {
  const { algorithm, simulationExecution } = props
  if (!simulationExecution?.length) return null

  const data: TableData[] = simulationExecution.map((cur, i) => {
    return {
      key: i,
      page: cur?.page,
      memory: cur?.memory,
      fault: cur?.fault,
      queue: cur?.queue,
      action: cur?.action,
    }
  })

  const columns: ColumnsType<TableData> = [
    {
      title: 'Página',
      dataIndex: 'page',
      key: 'page'
    },
    {
      title: 'Memória',
      dataIndex: 'memory',
      key: 'memory',
      render: (input: string, record) => highlightText(input, record.page || '', { highlightStyle: { color: 'blue', fontWeight: 'bold' } })
    },
    {
      title: 'Falta de página?',
      dataIndex: 'fault',
      key: 'fault',
      render: (fault: boolean) => fault === undefined ? null : fault ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />,
    },
  ];

  if (['fifoAlgorithm', 'secondChanceAlgorithm'].includes(algorithm)) columns.push({
      title: 'Fila',
      dataIndex: 'queue',
      key: 'queue'
  })

  columns.push({
      title: 'Ação',
      dataIndex: 'action',
      key: 'action'
  })

  return <Table dataSource={data} columns={columns} size="small" pagination={false} />
}

interface TableData {
  key: number,
  page?: string,
  memory?: string,
  fault?: boolean,
  queue?: string,
  action: string,
}