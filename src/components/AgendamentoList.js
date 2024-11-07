import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgendamentosList() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('http://4.248.17.144:3010');
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  const handleEdit = (agendamento) => {
    navigate('/EditAgendamento', { state: { agendamento } });
  };

  const handleDelete = (id_agendamento) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este agendamento?');
    if (!confirmDelete) return;
  
    const id = parseInt(id_agendamento, 10);
    if (isNaN(id)) {
      alert('ID inválido');
      return;
    }
  
    fetch(`http://localhost:3010/api/agendamentos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Agendamento deletado com sucesso!');
          setAgendamentos(agendamentos.filter((agendamento) => agendamento.id_agendamento !== id));
        } else {
          alert('Erro ao excluir agendamento');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir agendamento:', error);
        alert('Erro de conexão ao excluir agendamento');
      });
  };

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
      paddingTop: '20px',
    },
    card: {
      backgroundColor: '#444444',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      width: '500px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      overflowY: 'auto',
      maxHeight: '80vh',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#555555',
      color: '#ffffff',
      padding: '10px',
    },
    tableRow: {
      borderBottom: '1px solid #ccc',
    },
    tableCell: {
      padding: '10px',
      textAlign: 'center',
    },
    button: {
      padding: '8px 12px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#555555',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '14px',
      margin: '0 5px',
    },
    buttonHover: {
      backgroundColor: '#444444',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Lista de Agendamentos</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Nome Cliente</th>
              <th style={styles.tableCell}>Contato</th> {/* Coluna do contato */}
              <th style={styles.tableCell}>Data Agendamento</th>
              <th style={styles.tableCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento.id_agendamento} style={styles.tableRow}>
                <td style={styles.tableCell}>{agendamento.nome_cliente}</td>
                <td style={styles.tableCell}>{agendamento.contato_cliente}</td> {/* Exibindo o contato */}
                <td style={styles.tableCell}>{new Date(agendamento.data_agendamento).toLocaleDateString()}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.button}
                    onClick={() => handleEdit(agendamento)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonHover }}
                    onClick={() => handleDelete(agendamento.id_agendamento)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AgendamentosList;
