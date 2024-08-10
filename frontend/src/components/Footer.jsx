
function Footer() {
  return (
    <footer className="w-screen p-4 footer footer-center bg-base-300 text-base-content">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
