import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditServico = () => {
  const { state } = useLocation(); // Recebe o 'servico' passado pelo navigate
  const [servico, setServico] = useState(state?.servico || {}); // Define o estado inicial
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verifica se o 'servico' está vazio ou não foi passado corretamente
  useEffect(() => {
    if (!servico) {
      navigate('/'); // Redireciona para a página inicial se não houver serviço
    }
  }, [servico, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServico({ ...servico, [name]: value });
  };

  const handleSave = () => {
    if (!servico.descricao || !servico.preco || !servico.status_servico) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    // Atualiza o serviço no backend
    fetch(`http://4.248.17.144:3010${servico.id_servico}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico),
    })
      .then((response) => {
        if (response.ok) {
          alert('Serviço atualizado com sucesso!');
          navigate('/ListarServicos'); // Navega para a lista de serviços após a atualização
        } else {
          alert('Erro ao atualizar serviço');
        }
      })
      .catch((error) => {
        console.error('Erro ao atualizar serviço:', error);
        alert('Erro de conexão ao atualizar serviço');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Editar Serviço</h2>
        <form style={styles.form}>
          <div>
            <label style={styles.label}>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={servico.descricao || ''}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Preço</label>
            <input
              type="number"
              name="preco"
              value={servico.preco || ''}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Status</label>
            <input
              type="text"
              name="status_servico"
              value={servico.status_servico || ''}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="button"
            onClick={handleSave}
            style={{ ...styles.button, ...styles.buttonHover }}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.button}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

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

export default EditServico;
