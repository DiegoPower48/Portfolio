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

  return (
    <>
      <div
        className={`${styles.wrapper}  ${
          modo === styles.Iconos ? styles.mask : ""
        }`}
      >
        {agrupar === styles.agrupar ? (
          <div className={styles.category}>-= Frontend =-</div>
        ) : (
          ""
        )}
        <div className={styles.agrupar}>
          <span className={`${styles.Icono1} ${modo}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/373669/html.svg"
              alt="html"
            />
            <div className={styles.nombreIcono}>Html</div>
          </span>
          <span className={`${modo} ${styles.Icono5}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/439290/react.svg"
              alt="react-logo"
            />
            <div className={styles.nombreIcono}>React</div>
          </span>
          <span className={`${modo}  ${styles.Icono7}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/452156/angular.svg"
              alt="angular-logo"
            />
            <div className={styles.nombreIcono}>Angular</div>
          </span>
          <span className={`${modo} ${styles.Icono2}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/452185/css-3.svg"
              alt="css"
            />
            <div className={styles.nombreIcono}>Css</div>
          </span>
        </div>
        {agrupar === styles.agrupar ? (
          <div className={styles.category}>Backend</div>
        ) : (
          ""
        )}
        <div className={styles.agrupar}>
          <span className={`${modo} ${styles.Icono6}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/452091/python.svg"
              alt="python-logo"
            />
            <div className={styles.nombreIcono}>Python</div>
          </span>

          <span className={`${modo} ${styles.Icono4}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/349419/javascript.svg"
              alt="javascript-logo"
            />
            <div className={styles.nombreIcono}>Javascript</div>
          </span>
          <span className={`${modo}  ${styles.Icono8}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/374146/typescript-official.svg"
              alt="typescript-logo"
            />
            <div className={styles.nombreIcono}>Typescript</div>
          </span>
        </div>
        {agrupar === styles.agrupar ? (
          <div className={styles.category}>Database</div>
        ) : (
          ""
        )}
        <div className={styles.agrupar}>
          <span className={`${modo}  ${styles.Icono9}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/331761/sql-database-sql-azure.svg"
              alt="sql-logo"
            />
            <div className={styles.nombreIcono}>SQL</div>
          </span>
          <span className={`${modo} ${styles.Icono10}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/331488/mongodb.svg"
              alt="mongodb-logo"
            />
            <div className={styles.nombreIcono}>MongoDB</div>
          </span>
        </div>
        {agrupar === styles.agrupar ? (
          <div className={styles.category}>Tools</div>
        ) : (
          ""
        )}
        <div className={styles.agrupar}>
          <span className={`${modo}  ${styles.Icono3}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/353498/bootstrap.svg"
              alt="bootstrap-logo"
            />
            <div className={styles.nombreIcono}>Bootstrap</div>
          </span>

          <span className={`${modo}  ${styles.Icono11}`}>
            <img
              className={styles.Icono}
              src="https://www.svgrepo.com/show/439238/nodejs.svg"
              alt="mongodb-logo"
            />
            <div className={styles.nombreIcono}>NodeJs</div>
          </span>
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
