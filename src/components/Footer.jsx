function Footer() {
  return (
    <footer className="footer">
      <div className="container py-4 text-center">
        <p className="footer-text m-0">
          &copy; {new Date().getFullYear()} Anush Cuidarte — Herramientas para maternidad, lactancia y crianza
        </p>
      </div>

      <style>{`
        .footer {
          background: var(--footer-bg);
          margin-top: auto;
        }
        .footer-text {
          color: var(--text-footer);
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
