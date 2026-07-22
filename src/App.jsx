import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GastricCapacity from './pages/GastricCapacity';
import GrowthCharts from './pages/GrowthCharts';
import ELactanciaSearch from './pages/ELactanciaSearch';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gastric-capacity" element={<GastricCapacity />} />
        <Route path="/growth-charts" element={<GrowthCharts />} />
        <Route path="/e-lactancia" element={<ELactanciaSearch />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
