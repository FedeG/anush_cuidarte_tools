import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.hash === '#/';

  return (
    <div className="page-wrapper">
      <Header showBack={!isHome} />
      <main className="main-content">
        <div className="fade-in">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
