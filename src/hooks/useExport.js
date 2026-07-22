import { useCallback } from 'react';
import html2canvas from 'html2canvas';

function useExport() {
  const exportToPng = useCallback(async (element, filename = 'export') => {
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FDF8F5',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  }, []);

  return { exportToPng };
}

export default useExport;
