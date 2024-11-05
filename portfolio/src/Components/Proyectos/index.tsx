import styles from "./styles.module.css";

function Proyectos() {
  return (
    <div className={styles.proyectos} id="Proyectos">
      <h1 className={styles.titulo}>PROYECTS:</h1>
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
      direccion: "https://chatportfolio.vercel.app",
      descripcion:
        "Online chat, implement websockets with login and chat rooms, JWT security method.",
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
      <div className={styles.listaProyectos}>
        {proyectos.map((element, index) => (
          <div className={styles.cajaProyectos} key={index}>
            <a href={element.direccion}>
              <p className={styles.tituloProyectos}>{element.nombre}</p>
            </a>

            <a
              href={element.direccion}
              target="_blank"
              className={styles.cajaimagen}
            >
              <img
                src={element.imagen}
                className={styles.imagenProyectos}
                alt="github-icon"
              />
            </a>
            <p className={styles.descripcionProyecto}>{element.descripcion}</p>
            <div className={styles.descripciontecnologias}>
              {element.Tecnologias.map((element, index) => (
                <span className={styles.descripcionelementos} key={index}>
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
