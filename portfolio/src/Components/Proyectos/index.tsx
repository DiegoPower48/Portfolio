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
      nombre: "aplicación vacia",
      imagen: "https://www.svgrepo.com/show/512317/github-142.svg",
      direccion: "https://github.com/DiegoPower48",
      descripcion:
        "Proyecto creado utilizando React, NodeJS, Express, conectado a una api",
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
        </div>
      ))}
    </>
  );
}
export default Proyectos;
