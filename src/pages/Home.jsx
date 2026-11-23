import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import CuboSkewb from "../components/CuboSkewb.jsx";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="inicio">
      <div className="inicio-cubo">
        <CuboSkewb />
      </div>

      <Logo />
      <p className="inicio-subtitulo">Versão Beta</p>

      <nav className="inicio-menu">
        <button className="inicio-btn inicio-azul" onClick={() => navigate("/aprender")}>
          Aprender
        </button>
        <button className="inicio-btn inicio-azul" onClick={() => navigate("/praticar")}>
          Praticar
        </button>
        <button className="inicio-btn inicio-preto">Sobre</button>
      </nav>

      <p className="inicio-versao">Versão 0.1</p>
    </main>
  );
}

export default Home;
