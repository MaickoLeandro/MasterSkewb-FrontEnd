import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Praticar.css";
import Embaralhado from "../data/cuboEmbaralhado.jsx"
import Parcial from "../data/cuboParcial.jsx"

function gerarEmbaralhamento(qtd = 9) {
  const movimentos = ["R", "L", "U", "B"];
  const resultado = [];
  let anterior = "";
  while (resultado.length < qtd) {
    const m = movimentos[Math.floor(Math.random() * movimentos.length)];
    if (m === anterior) continue;
    anterior = m;
    resultado.push(m + (Math.random() < 0.5 ? "'" : ""));
  }
  return resultado.join(" ");
}

const cores = [
  { nome: "White", valor: 4, cor: "#ffffff" },
  { nome: "Red", valor: 3, cor: "#ff2a2a" },
  { nome: "Green", valor: 6, cor: "#18a818" },
  { nome: "Yellow", valor: 0, cor: "#ffee00" },
  { nome: "Blue", valor: 5, cor: "#2a4bff" },
  { nome: "Orange", valor: 5, cor: "#ffa500" },
];

const dicas = {
  parado: "Pressione e segure a barra de ESPAÇO para preparar",
  preparando: "Continue segurando...",
  pronto: "Solte para começar",
  rodando: "Aperte qualquer tecla para parar",
};

function Praticar() {
  const navigate = useNavigate();
  const [embaralhamento, setEmbaralhamento] = useState(gerarEmbaralhamento);
  const [tempo, setTempo] = useState(0);
  const [estado, setEstado] = useState("parado");
  const [historico, setHistorico] = useState([]);
  const [fixar, setFixar] = useState(false);

  const estadoRef = useRef("parado");
  const inicioRef = useRef(0);
  const holdRef = useRef(null);
  const intervaloRef = useRef(null);

  function mudarEstado(novo) {
    estadoRef.current = novo;
    setEstado(novo);
  }

  useEffect(() => {
    function parar() {
      clearInterval(intervaloRef.current);
      const final = (performance.now() - inicioRef.current) / 1000;
      setTempo(final);
      setHistorico((h) => [final, ...h]);
      setEmbaralhamento(gerarEmbaralhamento());
      mudarEstado("parado");
    }

    function iniciar() {
      inicioRef.current = performance.now();
      intervaloRef.current = setInterval(() => {
        setTempo((performance.now() - inicioRef.current) / 1000);
      }, 10);
      mudarEstado("rodando");
    }

    function aoPressionar(e) {
      if (e.repeat) return;
      if (estadoRef.current === "rodando") {
        parar();
        return;
      }
      if (e.code === "Space" && estadoRef.current === "parado") {
        e.preventDefault();
        mudarEstado("preparando");
        holdRef.current = setTimeout(() => mudarEstado("pronto"), 300);
      }
    }

    function aoSoltar(e) {
      if (e.code !== "Space") return;
      if (estadoRef.current === "pronto") {
        iniciar();
      } else if (estadoRef.current === "preparando") {
        clearTimeout(holdRef.current);
        mudarEstado("parado");
      }
    }

    window.addEventListener("keydown", aoPressionar);
    window.addEventListener("keyup", aoSoltar);
    return () => {
      window.removeEventListener("keydown", aoPressionar);
      window.removeEventListener("keyup", aoSoltar);
      clearInterval(intervaloRef.current);
      clearTimeout(holdRef.current);
    };
  }, []);

  const melhor = historico.length ? Math.min(...historico) : null;

  return (
    <div className="praticar">
      <header className="praticar-topo">
        <button className="btn-sair" onClick={() => navigate("/home")}>sair</button>
        <p className="praticar-embaralhamento" aria-label={`Embaralhamento: ${embaralhamento}`}>
          {embaralhamento.split(" ").map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </p>
        <select aria-label="Opção" defaultValue="0">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </header>

      <main className="praticar-centro">
        <p className={`cronometro ${estado}`}>{tempo.toFixed(2)}</p>
        <p className="dica">{dicas[estado]}</p>
      </main>

      <aside className="praticar-historico">
        <h2>Últimos tempos</h2>
        {historico.length === 0 ? (
          <p className="vazio">Faça seu primeiro solve.</p>
        ) : (
          <>
            <p className="melhor">Melhor: {melhor.toFixed(2)}</p>
            <ol>
              {historico.slice(0, 5).map((t, i) => (
                <li key={historico.length - i}>
                  <span>#{historico.length - i}</span>
                  <span>{t.toFixed(2)}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </aside>

      <ul className="praticar-cores">
        {cores.map((c) => (
          <li key={c.nome}>
            <span className="ponto" style={{ background: c.cor }} />
            <span className="nome">{c.nome}:</span>
            <strong>{c.valor}</strong>
          </li>
        ))}
      </ul>

      <div className="praticar-imagens">
        <div className="planificacao">
          <Parcial />

          <label>
            <input
              type="checkbox"
              checked={fixar}
              onChange={(e) => setFixar(e.target.checked)}
            />
            fixar
          </label>
        </div>
        <div className="planificacao" >
        <Embaralhado />
        </div>
       </div>
    </div>
  );
}

export default Praticar;
