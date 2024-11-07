import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Agendamento() {
  const [formData, setFormData] = useState({
    id_servico: null, // Valor padrão
    id_adm: null, // Valor padrão
    nome_cliente: '',
    contato_cliente: '',
    data_agendamento: '',
  });

  const navigate = useNavigate(); // Coloque useNavigate aqui

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formatar a data para yyyy-mm-dd
    const formattedDate = new Date(formData.data_agendamento).toISOString().split('T')[0];
    const updatedFormData = { ...formData, data_agendamento: formattedDate };
  
    try {
      const response = await fetch('http://4.248.17.144:3010', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        alert('Agendamento registrado com sucesso!');
        setFormData({
          id_servico: null,
          id_adm: null,
          nome_cliente: '',
          contato_cliente: '',
          data_agendamento: '',
        });
        navigate('/AgendamentosList'); // Redireciona para a tela de estoque
      } else {
        alert('Erro ao registrar agendamento');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      alert('Erro de conexão com a API');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Cadastro de Agendamento</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Nome do Cliente:
            <input
              type="text"
              name="nome_cliente"
              value={formData.nome_cliente}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Contato do Cliente:
            <input
              type="text"
              name="contato_cliente"
              value={formData.contato_cliente}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Data do Agendamento:
            <input
              type="date"
              name="data_agendamento"
              value={formData.data_agendamento}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed', // Ocupa toda a tela
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#333333', // Fundo da tela
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#444444', // Fundo do card
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '15px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#555555',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#444444',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
};

export default Agendamento;
