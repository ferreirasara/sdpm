import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Page, SimulationExecution } from "../../../utils/types";

export interface DetailsTableProps {
  simulationExecution?: SimulationExecution[]
}

const MemoryRender = (props: { memory: Page[], record: TableData }) => {
  const { memory, record } = props;
  return <>
    {memory?.map(cur => {
      const referenced = cur.referenced ? 1 : 0;
      const modified = cur.modified ? 1 : 0;

      return <Tag color={record.pageName === cur.pageName ? "#d9d9d9" : "#f5f5f5"}>
        <Typography.Text keyboard>{cur.pageName}</Typography.Text>
        <Typography.Text type={referenced ? "success" : "danger"} keyboard>{"R=" + referenced}</Typography.Text>
        <Typography.Text type={modified ? "success" : "danger"} keyboard>{"M=" + modified}</Typography.Text>
      </Tag>
    })}
  </>
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
      title: "Página",
      dataIndex: "pageName",
      key: "pageName"
    },
    {
      title: "Memória",
      dataIndex: "memory",
      key: "memory",
      render: (memory: Page[], record: TableData) => <MemoryRender memory={memory} record={record} />
    },
    {
      title: "Página presente?",
      dataIndex: "fault",
      key: "fault",
      render: (fault: boolean) => fault === undefined ? null : fault ? <CloseCircleOutlined style={{ color: "red" }} /> : <CheckCircleOutlined style={{ color: "green" }} />,
    },
    {
      title: "Ação",
      dataIndex: "action",
      key: "action"
    },
  ];

  return <Table dataSource={data} columns={columns} size="small" pagination={false} />
}

interface TableData {
  key: number,
  pageName?: string,
  memory?: Page[],
  fault?: boolean,
  action: string,
}