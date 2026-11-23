import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import CuboSkewb from "../components/CuboSkewb.jsx";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (usuario.trim() === "" || senha.trim() === "") {
      setErro("Informe usuário e senha.");
      return;
    }
    setErro("");
    onLogin();
    navigate("/home");
  }

  return (
    <main className="login">
      <section className="login-form-area">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Faça seu login</h2>

          <label htmlFor="usuario">Usuário:</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />

          <div className="login-opcoes">
            <label className="lembrar">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              Lembrar de mim
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>

          {erro && <p className="erro" role="alert">{erro}</p>}

          <button type="submit" className="btn-entrar">Entrar</button>
        </form>
      </section>

      <aside className="login-destaque">
        <Logo className="logo-pequeno" />
        <CuboSkewb />
        <p>Treine hoje. Quebre seus recordes amanhã.</p>
      </aside>
    </main>
  );
}

export default Login;