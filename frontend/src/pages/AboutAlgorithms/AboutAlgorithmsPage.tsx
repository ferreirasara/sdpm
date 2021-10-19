import { BulbOutlined } from "@ant-design/icons";
import { Col, Collapse, PageHeader, Row, Typography } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = 'Sobre os algoritmos'

  const firstParagraphText = `Se uma página é referenciada, mas não está carregada na memória, ocorre a chamada falta de página.
  Para resolver isso, o sistema operacional precisa escolher uma página para ser substituída. Para um melhor desempenho do sistema, a página a ser escolhida deve ser uma página pouco utilizada.
  Caso contrário, mais faltas de página irão ocorrer, pois a página removida será referenciada novamente.`

  const secondParagraphText = `Para realizar esse trabalho existem os diversos algoritmos de troca de página, que buscam otimizar ao máximo a substituição de páginas.`

  const optimalAlgorithmText = `O algoritmo ótimo é excelente, mas impossível na prática.  Apesar disso, elepode ser utilizado como forma de mensurar os outros algoritmos.`;
  const fifoAlgorithmText = `O FIFO é o mais simples, mas também a pior escolha, pois remove as páginassem levar nada em consideração, fazendo com que remova páginas que estão em uso.`;
  const secondChanceAlgorithmText = `O algoritmo segunda chance é uma versão mais aprimorada do FIFO. Eleconfere se a página está sendo usada. Caso não esteja, ela é removida. Essa pequenaalteração, melhora muito o desempenho, comparado com o FIFO.`;
  const lruAlgorithmText = `O LRU é muito bom, mas só pode ser implementado utilizando um hardwareespecial.`;
  const nruAlgorithmText = `O NRU divide as páginas em classes, combinando os bits R e M, e a página declasse mais baixa é removida. Apesar de ser fácil de implementar, ele é rudimentar.`;
  const wsClockAlgorithmText = `O WS-Clock é baseado no conjunto de trabalho, e é muito eficiente,amplamente utilizado na prática.`;

  const panels = [
    <Collapse.Panel header={<b>Algoritimo Ótimo</b>} key="optimalAlgorithm"><p>{optimalAlgorithmText}</p></Collapse.Panel>,
    <Collapse.Panel header={<b>Algoritimo FIFO</b>} key="fifoAlgorithm"><p>{fifoAlgorithmText}</p></Collapse.Panel>,
    <Collapse.Panel header={<b>Algoritimo Segunda Chance</b>} key="secondChanceAlgorithm"><p>{secondChanceAlgorithmText}</p></Collapse.Panel>,
    <Collapse.Panel header={<b>Algoritimo LRU</b>} key="lruAlgorithm"><p>{lruAlgorithmText}</p></Collapse.Panel>,
    <Collapse.Panel header={<b>Algoritimo NRU</b>} key="nruAlgorithm"><p>{nruAlgorithmText}</p></Collapse.Panel>,
    <Collapse.Panel header={<b>Algoritimo WS-Clock</b>} key="wsClockAlgorithm"><p>{wsClockAlgorithmText}</p></Collapse.Panel>,
  ]

  return <>
    <PageHeader
      title={<><BulbOutlined /> Sobre os algoritmos</>}
      style={{ background: 'white' }}
    />
    <Row justify='center' style={{ marginBottom: '2px', marginTop: '2px' }}>
      <Col style={{ marginTop: '10px', width: '100vh' }}>
        <Typography.Title>Algoritmos de troca de página</Typography.Title>
        <p>{firstParagraphText}</p>
        <p>{secondParagraphText}</p>
        <Collapse accordion ghost>
          {panels}
        </Collapse>
      </Col>
    </Row>
  </>
}