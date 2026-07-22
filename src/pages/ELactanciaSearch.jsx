const BASE_URL = 'https://e-lactancia.org';

const QUICK_SEARCHES = [
  'Ibuprofeno', 'Paracetamol', 'Amoxicilina', 'Dipirona',
  'Cafeína', 'Omeprazol', 'Sertralina', 'Salbutamol',
];

function ELactanciaSearch() {
  return (
    <div className="container-fluid" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      {/* Barra superior con accesos rápidos */}
      <div className="px-3 py-2 border-bottom d-flex align-items-center gap-2" style={{ background: 'var(--cream)', flexShrink: 0 }}>
        <a
          href={BASE_URL}
          target="_blank"
          rel="noopener"
          className="btn btn-sm"
          style={{ background: 'var(--pink)', color: 'white', fontWeight: 600, fontSize: '0.8rem' }}
        >
          <i className="bi bi-box-arrow-up-right me-1"></i>
          e-lactancia.org
        </a>
        {QUICK_SEARCHES.map((term) => (
          <a
            key={term}
            href={`${BASE_URL}/buscar/?q=${encodeURIComponent(term)}`}
            target="_blank"
            rel="noopener"
            className="btn btn-sm"
            style={{
              background: 'white',
              color: 'var(--text-dark)',
              border: '1px solid #e0e0e0',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
            }}
          >
            {term}
          </a>
        ))}
      </div>

      {/* Iframe del sitio */}
      <iframe
        src={BASE_URL}
        title="e-lactancia.org"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}

export default ELactanciaSearch;
