import { Link } from 'react-router-dom';

function Header({ showBack = false }) {
  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-3">
          {showBack && (
            <Link
              to="/"
              className="btn-back"
              aria-label="Volver al inicio"
            >
              <i className="bi bi-arrow-left"></i>
            </Link>
          )}
          <Link to="/" className="text-decoration-none">
            <h1 className="header-logo m-0">
              <span className="header-logo-anush">Anush</span>{' '}
              <span className="header-logo-tools">Tools</span>
            </h1>
          </Link>
        </div>
      </div>

      <style>{`
        .header {
          background: var(--cream);
          border-bottom-left-radius: var(--radius-xl);
          border-bottom-right-radius: var(--radius-xl);
          box-shadow: 0 8px 32px rgba(201, 123, 132, 0.12);
        }
        .header-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .header-logo-anush {
          color: var(--pink);
        }
        .header-logo-tools {
          color: var(--text-dark);
          font-weight: 400;
        }
        .btn-back {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--pink);
          border-radius: var(--radius-full);
          color: var(--pink);
          font-size: 1.2rem;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .btn-back:hover {
          background: var(--pink);
          color: white;
        }
      `}</style>
    </header>
  );
}

export default Header;
