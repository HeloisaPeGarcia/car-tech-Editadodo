import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditItemForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  useEffect(() => {
    if (!item) {
      // Redireciona para a página de estoque se não houver item para editar
      navigate('/estoque');
    }
  }, [item, navigate]);

  const [formData, setFormData] = useState({
    nome_ferramenta: item?.nome_ferramenta || '',
    categoria: item?.categoria || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados atualizados para o backend
      const response = await fetch(`http://4.248.17.144:3010${item.id_ferramenta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Ferramenta atualizada com sucesso!');
        navigate('/estoque'); // Redireciona para a página de estoque
      } else {
        alert('Erro ao atualizar ferramenta');
      }
    } catch (error) {
      console.error('Erro ao atualizar ferramenta:', error);
      alert('Erro de conexão ao atualizar ferramenta');
    }
  };

  if (!item) {
    return null; // Evita renderizar o formulário se não houver item
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
    error: {
      color: 'red',
      fontSize: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Editar Ferramenta</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Nome da Ferramenta:</label>
          <input
            type="text"
            name="nome_ferramenta"
            value={formData.nome_ferramenta}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.label}>Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={styles.input}
          />
          <div>
            <button type="submit" style={styles.button}>Salvar</button>
            <button
              type="button"
              onClick={() => navigate('/estoque')}
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

export default EditItemForm;
