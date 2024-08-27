function Proyectos() {
  return (
    <div className="proyectos" id="Proyectos">
      <h1 className="titulo">{"<Projects/>"}</h1>
      <Trabajos />
    </div>
  );
}

function Trabajos() {
  const proyectos = [
    {
      nombre: "ONLINE CHAT",
      imagen:
        "https://i.ibb.co/HFVhJgC/Captura-de-pantalla-20-7-2024-7168-chatportfolio-up-railway-app.jpg",
      direccion: "https://chatportfolio.up.railway.app/",
      descripcion:
        "Online chat, implement websockets with login and chat rooms, using the MERN stack and JWT security method",
      Tecnologias: [
        "MongoDB",
        "Express",
        "React",
        "NodeJS",
        "Websocket",
        "Vite",
        "JWT",
      ],
    },
    {
      nombre: "STUFFED TOY STORE",
      imagen:
        "https://i.ibb.co/28k3ndT/Opera-Captura-de-pantalla-2024-08-08-014230-localhost.png",
      direccion: "https://teddy-store.vercel.app",
      descripcion:
        "Online stuffed toy store with registration, login, and shopping cart.",
      Tecnologias: [
        "MongoDB",
        "Express",
        "React",
        "NodeJS",
        "React",
        "Vite",
        "JWT",
      ],
    },
  ];

  return (
    <>
      <div className="listaProyectos">
        {proyectos.map((element, index) => (
          <div className="cajaProyectos" key={index}>
            <a href={element.direccion}>
              <p className="tituloProyectos">{element.nombre}</p>
            </a>

            <a href={element.direccion} target="_blank" className="cajaimagen">
              <img
                src={element.imagen}
                className="imagenProyectos"
                alt="github-icon"
              />
            </a>
            <p className="descripcionProyecto">{element.descripcion}</p>
            <div className="descripcion-tecnologias">
              <br />
              {element.Tecnologias.map((element, index) => (
                <span className="descripcion-elementos" key={index}>
                  {element}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Proyectos;
