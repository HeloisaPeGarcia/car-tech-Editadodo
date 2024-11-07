import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CadastrarServico = () => {
  const [preco, setPreco] = useState(''); // Corrigido
  const [statusserv, setStatusserv] = useState(''); // Corrigido
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const novoServico = {
      preco,
      status_servico: statusserv,
      descricao,
    };
  
    try {
      const response = await fetch('http://4.248.17.144:3010', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoServico),
      });
  
      if (response.ok) {
        alert('Serviço cadastrado com sucesso!');
        setPreco('');
        setStatusserv('');
        setDescricao('');
        navigate('/estoque'); // Redireciona para a tela de estoque
      } else {
        alert('Erro ao cadastrar serviço');
      }
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      alert('Erro de conexão ao cadastrar serviço');
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.container}>
        <h1 style={styles.title}>Cadastrar Serviço</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preço</label>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)} // Atualizado
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Status do Serviço</label>
            <input
              type="text"
              value={statusserv}
              onChange={(e) => setStatusserv(e.target.value)} // Atualizado
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Adicione uma descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#ccc',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#222',
    color: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#222',
    color: '#fff',
    height: '80px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#333',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CadastrarServico;
