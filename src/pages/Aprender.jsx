import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniCubo from "../components/MiniCubo.jsx";
import CuboSkewb from "../components/CuboSkewb.jsx";
import ModalAlgoritmo from "../components/ModalAlgoritmo.jsx";
import { metodos, categorias, algoritmos } from "../data/algoritmos.js";
import "./Aprender.css";

const POR_PAGINA = 16;

function Aprender() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("NS");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [pagina, setPagina] = useState(1);
  const [lista, setLista] = useState(algoritmos);
  const [selecionadoId, setSelecionadoId] = useState(null);

  const totalPaginas = Math.ceil(lista.length / POR_PAGINA);
  const inicio = (pagina - 1) * POR_PAGINA;
  const visiveis = lista.slice(inicio, inicio + POR_PAGINA);
  const selecionado = lista.find((a) => a.id === selecionadoId);

  function salvarAlgoritmo(sequencia) {
    setLista(
      lista.map((a) =>
        a.id === selecionadoId
          ? { ...a, variantes: [...a.variantes, { sequencia, autor: "@voce" }] }
          : a
      )
    );
  }

  return (
    <div className="aprender">
      <aside className="aprender-lateral">
        <div className="aprender-marca">
          <CuboSkewb />
          <span>MasterSkewb</span>
        </div>
        <h2>Métodos</h2>
        <ul>
          {metodos.map((m) => (
            <li key={m}>
              <button
                className={m === metodo ? "ativo" : ""}
                onClick={() => setMetodo(m)}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
        <button className="voltar" onClick={() => navigate("/home")}>
          Voltar
        </button>
      </aside>

      <main className="aprender-conteudo">
        <header className="aprender-categoria">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </header>

        <section className="aprender-grade">
          {visiveis.map((alg) => (
            <article
              key={alg.id}
              className="card-alg"
              role="button"
              tabIndex={0}
              onClick={() => setSelecionadoId(alg.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelecionadoId(alg.id);
              }}
            >
              <h3>{alg.nome}</h3>
              <span
                className="card-contagem"
                title={`${alg.variantes.length} algoritmos`}
              >
                {alg.variantes.length}
              </span>
              <MiniCubo />
            </article>
          ))}
        </section>

        <div className="aprender-acoes">
          <button className="btn-exportar">Exportar</button>
          <button className="btn-importar">Importar</button>
        </div>

        <nav className="aprender-paginacao">
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
            &lt; Anterior
          </button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Proximo &gt;
          </button>
        </nav>
      </main>

      {selecionado && (
        <ModalAlgoritmo
          algoritmo={selecionado}
          onFechar={() => setSelecionadoId(null)}
          onSalvar={salvarAlgoritmo}
        />
      )}
    </div>
  );
}

export default Aprender;