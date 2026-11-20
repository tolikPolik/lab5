import React from 'react';

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__content">
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__category">Категория: {product.category}</p>
        <p className="product-card__price">{product.price.toLocaleString('ru-RU')} ₽</p>
      </div>
    </article>
  );
}
