import tools from '../data/tools';
import ToolCard from '../components/ToolCard';

function Home() {
  return (
    <div className="container" style={{ maxWidth: 'var(--max-width)' }}>
      {/* Hero */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--text-dark)' }}>
            Herramientas para tu maternidad
          </h1>
          <p className="lead text-muted" style={{ fontSize: '1.1rem' }}>
            Calculadoras y recursos diseñados para acompañarte en la crianza de tu bebé
          </p>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="row g-4 justify-content-center">
        {tools.map((tool) => (
          <div key={tool.slug} className="col-12 col-sm-6 col-lg-4">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
