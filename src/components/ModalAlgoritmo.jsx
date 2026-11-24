import { useState, useEffect } from "react";
import MiniCubo from "./MiniCubo.jsx";
import "./ModalAlgoritmo.css";

const MOVIMENTOS = ["B", "B'", "F", "F'", "R", "R'", "L", "L'", "U", "U'"];

function ModalAlgoritmo({ algoritmo, onFechar, onSalvar }) {
  const [novo, setNovo] = useState([]);

  useEffect(() => {
    function aoTecla(e) {
      if (e.key === "Escape") onFechar();
    }
    window.addEventListener("keydown", aoTecla);
    return () => window.removeEventListener("keydown", aoTecla);
  }, [onFechar]);

  function salvar() {
    if (novo.length === 0) return;
    onSalvar(novo.join(" "));
    setNovo([]);
  }

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Algoritmos do caso ${algoritmo.nome}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-imagem">
          <MiniCubo />
        </div>

        <p className="modal-caso">{algoritmo.caso}</p>

        <h3 className="modal-titulo">Algoritmos</h3>
        <ul className="modal-lista">
          {algoritmo.variantes.map((v, i) => (
            <li key={i}>
              <span>{v.sequencia}</span>
              <span>{v.autor}</span>
            </li>
          ))}
        </ul>

        <input
          className="modal-novo"
          readOnly
          placeholder="Novo Algoritmo"
          aria-label="Novo algoritmo (Backspace apaga o último movimento)"
          value={novo.join(" ")}
          onKeyDown={(e) => {
            if (e.key === "Backspace") setNovo(novo.slice(0, -1));
          }}
        />

        <div className="modal-movimentos">
          {MOVIMENTOS.map((m) => (
            <button key={m} onClick={() => setNovo([...novo, m])}>
              {m}
            </button>
          ))}
        </div>

        <button className="modal-salvar" onClick={salvar}>
          Salvar
        </button>
      </section>
    </div>
  );
}

export default ModalAlgoritmo;