const CORES_PADRAO = {
  topo: ["#fff", "#fff", "#fff", "#fff", "#fff"],
  frenteEsq: ["#43a047", "#43a047", "#43a047", "#43a047", "#43a047"],
  frenteDir: ["#e53935", "#e53935", "#e53935", "#e53935", "#1e63e9"],
  esq: ["#f5a623", "#f5a623", "#f5a623", "#f5a623", "#e53935"],
  dir: ["#1e63e9", "#1e63e9", "#1e63e9", "#1e63e9", "#f5a623"],
};

function MiniCubo({ cores = CORES_PADRAO }) {
  const { topo, frenteEsq, frenteDir, esq, dir } = {
    ...CORES_PADRAO,
    ...cores,
  };

  return (
    <svg viewBox="0 0 364 204" width="90" height="50" aria-hidden="true">
      <g stroke="#333" strokeWidth="2.8" strokeLinejoin="round">
        <polygon points="182,2 227,27 137,27" fill={topo[0]} />
        <polygon points="272,52 227,77 227,27" fill={topo[1]} />
        <polygon points="182,102 137,77 227,77" fill={topo[2]} />
        <polygon points="92,52 137,27 137,77" fill={topo[3]} />
        <polygon points="227,27 227,77 137,77 137,27" fill={topo[4]} />

        <polygon points="92,52 137,77 92,102" fill={frenteEsq[0]} />
        <polygon points="182,102 182,152 137,77" fill={frenteEsq[1]} />
        <polygon points="182,202 137,177 182,152" fill={frenteEsq[2]} />
        <polygon points="92,152 92,102 137,177" fill={frenteEsq[3]} />
        <polygon points="137,77 182,152 137,177 92,102" fill={frenteEsq[4]} />

        <polygon points="182,102 227,77 182,152" fill={frenteDir[0]} />
        <polygon points="272,52 272,102 227,77" fill={frenteDir[1]} />
        <polygon points="272,152 227,177 272,102" fill={frenteDir[2]} />
        <polygon points="182,202 182,152 227,177" fill={frenteDir[3]} />
        <polygon points="227,77 272,102 227,177 182,152" fill={frenteDir[4]} />

        <polygon points="2,2 47,27 2,52" fill={esq[0]} />
        <polygon points="92,52 92,102 47,27" fill={esq[1]} />
        <polygon points="92,152 47,127 92,102" fill={esq[2]} />
        <polygon points="2,102 2,52 47,127" fill={esq[3]} />
        <polygon points="47,27 92,102 47,127 2,52" fill={esq[4]} />

        <polygon points="272,52 317,27 272,102" fill={dir[0]} />
        <polygon points="362,2 362,52 317,27" fill={dir[1]} />
        <polygon points="362,102 317,127 362,52" fill={dir[2]} />
        <polygon points="272,152 272,102 317,127" fill={dir[3]} />
        <polygon points="317,27 362,52 317,127 272,102" fill={dir[4]} />
      </g>
    </svg>
  );
}

export default MiniCubo;