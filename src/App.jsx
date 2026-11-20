import React from 'react';
import { ProductList } from './components/ProductList';
import './App.css';

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="page-header__label">МАГАЗИН</div>
        <h1>Каталог товаров</h1>
        <p>Выберите категорию и подходящую цену</p>
      </header>
      <ProductList />
    </main>
  );
}

export default App;
