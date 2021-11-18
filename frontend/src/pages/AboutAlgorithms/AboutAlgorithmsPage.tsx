import { BulbOutlined } from "@ant-design/icons";
import { Col, Collapse, PageHeader, Row, Typography } from "antd";

export default function AboutAlgorithmsPage() {
  document.title = "Sobre os algoritmos"

  const firstParagraphText = `Se uma página é referenciada, mas não está carregada na memória, ocorre a chamada falta de página.
  Para resolver isso, o sistema operacional precisa escolher uma página para ser substituída. Para um melhor desempenho do sistema, a página a ser escolhida deve ser uma página pouco utilizada.
  Caso contrário, mais faltas de página irão ocorrer, pois a página removida será referenciada novamente.`

  const secondParagraphText = `Para realizar esse trabalho existem os diversos algoritmos de troca de página, que buscam otimizar ao máximo a substituição de páginas.`

  const optimalAlgorithmText = <div>
    <p>O algoritmo ótimo é excelente, mas impossível na prática. Apesar disso, ele pode ser utilizado como forma de mensurar os outros algoritmos.</p>
    <p>Seu funcionamento se dá da seguinte forma: quando ocorre uma falta de página, as outras páginas na memória são analisadas conforme quantas instruções serão executadas antes daquela página ser referenciada.</p>
    <p>Por exemplo, uma página só será referenciada  após 8 milhões de instruções, e outra será referenciada após 6 milhões. Removendo a primeira página, teremos um ganho de desempenho, visto que muitas instruções serão executadas antes daquela página ser referenciada.</p>
    <p>Mas para implementar algo assim, o sistema operacional teria de saber quando cada uma das páginas será referenciada, algo que é impossível. Assim, esse algoritmo só pode ser visto em funcionamento em um simulador, onde o ambiente é controlado e as referências podem ser previstas.</p>
  </div>;
  const fifoAlgorithmText = <div>
    <p>O algoritmo FIFO, é um algoritmo de baixo custo, e muito conhecido. Seu funcionamento é bastante simples.</p>
    <p>O sistema operacional mantém uma lista de todas as páginas carregadas na memória, com a página mais recente no final da lista, e a mais antiga no começo. Quando ocorrer uma falta de página nesse cenário, a página que está na frente da lista será removida, e a nova página é adicionada ao fim da lista.</p>
    <p>No entanto, ao utilizar o algoritmo FIFO, surge um problema: a página mais antiga ainda pode ser útil, e ser referenciada logo após ser removida, causando uma nova falta de página.</p>
  </div>;
  const secondChanceAlgorithmText = <div>
    <p>Esse algoritmo surge como uma melhoria para o FIFO.</p>
    <p>A fim de evitar o problema de descartar uma página útil, a solução seria observar o bit Referenciada dessa página. Se o mesmo for 0, a página é pouco utilizada, e substituída imediatamente. Mas se esse bit for 1, o mesmo é limpo, a página vai para o final da fila, e a pesquisa segue em frente.</p>
    <p>Mas caso aconteça de todas as páginas terem sido referenciadas, o algoritmo segunda chance volta a ser um algoritmo FIFO.</p>
  </div>;
  const lruAlgorithmText = <div>
    <p>O algoritmo LRU é uma boa aproximação do algoritmo ótimo. Seu funcionamento se baseia na ideia de que se uma página não foi referenciada há muito tempo, ela provavelmente continuará sem ser referenciada. Logo, ao ocorrer uma falta de página, essa seria a página ideal para ser removida.</p>
    <p>Embora pareça um bom algoritmo para diminuir as faltas de página, sua implementação é extremamente custosa, pois é necessário manter uma lista encadeada de todas as páginas que estão na memória, com a mais usada na frente, e as menos usadas ao final dessa lista. Além disso, essa lista precisa ser constantemente atualizada, e as operações (encontrar uma página, deletá-la e movê-la) demandam muito tempo.</p>
    <p>Apesar disso, existem maneiras de implementar esse algoritmo usando hardware, o que torna o LRU menos custoso. Para isso, é utilizado um contador de 64 bits, chamado de C, que é incrementado a cada instrução, e esse contador também é armazenado na entrada ta tabela de páginas. Quando ocorrer a falta de página, o sistema operacional lê todos os contadores, e o que tiver o valor mais baixo refere-se à página menos usada recentemente.</p>
  </div>;
  const nruAlgorithmText = <div>
    <p>Ao inicializar um processo, o sistema operacional define como 0 os bits R (referenciada) e M (modificada), para todas as páginas. De tempos em tempos, o bit R é limpo, para diferenciar as páginas não referenciadas recentemente das que foram referenciadas. Quando ocorrer a falta de página, o sistema operacional irá dividir todas as páginas em quatro categorias, com base nos valores atuais dos bits R e M. As categorias são as seguintes:</p>
    <ul>
      <li>Classe 0: não referenciada, não modificada.</li>
      <li>Classe 1: não referenciada, modificada.</li>
      <li>Classe 2: referenciada, não modificada.</li>
      <li>Classe 3: referenciada, modificada.</li>
    </ul>
    <p>O NRU então irá remover aleatoriamente uma página da classe de ordem mais baixa, e que não esteja vazia. A lógica desse algoritmo é que é melhor remover uma página que foi modificada, mas não foi referenciada recentemente (a pelo menos um tique do relógio), do que remover uma página não modificada mas que é constantemente referenciada.</p>
  </div>;
  const wsClockAlgorithmText = <div>
    <p>O WS-Clock utiliza uma lista circular e inicialmente a lista está vazia, e conforme as páginas são carregadas, elas são adicionadas à lista. Cada entrada possui um campo para o instante do último uso do algoritmo do conjunto de trabalho, e os bits R (referenciada) e M (modificada).</p>
    <p>Ao ocorrer uma falta de página, é analisada a página que estiver sendo apontada. Caso o bit R seja 1, a página foi utilizada e não será removida, portanto o bit R é alterado para 0, e o ponteiro avança uma página.</p>
    <p>Quando uma página tiver o bit R igual a zero, se sua idade for maior que tau e a página estiver limpa, então ela não está no conjunto de trabalho, e existe uma cópia válida no disco. O quadro dessa página é reivindicado e a nova página é colocada no lugar. No entanto, se a página estiver suja, ela não pode ser reivindicada de imediato. Então é escalonada a escrita em disco, e o ponteiro avança para a próxima página, pois assim, mais adiante, haverá uma página limpa que poderá ser removida imediatamente.</p>
  </div>;

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
      style={{ background: "white" }}
    />
    <Row justify="center" style={{ marginBottom: "2px", marginTop: "2px" }}>
      <Col style={{ marginTop: "10px", width: "100vh" }}>
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