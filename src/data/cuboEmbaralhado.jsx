// Planificação do Skewb com todas as peças coloridas (embaralhado).
// Aceita a prop opcional `cores` para pintar outro estado (veja o formato abaixo).

const U = 68.5; // meia largura de uma "casa" da grade
const V = 34; // meia altura de uma "casa" da grade
const X0 = 3; // margem esquerda
const Y0 = 67; // margem superior

// 6 faces, cada uma com 4 vértices (em "casas" [x, y]) no sentido horário
const FACES = [
  [[4, 0], [6, 2], [4, 4], [2, 2]], // 0: topo (losango)
  [[0, 0], [2, 2], [2, 6], [0, 4]], // 1: esquerda
  [[6, 2], [8, 0], [8, 4], [6, 6]], // 2: direita
  [[2, 2], [4, 4], [4, 8], [2, 6]], // 3: meio-esquerda
  [[4, 4], [6, 2], [6, 6], [4, 8]], // 4: meio-direita
  [[2, 6], [4, 8], [4, 12], [2, 10]], // 5: baixo
];

const AMARELO = "#f5f04a";
const VERDE = "#4caf50";
const LARANJA = "#f5a73a";
const VERMELHO = "#ef4f4f";
const AZUL = "#3b82f6";
const BRANCO = "#ffffff";

// Cada face: [centro, canto no vértice 0, canto no vértice 1, canto no vértice 2, canto no vértice 3]
const CORES_PADRAO = [
  [LARANJA, VERDE, BRANCO, BRANCO, VERDE],
  [AMARELO, AMARELO, AMARELO, AMARELO, AMARELO],
  [AZUL, VERDE, LARANJA, LARANJA, BRANCO],
  [BRANCO, VERMELHO, VERDE, BRANCO, VERMELHO],
  [VERDE, VERMELHO, LARANJA, AZUL, AZUL],
  [VERMELHO, AZUL, VERMELHO, LARANJA, AZUL],
];

const ponto = ([i, j]) => [X0 + i * U, Y0 + j * V];
const meio = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const texto = (pontos) => pontos.map((p) => p.join(",")).join(" ");

// Divide uma face em 5 peças: o centro (pelos pontos médios das arestas) e 4 triângulos nos cantos
function pecasDaFace(vertices) {
  const P = vertices.map(ponto);
  const M = P.map((p, i) => meio(p, P[(i + 1) % 4]));
  return [M, ...P.map((p, i) => [p, M[i], M[(i + 3) % 4]])];
}

function SkewbEmbaralhado({ cores = CORES_PADRAO }) {
  return (
    <svg
      viewBox="0 0 554 553"
      width="100%"
      height="100%"
      role="img"
      aria-label="Planificação do Skewb embaralhado"
    >
      <g stroke="#555" strokeWidth="1.5" strokeLinejoin="round">
        {FACES.map((vertices, f) =>
          pecasDaFace(vertices).map((pontos, k) => (
            <polygon key={`${f}-${k}`} points={texto(pontos)} fill={cores[f][k]} />
          ))
        )}
      </g>
    </svg>
  );
}

export default SkewbEmbaralhado;
