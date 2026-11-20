import React from 'react';
import './Filters.css';

const CATEGORIES = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'jewelery', label: 'Ювелирные изделия' },
  { value: "men's clothing", label: 'Мужская одежда' },
  { value: "women's clothing", label: 'Женская одежда' }
];

export function Filters({ onFilterChange, initialFilters }) {
  const [localCategories, setLocalCategories] = React.useState(initialFilters.categories || []);
  const [localMinPrice, setLocalMinPrice] = React.useState(String(initialFilters.minPrice ?? ''));
  const [localMaxPrice, setLocalMaxPrice] = React.useState(String(initialFilters.maxPrice ?? ''));
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const errs = {};
    const min = localMinPrice !== '' ? Number(localMinPrice) : undefined;
    const max = localMaxPrice !== '' ? Number(localMaxPrice) : undefined;

    if (min !== undefined && min < 0) {
      errs.min = 'Цена не может быть отрицательной';
    }

    if (max !== undefined && max < 0) {
      errs.max = 'Цена не может быть отрицательной';
    }

    if (min !== undefined && max !== undefined && min >= 0 && max >= 0 && min > max) {
      errs.min = 'Цена «от» не может быть больше цены «до»';
      errs.max = 'Цена «до» не может быть меньше цены «от»';
    }

    return errs;
  };

  const handleCategoryChange = (value, checked) => {
    setLocalCategories((prev) => {
      if (checked) {
        return [...prev, value];
      }
      return prev.filter((category) => category !== value);
    });
  };

  const handleApply = () => {
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    onFilterChange({
      categories: localCategories,
      minPrice: localMinPrice !== '' ? Number(localMinPrice) : undefined,
      maxPrice: localMaxPrice !== '' ? Number(localMaxPrice) : undefined
    });
  };

  const handleMinChange = (value) => {
    setLocalMinPrice(value);
    setErrors((prev) => ({ ...prev, min: '' }));
  };

  const handleMaxChange = (value) => {
    setLocalMaxPrice(value);
    setErrors((prev) => ({ ...prev, max: '' }));
  };

  const minRangeValue = localMinPrice === '' ? 0 : Number(localMinPrice);
  const maxRangeValue = localMaxPrice === '' ? 1000 : Number(localMaxPrice);

  return (
    <section className="filters">
      <div className="filters__top">
        <div className="filters__categories">
          <div className="filters__label">Категория</div>
          <div className="category-list">
            {CATEGORIES.map((category) => (
              <label className="category-option" key={category.value}>
                <input
                  type="checkbox"
                  checked={localCategories.includes(category.value)}
                  onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
          <div className="filters__hint">
            {localCategories.length === 0 ? 'Выбраны все категории' : `Выбрано категорий: ${localCategories.length}`}
          </div>
        </div>

        <div className="price-filters">
          <div className="price-filter">
            <label className="filters__label" htmlFor="min-price">Цена от</label>
            <input
              id="min-price"
              type="number"
              min="0"
              value={localMinPrice}
              onChange={(e) => handleMinChange(e.target.value)}
              placeholder="0"
              className={errors.min ? 'price-input price-input--error' : 'price-input'}
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={Math.min(1000, Math.max(0, minRangeValue))}
              onChange={(e) => handleMinChange(e.target.value)}
              aria-label="Минимальная цена"
              className="price-range"
            />
            {errors.min && <span className="filter-error">{errors.min}</span>}
          </div>

          <div className="price-filter">
            <label className="filters__label" htmlFor="max-price">Цена до</label>
            <input
              id="max-price"
              type="number"
              min="0"
              value={localMaxPrice}
              onChange={(e) => handleMaxChange(e.target.value)}
              placeholder="1000"
              className={errors.max ? 'price-input price-input--error' : 'price-input'}
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={Math.min(1000, Math.max(0, maxRangeValue))}
              onChange={(e) => handleMaxChange(e.target.value)}
              aria-label="Максимальная цена"
              className="price-range"
            />
            {errors.max && <span className="filter-error">{errors.max}</span>}
          </div>
        </div>
      </div>

      <button className="filter-button" type="button" onClick={handleApply}>
        Применить фильтры
      </button>
    </section>
  );
}
