import { useState, useMemo } from 'react';

const KG_FACTOR = 1000;

function useGastricCalc() {
  const [pesoNacG, setPesoNacG] = useState('');
  const [pesoActualG, setPesoActualG] = useState('');
  const [modoML, setModoML] = useState('150'); // '150' | '200'
  const [tomasFormula, setTomasFormula] = useState('');
  const [mlPorToma, setMlPorToma] = useState('');

  const resultados = useMemo(() => {
    const pNac = parseFloat(pesoNacG);
    const pActualG = parseFloat(pesoActualG);
    const tomas = parseFloat(tomasFormula) || 0;
    const mlToma = parseFloat(mlPorToma) || 0;
    const factor = parseInt(modoML, 10);

    // Validación mínima
    if (!pActualG || pActualG <= 0) return null;

    const pActualKg = pActualG / KG_FACTOR;

    // % de pérdida de peso (solo si hay ambos pesos)
    let perdidaPeso = null;
    if (pNac > 0 && pActualG > 0 && pActualG < pNac) {
      perdidaPeso = ((pNac - pActualG) / pNac) * 100;
    }

    // Capacidades gástricas
    const cap150 = pActualKg * 150;
    const cap200 = pActualKg * 200;
    const capPromedio = (cap150 + cap200) / 2;

    // Capacidad según modo seleccionado para la distribución
    const capacidadRef = factor === 150 ? cap150 : cap200;

    // Distribución fórmula / teta
    const mlFormulaDia = tomas * mlToma;
    const mlTetaDia = Math.max(0, capacidadRef - mlFormulaDia);
    const pctFormula = capacidadRef > 0 ? (mlFormulaDia / capacidadRef) * 100 : 0;
    const pctTeta = capacidadRef > 0 ? (mlTetaDia / capacidadRef) * 100 : 0;

    return {
      pesoNac: pNac,
      pesoActualG: pActualG,
      pesoActualKg: pActualKg,
      perdidaPeso: perdidaPeso !== null ? perdidaPeso : null,
      perdidaPesoColor: perdidaPeso !== null
        ? perdidaPeso < 7 ? 'var(--success)'
          : perdidaPeso < 10 ? 'var(--warning)'
          : 'var(--danger)'
        : null,
      cap150,
      cap200,
      capPromedio,
      capacidadRef,
      modoML: factor,
      mlFormulaDia,
      mlTetaDia,
      pctFormula,
      pctTeta,
      tomasFormula: tomas,
      mlPorToma: mlToma,
    };
  }, [pesoNacG, pesoActualG, modoML, tomasFormula, mlPorToma]);

  const reset = () => {
    setPesoNacG('');
    setPesoActualG('');
    setModoML('150');
    setTomasFormula('');
    setMlPorToma('');
  };

  return {
    // State
    pesoNacG, setPesoNacG,
    pesoActualG, setPesoActualG,
    modoML, setModoML,
    tomasFormula, setTomasFormula,
    mlPorToma, setMlPorToma,
    // Results
    resultados,
    // Actions
    reset,
  };
}

export default useGastricCalc;
