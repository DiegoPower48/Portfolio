import { ReactNode, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import styles from "./styles.module.css";

interface TecnologiasProps {
  children: ReactNode;
}

function Tecnologias(props: TecnologiasProps) {
  const { children } = props;

  return (
    <div className={styles.tecnologias} id="Tecnologias">
      <h1 className={styles.titulo}>TECHNOLOGIES:</h1>
      <h1>{children}</h1>
    </div>
  );
}

export function Iconos() {
  const [modo, setModo] = useState(styles.Iconos);
  const [agrupar, setAgrupar] = useState("");

  const changeMode = () => {
    if (modo === styles.block || agrupar === styles.agrupar) {
      setModo(styles.Iconos);
      setAgrupar("");
    } else {
      setModo(styles.block);
      setAgrupar(styles.agrupar);
    }
  };

  const Frontend = [
    {
      url: "https://www.svgrepo.com/show/373669/html.svg",
      alt: "Html",
      style: styles.Icono1,
    },
    {
      url: "https://www.svgrepo.com/show/452185/css-3.svg",
      alt: "Css",
      style: styles.Icono2,
    },
    {
      url: "https://www.svgrepo.com/show/349419/javascript.svg",
      alt: "Javascript",
      style: styles.Icono3,
    },
    {
      url: "https://www.svgrepo.com/show/439290/react.svg",
      alt: "React",
      style: styles.Icono4,
    },
    {
      url: "https://www.iconbolt.com/iconsets/teenyicons-outline/nextjs.svg",
      alt: "NextJs",
      style: styles.Icono5,
    },

    {
      url: "https://www.svgrepo.com/show/374146/typescript-official.svg",
      alt: "Typescript",
      style: styles.Icono6,
    },
    {
      url: "https://www.svgrepo.com/show/503536/react.svg",
      alt: "React Native",
      style: styles.Icono7,
    },
  ];

  const Backend = [
    {
      url: "https://www.svgrepo.com/show/452091/python.svg",
      alt: "Python",
      style: styles.Icono8,
    },
    {
      url: "https://www.svgrepo.com/show/354180/php.svg",
      alt: "PHP",
      style: styles.Icono9,
    },

    {
      url: "https://www.svgrepo.com/show/369381/laravel.svg",
      alt: "Laravel",
      style: styles.Icono10,
    },
    {
      url: "https://www.svgrepo.com/show/354107/nestjs.svg",
      alt: "NestJs",
      style: styles.Icono11,
    },
    {
      url: "https://www.svgrepo.com/show/354228/puppeteer.svg",
      alt: "Puppeteer",
      style: styles.Icono12,
    },
  ];
  const Database = [
    {
      url: "https://www.svgrepo.com/show/373595/firebase.svg",
      alt: "Firebase",
      style: styles.Icono13,
    },
    {
      url: "https://www.svgrepo.com/show/303301/postgresql-logo.svg",
      alt: "PostgreSQL",
      style: styles.Icono14,
    },
    {
      url: "https://www.svgrepo.com/show/342053/mysql.svg",
      alt: "MySQL",
      style: styles.Icono15,
    },
    {
      url: "https://www.svgrepo.com/show/331488/mongodb.svg",
      alt: "MongoDB",
      style: styles.Icono16,
    },
  ];
  const Tools = [
    {
      url: "https://www.svgrepo.com/show/353498/bootstrap.svg",
      alt: "Bootstrap",
      style: styles.Icono17,
    },

    {
      url: "https://www.svgrepo.com/show/374118/tailwind.svg",
      alt: "Tailwind",
      style: styles.Icono18,
    },
  ];

  return (
    <>
      <div
        className={`${styles.wrapper}  ${
          modo === styles.Iconos ? styles.mask : ""
        }`}
      >
        <div className={modo === styles.block ? styles.groups : ""}>
          {agrupar === styles.agrupar ? (
            <div className={styles.category}> Frontend </div>
          ) : (
            ""
          )}
          <div className={styles.agrupar}>
            {Frontend.map((element, i) => (
              <span key={i} className={`${element.style} ${modo}`}>
                <img
                  className={styles.Icono}
                  src={element.url}
                  alt={element.alt}
                />
                <div className={styles.nombreIcono}>{element.alt}</div>
              </span>
            ))}
          </div>
        </div>
        <div className={modo === styles.block ? styles.groups : ""}>
          {agrupar === styles.agrupar ? (
            <div className={styles.category}>Backend</div>
          ) : (
            ""
          )}
          <div className={styles.agrupar}>
            {Backend.map((element, i) => (
              <span key={i} className={`${element.style} ${modo}`}>
                <img
                  className={styles.Icono}
                  src={element.url}
                  alt={element.alt}
                />
                <div className={styles.nombreIcono}>{element.alt}</div>
              </span>
            ))}
          </div>
        </div>
        <div className={modo === styles.block ? styles.groups : ""}>
          {agrupar === styles.agrupar ? (
            <div className={styles.category}>Database</div>
          ) : (
            ""
          )}
          <div className={styles.agrupar}>
            {Database.map((element, i) => (
              <span key={i} className={`${element.style} ${modo}`}>
                <img
                  className={styles.Icono}
                  src={element.url}
                  alt={element.alt}
                />
                <div className={styles.nombreIcono}>{element.alt}</div>
              </span>
            ))}
          </div>
        </div>
        <div className={modo === styles.block ? styles.groups : ""}>
          {agrupar === styles.agrupar ? (
            <div className={styles.category}>Tools</div>
          ) : (
            ""
          )}
          <div className={styles.agrupar}>
            {Tools.map((element, i) => (
              <span key={i} className={`${element.style} ${modo}`}>
                <img
                  className={styles.Icono}
                  src={element.url}
                  alt={element.alt}
                />
                <div className={styles.nombreIcono}>{element.alt}</div>
              </span>
            ))}
          </div>
        </div>
      </div>
      {modo === styles.Iconos ? (
        <div className={styles.modo} onClick={changeMode}>
          <SlArrowDown />
        </div>
      ) : (
        <div className={styles.modo} onClick={changeMode}>
          <SlArrowUp />
        </div>
      )}
    </>
  );
}

export default Tecnologias;
