import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import highlightText from "../../../utils/highlightText";
import { SimulationExecution } from "../../../utils/types";

export interface DetailsTableProps {
  simulationExecution?: SimulationExecution[]
}

export default function DetailsTable(props: DetailsTableProps) {
  const { simulationExecution } = props
  if (!simulationExecution?.length) return null

  const data: TableData[] = simulationExecution.map((cur, i) => {
    return {
      key: i,
      pageName: cur?.pageName,
      memory: cur?.memory,
      fault: cur?.fault,
      action: cur?.action,
    }
  })

  const columns: ColumnsType<TableData> = [
    {
      title: 'Página',
      dataIndex: 'pageName',
      key: 'pageName'
    },
    {
      title: 'Memória',
      dataIndex: 'memory',
      key: 'memory',
      render: (input: string, record) => highlightText(input, record.pageName || '', { highlightStyle: { color: 'blue', fontWeight: 'bold' } })
    },
    {
      title: 'Falta de página?',
      dataIndex: 'fault',
      key: 'fault',
      render: (fault: boolean) => fault === undefined ? null : fault ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />,
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action'
    },
  ];

  return <Table dataSource={data} columns={columns} size="small" pagination={false} />
}

interface TableData {
  key: number,
  pageName?: string,
  memory?: string,
  fault?: boolean,
  action: string,
}