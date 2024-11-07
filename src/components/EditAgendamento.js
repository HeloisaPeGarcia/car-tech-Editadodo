import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditAgendamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const agendamento = location.state?.agendamento;

  useEffect(() => {
    if (!agendamento) {
      // Se não houver agendamento, redireciona para a lista de agendamentos
      navigate('/agendamentos');
    }
  }, [agendamento, navigate]);

  // Converte a data para o formato 'YYYY-MM-DD'
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    nome_cliente: agendamento?.nome_cliente || '',
    contato_cliente: agendamento?.contato_cliente || '',
    data_agendamento: agendamento?.data_agendamento ? formatDate(agendamento.data_agendamento) : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados atualizados para o backend
      const response = await fetch(`http://4.248.17.144:3010${agendamento.id_agendamento}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Agendamento atualizado com sucesso!');
        navigate('/AgendamentosList'); // Redireciona para a página de agendamentos
      } else {
        alert('Erro ao atualizar agendamento');
      }
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      alert('Erro de conexão ao atualizar agendamento');
    }
  };

  if (!agendamento) {
    return null; // Evita renderizar o formulário se não houver agendamento
  }

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#333333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#444444',
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
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '15px',
      backgroundColor: '#555555',
      color: '#ffffff',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#555555',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#444444',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Editar Agendamento</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Nome Cliente:</label>
          <input
            type="text"
            name="nome_cliente"
            value={formData.nome_cliente}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.label}>Contato Cliente:</label>
          <input
            type="text"
            name="contato_cliente"
            value={formData.contato_cliente}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.label}>Data Agendamento:</label>
          <input
            type="date"
            name="data_agendamento"
            value={formData.data_agendamento}
            onChange={handleChange}
            style={styles.input}
          />
          <div>
            <button type="submit" style={styles.button}>Salvar</button>
            <button
              type="button"
              onClick={() => navigate('/agendamentos')}
              style={{ ...styles.button, ...styles.buttonHover }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAgendamento;
