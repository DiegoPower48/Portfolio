function Proyectos() {
  return (
    <div className="proyectos" id="Proyectos">
      <h1 className="titulo">{"<Proyectos/>"}:</h1>

      <Trabajos />
    </div>
  );
}

function Trabajos() {
  const proyectos = [
    {
      nombre: "CHAT ONLINE",
      imagen: "https://i.ibb.co/p2WFM8j/image.png",
      direccion: "https://chatportfolio.vercel.app/",
      descripcion:
        "Chat en linea, implementando websockets con login y salas de chat",
      Tecnologias: ["Websocket", "NodeJS", "React", "Vite", "MongoDB"],
    },
    {
      nombre: "CHAT ONLINE",
      imagen: "https://i.ibb.co/p2WFM8j/image.png",
      direccion: "https://chatportfolio.vercel.app/",
      descripcion:
        "Chat en linea, implementando websockets con login y salas de chat",
      Tecnologias: ["Websocket", "NodeJS", "React", "Vite", "MongoDB"],
    },
  ];

  return (
    <>
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
            {element.Tecnologias.map((element, index) => (
              <span className="descripcion-elementos" key={index}>
                {element}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
export default Proyectos;
