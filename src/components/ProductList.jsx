import React, { useEffect, useState } from 'react';
import { Filters } from './Filters';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: undefined,
    maxPrice: undefined
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let result = products;

    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category));
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((product) => product.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((product) => product.price <= filters.maxPrice);
    }

    setFilteredProducts(result);
  }, [products, filters]);

  if (loading) {
    return <p className="status-message">Загрузка товаров...</p>;
  }

  if (error) {
    return <p className="status-message status-message--error">Ошибка: {error}</p>;
  }

  return (
    <section>
      <Filters onFilterChange={setFilters} initialFilters={filters} />
      <div className="catalog-heading">
        <h2>Товары</h2>
        <span>Найдено: {filteredProducts.length}</span>
      </div>
      {filteredProducts.length === 0 ? (
        <p className="status-message">Товары не найдены по выбранным фильтрам.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
