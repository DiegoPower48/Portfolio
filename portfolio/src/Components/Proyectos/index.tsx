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
      tecnologias: [
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
      tecnologias: [
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
            <Products
              nombre={element.nombre}
              imagen={element.imagen}
              direccion={element.direccion}
              descripcion={element.descripcion}
              tecnologias={element.tecnologias}
            />
          </div>
        ))}
      </div>
    </>
  );
}

interface Props {
  nombre: string;
  imagen: string;
  direccion: string;
  descripcion: string;
  tecnologias: string[];
}

function Products(props: Props) {
  const { nombre, imagen, direccion, descripcion, tecnologias } = props;

  return (
    <a style={{ textDecoration: "none" }} href={direccion}>
      <div className={styles.cards}>
        <div className={styles.page1}>
          <div>
            <p className={styles.tituloProyectos}>{nombre}</p>
          </div>

          <div>
            <div className={styles.cajaimagen}>
              <img
                src={imagen}
                className={styles.imagenProyectos}
                alt="github-icon"
              />
            </div>
          </div>
        </div>
        <div className={styles.page2}>
          <p className={styles.descripcionProyecto}>{descripcion}</p>
          <div className={styles.descripcionTecnologias}>
            {tecnologias.map((element, index) => (
              <span className={styles.descripcionElementos} key={index}>
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default Proyectos;
