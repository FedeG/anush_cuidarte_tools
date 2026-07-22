import { useState, useEffect, useRef, useCallback } from 'react';

// CORS proxy porque e-lactancia.org no tiene CORS habilitado
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const SEARCH_BASE = 'https://e-lactancia.org/megasearch/';
const BASE_URL = 'https://e-lactancia.org';

function getDetailUrl(item) {
  if (item.term === 'producto') {
    const slug = (item.nombre_en || item.nombre)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${BASE_URL}/breastfeeding/${slug}/product/`;
  }
  return `${BASE_URL}/buscar/?term_id=${item.id}&term_type=${item.term}`;
}

const TERM_LABELS = {
  producto: 'Producto',
  sinonimo: 'Sinónimo',
  marca: 'Marca',
  grupo: 'Grupo',
};

function ELactanciaSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${CORS_PROXY}${encodeURIComponent(SEARCH_BASE + '?query=' + encodeURIComponent(trimmed))}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = useCallback((item) => {
    setSelected(item);
  }, []);

  const handleOpen = useCallback(() => {
    if (selected) window.open(getDetailUrl(selected), '_blank', 'noopener');
  }, [selected]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  const handleBack = () => {
    setSelected(null);
    setQuery('');
    setResults([]);
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
            Datos provistos por{' '}
            <a href={BASE_URL} target="_blank" rel="noopener" style={{ color: 'var(--pink)' }}>
              e-lactancia.org
            </a>.
          </p>
        </div>
      </div>

      {!selected ? (
        <>
          {/* Buscador */}
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
                </div>
                <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Ingresá al menos 3 caracteres para comenzar la búsqueda.
                </p>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status" style={{ color: 'var(--pink)' }}>
                <span className="visually-hidden">Buscando…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Error al buscar: {error}
                </div>
              </div>
            </div>
          )}

          {!loading && !error && query.trim().length >= 3 && results.length === 0 && (
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card p-4 text-center">
                  <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}></i>
                  <p className="text-muted mt-2 mb-0">No se encontraron resultados para "{query.trim()}".</p>
                </div>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card p-2">
                  <div className="list-group list-group-flush">
                    {results.map((item, i) => (
                      <button
                        key={`${item.term}-${item.id}-${i}`}
                        type="button"
                        className="list-group-item list-group-item-action d-flex align-items-center gap-3"
                        onClick={() => handleSelect(item)}
                        style={{ border: 'none', borderBottom: i < results.length - 1 ? '1px solid var(--cream)' : 'none' }}
                      >
                        <div className="flex-shrink-0">
                          <span
                            className="badge"
                            style={{
                              background: item.term === 'producto' ? 'var(--green, #88B14B)' :
                                item.term === 'sinonimo' ? 'var(--pink-light, #D9AEB5)' :
                                item.term === 'marca' ? 'var(--sky, #B8C8DF)' : '#e0e0e0',
                              color: item.term === 'producto' ? 'white' : 'var(--text-dark, #333)',
                              fontSize: '0.65rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          >
                            {TERM_LABELS[item.term] || item.term}
                          </span>
                        </div>
                        <div className="flex-grow-1 text-start">
                          <div className="fw-semibold" style={{ fontSize: '0.95rem' }}>
                            {item.nombre}
                          </div>
                          {item.nombre_en && item.nombre_en !== item.nombre && (
                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                              {item.nombre_en}
                            </div>
                          )}
                        </div>
                        <i className="bi bi-chevron-right text-muted"></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Detalle del resultado seleccionado */
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card p-4">
              <div className="d-flex align-items-start gap-3 mb-4">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleBack}
                  style={{ color: 'var(--pink)', fontSize: '1.2rem', padding: '4px 8px' }}
                  title="Volver"
                >
                  <i className="bi bi-arrow-left"></i>
                </button>
                <div className="flex-grow-1">
                  <h4 className="mb-1" style={{ color: 'var(--text-dark)' }}>
                    {selected.nombre}
                  </h4>
                  {selected.nombre_en && selected.nombre_en !== selected.nombre && (
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                      {selected.nombre_en}
                    </p>
                  )}
                  <span className="badge mt-1" style={{
                    background: selected.term === 'producto' ? 'var(--green, #88B14B)' :
                      selected.term === 'sinonimo' ? 'var(--pink-light, #D9AEB5)' :
                      selected.term === 'marca' ? 'var(--sky, #B8C8DF)' : '#e0e0e0',
                    color: selected.term === 'producto' ? 'white' : 'var(--text-dark, #333)',
                    fontSize: '0.7rem',
                  }}>
                    {TERM_LABELS[selected.term] || selected.term}
                  </span>
                </div>
                <a
                  href={getDetailUrl(selected)}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  Abrir en e-lactancia.org
                </a>
              </div>

              <div className="alert alert-warning mb-3 py-2" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-info-circle me-1"></i>
                e-lactancia.org no permite verse dentro de otras páginas.
                Usá el botón "Abrir en e-lactancia.org" para ver la información completa.
              </div>

              <div className="border rounded" style={{ background: '#f8f8f8', minHeight: 400, position: 'relative' }}>
                <iframe
                  src={getDetailUrl(selected)}
                  title={selected.nombre}
                  style={{
                    width: '100%',
                    height: 600,
                    border: 'none',
                  }}
                  sandbox="allow-scripts allow-same-origin"
                  onError={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ELactanciaSearch;
