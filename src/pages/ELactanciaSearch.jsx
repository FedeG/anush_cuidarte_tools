import { useState } from 'react';

const BASE_URL = 'https://e-lactancia.org';

function ELactanciaSearch() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    window.open(`${BASE_URL}/buscar/?q=${encodeURIComponent(trimmed)}`, '_blank', 'noopener');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="container" style={{ maxWidth: 'var(--max-width)' }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="mb-2" style={{ color: 'var(--text-dark)' }}>
            Buscar en e-lactancia
          </h1>
          <p className="text-muted mb-4" style={{ fontSize: '0.95rem', maxWidth: 600 }}>
            Consultá la compatibilidad de medicamentos, plantas y otros productos con la lactancia.
          </p>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4">
            <div className="input-group input-group-lg">
              <span className="input-group-text" style={{ background: 'var(--cream)', border: '1.5px solid #e0e0e0' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscá un medicamento, planta, marca…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{ border: '1.5px solid #e0e0e0' }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={!query.trim()}
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
              <i className="bi bi-info-circle me-1"></i>
              Te redirige a e-lactancia.org para ver los resultados.
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>
              Búsquedas rápidas
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {['Ibuprofeno', 'Paracetamol', 'Amoxicilina', 'Dipirona', 'Cafeína', 'Omeprazol', 'Sertralina', 'Salbutamol'].map((term) => (
                <button
                  key={term}
                  type="button"
                  className="btn btn-sm"
                  style={{
                    background: 'var(--cream)',
                    color: 'var(--text-dark)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                  }}
                  onClick={() => {
                    setQuery(term);
                    window.open(`${BASE_URL}/buscar/?q=${encodeURIComponent(term)}`, '_blank', 'noopener');
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
            <hr className="my-3" />
            <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
              <i className="bi bi-box-arrow-up-right me-1"></i>
              También podés ir directamente a{' '}
              <a href={BASE_URL} target="_blank" rel="noopener" style={{ color: 'var(--pink)' }}>
                e-lactancia.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ELactanciaSearch;
