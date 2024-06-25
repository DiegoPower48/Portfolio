function Header() {
  return (
    <ul className="nav justify-content-end header">
      <li className="nav-item">
        <a className="nav-link " href="#Resume">
          Inicio
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#Proyectos">
          Proyectos
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#Tecnologias">
          Tecnologias
        </a>
      </li>
      <li className="nav-item ">
        <a className="nav-link contactos-header" href="#Contactos">
          Contactos
        </a>
      </li>
    </ul>
  );
}

export default Header;
