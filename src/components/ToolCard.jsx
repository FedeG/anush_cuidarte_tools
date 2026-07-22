import { useNavigate } from 'react-router-dom';

function ToolCard({ tool }) {
  const navigate = useNavigate();

  const colorMap = {
    pink: { bg: 'var(--cream)', iconColor: 'var(--pink)' },
    green: { bg: 'var(--mint)', iconColor: 'var(--green)' },
    sky: { bg: 'var(--sky)', iconColor: '#5A7D9C' },
  };
  const colors = colorMap[tool.color] || { bg: 'var(--cream)', iconColor: 'var(--pink)' };

  const handleClick = () => {
    if (tool.externalUrl) {
      window.open(tool.externalUrl, '_blank', 'noopener');
    } else {
      navigate(`/${tool.slug}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <div
      className="card tool-card h-100"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="card-body d-flex flex-column align-items-center text-center p-4">
        <div
          className="tool-card-icon d-flex align-items-center justify-content-center mb-3"
          style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--radius-md)',
            background: colors.bg,
          }}
        >
          <i
            className={`bi ${tool.icon}`}
            style={{
              fontSize: '2rem',
              color: colors.iconColor,
            }}
          />
        </div>
        <h2 className="tool-card-title h5 mb-2">{tool.title}</h2>
        <p className="tool-card-desc mb-0 text-muted">{tool.description}</p>
      </div>

      <style>{`
        .tool-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1.5px solid transparent;
        }
        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--cream);
        }
        .tool-card:focus-visible {
          outline: 2px solid var(--pink);
          outline-offset: 2px;
        }
        .tool-card-title {
          color: var(--text-dark);
          font-weight: 700;
        }
        .tool-card-desc {
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default ToolCard;
