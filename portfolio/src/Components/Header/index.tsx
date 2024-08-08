import { useState } from "react";

function Header() {
  const [selected, setSelected] = useState("contactos");

  const subir = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <ul className="nav justify-content-end header">
      <li className="nav-item">
        <a
          className={`nav-link contactos-header ${
            selected === "inicio" ? "clicked" : ""
          }`}
          onClick={() => {
            setSelected("inicio");
            subir();
          }}
        >
          Inicio
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link contactos-header ${
            selected === "proyectos" ? "clicked" : ""
          }`}
          href="#Proyectos"
          onClick={() => setSelected("proyectos")}
        >
          Proyectos
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link contactos-header ${
            selected === "tecnologias" ? "clicked" : ""
          }`}
          href="#Tecnologias"
          onClick={() => setSelected("tecnologias")}
        >
          Tecnologias
        </a>
      </li>
      <li className="nav-item ">
        <a
          className={`nav-link contactos-header ${
            selected === "contactos" ? "clicked" : ""
          }`}
          href="#Contactos"
          onClick={() => setSelected("contactos")}
        >
          Contactos
        </a>
      </li>
    </ul>
  );
}

export default Header;
