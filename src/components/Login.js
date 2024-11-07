import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Footer from './Footer';
import Header from './Header';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de login fixo
    if (username === "adm" && password === "adm") {
      alert('Login fixo bem-sucedido!');
      navigate('/estoque');
      return;
    }

    try {
      const response = await fetch('http://4.248.17.144:3010/api/administradores/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login bem-sucedido!');
        navigate('/estoque');
      } else {
        alert('Login falhou! Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <section id="Login" className="page">
      <Header />
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Value"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label style={styles.label}>Senha</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Value"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <a href="#" style={styles.link}>Esqueceu a senha?</a>
      </div>
      <Footer />
    </section>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
  label: {
    color: "#ffffff",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#333333",
    border: "1px solid #444444",
    borderRadius: "5px",
    color: "#ffffff",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  link: {
    color: "#ffffff",
    textDecoration: "underline",
    marginTop: "15px",
  },
};

export default Login;
