import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ListarServicos = () => {
  const [servicos, setServicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Faz a requisição para buscar os serviços na API
    fetch('http://4.248.17.144:3010/api/servicos')
      .then((response) => response.json())
      .then((data) => setServicos(data))
      .catch((error) => console.error('Erro ao buscar serviços:', error));
  }, []);

  const handleDelete = (id_servico) => {
    // Faz a requisição para excluir o serviço no backend
    fetch(`http://4.248.17.144:3010/api/servicos/${id_servico}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Atualiza a lista de serviços após a exclusão
          setServicos(servicos.filter(servico => servico.id_servico !== id_servico));
          alert('Serviço excluído com sucesso!');
        } else {
          alert('Erro ao excluir serviço');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir serviço:', error);
        alert('Erro de conexão ao excluir serviço');
      });
  };

  const handleEdit = (servico) => {
    // Navega para a página de edição passando o serviço selecionado
    navigate('/EditServico', { state: { servico } });
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Lista de Serviços</h1>
      <div style={styles.container}>
        <div style={styles.list}>
          {servicos.map(servico => (
            <div key={servico.id_servico} style={styles.servicoItem}>
              <h4>{servico.descricao}</h4>
              <p>Preço: {servico.preco}</p>
              <p>Status: {servico.status_servico}</p>
              <button onClick={() => handleEdit(servico)} style={styles.editButton}>✏️ Editar</button>
              <button onClick={() => handleDelete(servico.id_servico)} style={styles.deleteButton}>❌ Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
    pageContainer: {
      backgroundColor: '#1d1d1d', // Fundo da tela inteira
      minHeight: '100vh', // Ocupa toda a altura da tela
      width: '100vw', // Ocupa a largura inteira da tela
      paddingTop: '160px', // Aumentado para mais espaço superior
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', // Alinha o conteúdo no topo da tela
    },
    title: {
      fontSize: '2em',
      color: '#ffffff',
      marginBottom: '30px', // Aumentado para mais espaçamento abaixo do título
      textAlign: 'center', // Centraliza o título
    },
    list: {
      display: 'flex',
      flexDirection: 'row', // Mudado para horizontal (row)
      gap: '30px', // Aumentado o espaçamento entre os cards
      flexWrap: 'wrap', // Permite que os cards quebrem linha se necessário
      justifyContent: 'center', // Centraliza os cards na tela
      marginBottom: '40px', // Aumentado para mais espaçamento entre os cards
    },
    servicoItem: {
      backgroundColor: '#2b2a2a',
      padding: '12px', // Diminuído o padding para reduzir o tamanho
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(234, 141, 141, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s ease',
      width: '180px', // Tamanho reduzido dos cards
      height: 'auto', // Ajusta a altura automaticamente
    },
    servicoItemTitle: {
      fontSize: '16px', // Reduzido o tamanho da fonte
      color: '#333333',
      marginBottom: '8px',
    },
    servicoItemText: {
      fontSize: '12px', // Reduzido o tamanho da fonte
      color: '#fff8f8',
  marginBottom: '12px',
    },
    editButton: {
      backgroundColor: '#10b981', // Verde para edição
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px', // Reduzido o tamanho da fonte
      margin: '0 5px',
      color: '#fff',
      transition: 'color 0.3s ease',
    },
    deleteButton: {
      backgroundColor: '#ef4444', // Vermelho para exclusão
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px', // Reduzido o tamanho da fonte
      margin: '0 5px',
      color: '#fff',
      transition: 'color 0.3s ease',
    },
  };
export default ListarServicos;