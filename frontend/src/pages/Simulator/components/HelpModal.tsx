import { Modal, Space, Timeline, Typography } from "antd";

interface HelpModalProps {
  helpModalVisible: boolean
  setHelpModalVisible: (value: React.SetStateAction<boolean>) => void
}

export default function HelpModal(props: HelpModalProps) {
  const { helpModalVisible, setHelpModalVisible } = props;
  return <Modal
    title="Ajuda com o simulador"
    visible={helpModalVisible}
    footer={null}
    onCancel={() => setHelpModalVisible(false)}
  >
    <Timeline>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Primeiro, preencha os dados para a simulação</Typography.Text>
          <span>Os campos "Fila de páginas", "Fila de ações", "Estado inicial da memória", "Interrupção do relógio" e "τ (tau)" podem ser gerados automaticamente.</span>
          <span>O campo "Interrupção do relógio" é utilizado somente quando os algoritmos "NRU", "Segunda Chance" ou "WS-Clock" são selecionados</span>
          <span>O Campo "τ (tau)" é utilizado somente quando o algoritmo "WS-Clock" é selecionado.</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Botões extras.</Typography.Text>
          <span>Gerar dados aleratórios: Caso queira, você pode gerar dados aleatorios para a simulação</span>
          <span>Limpar: limpa todos os dados do formulário.</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Após clicar em "Simular", aguarde alguns instantes.</Typography.Text>
          <span>Dependendo da quantidade de dados, a simulação pode demorar um pouco.</span>
          <span>Devido ao site de hospedagem utilizado, a API de simulação "dorme" após 30 minutos sem uso. Nesse caso, é comum que o processo de simulação demore um pouco mais, pois precisa esperar a API iniciar novamente.</span>
        </Space>
      </Timeline.Item>
      <Timeline.Item color="#ffe58f">
        <Space direction="vertical">
          <Typography.Text strong mark>Resultados</Typography.Text>
          <span>Caso o tamanho da memória seja menor ou igual a 5, o número de páginas seja menor ou igual a 10 e o tamanho da fila de páginas seja menor ou igual a 50, serão mostrados os detalhes da simulação, disponíveis ao final da página.</span>
        </Space>
      </Timeline.Item>
    </Timeline>
  </Modal>
}