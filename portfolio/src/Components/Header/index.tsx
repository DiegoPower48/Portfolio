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
          About
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
          Projects
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
          Technologies
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
          Comments
        </a>
      </li>
    </ul>
  );
}

export default Header;
