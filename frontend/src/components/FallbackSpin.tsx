import { Spin } from "antd";

interface FallbackSpinProps {
  tip: string
}

export default function FallbackSpin(props: FallbackSpinProps) {
  const { tip } = props;

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}>
    <Spin tip={tip} />
  </div>
}