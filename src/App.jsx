import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Praticar from "./pages/Praticar.jsx";
import Aprender from "./pages/Aprender.jsx";

function App() {
  const [logado, setLogado] = useState(false);

  const protegida = (pagina) => (logado ? pagina : <Navigate to="/" replace />);

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={() => setLogado(true)} />} />
      <Route path="/home" element={protegida(<Home />)} />
      <Route path="/praticar" element={protegida(<Praticar />)} />
      <Route path="/aprender" element={protegida(<Aprender />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;