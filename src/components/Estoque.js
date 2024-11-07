import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './InventoryManagement.css';

function InventoryManagement() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    color: '',
    brand: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://4.248.17.144:3010/estoque')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Erro ao buscar ferramentas:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredItems = items.filter(item => {
    return (
      item.nome_ferramenta.toLowerCase().includes(filters.keyword.toLowerCase())
    );
  });

  const handleEdit = (item) => {
    navigate('/edicao', { state: { item } });
  };

  const handleDelete = (id_ferramenta) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta ferramenta?');
    if (!confirmDelete) return;
  
    // Faz a requisição para excluir a ferramenta no backend
    fetch(`http://localhost:3010/api/ferramentas/${id_ferramenta}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Se a exclusão for bem-sucedida, atualiza o estado para remover a ferramenta
          setItems(items.filter(item => item.id_ferramenta !== id_ferramenta));
        } else {
          alert('Erro ao excluir ferramenta');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir ferramenta:', error);
        alert('Erro de conexão ao excluir ferramenta');
      });
  };
  
  

  return (
    <div className="inventory-management">
      <Navbar />
      <aside className="filters">
        <input
          type="text"
          name="keyword"
          placeholder="Buscar ferramenta..."
          value={filters.keyword}
          onChange={handleFilterChange}
        />
      </aside>
      <div className="inventory-items">
        {filteredItems.map(item => (
          <div key={item.id_ferramenta} className="inventory-item">
            <h4>{item.nome_ferramenta}</h4>
            <p>Categoria: {item.categoria}</p>
            <button onClick={() => handleEdit(item)}>✏️</button>
            <button onClick={() => handleDelete(item.id_ferramenta)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryManagement;