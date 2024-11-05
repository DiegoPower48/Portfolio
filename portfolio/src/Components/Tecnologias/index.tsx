import { ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";

interface TecnologiasProps {
  children: ReactNode;
}

function Tecnologias(props: TecnologiasProps) {
  const [modo, setModo] = useState(styles.wrapper);
  // useEffect(() => setModo(styles.titulo), []);
  const { children } = props;

  const changeMode = () => setModo(styles.block);

  return (
    <div className={styles.tecnologias} id="Tecnologias">
      <div className={styles.titulos}>
        <h1 className={styles.titulo}>TECHNOLOGIES:</h1>
        <input className={styles.modo} type="button" onClick={changeMode} />
      </div>
      <h1 className={modo}>{children}</h1>
    </div>
  );
}

export function Iconos() {
  return (
    <>
      <span className={`${styles.Icono1} ${styles.Iconos}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/373669/html.svg"
          alt="html"
        />
        <div className={styles.nombreIcono}>Html</div>
      </span>
      <span className={`${styles.Iconos} ${styles.Icono2}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/452185/css-3.svg"
          alt="css"
        />
        <div className={styles.nombreIcono}>Css</div>
      </span>
      <span className={`${styles.Iconos}  ${styles.Icono3}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/353498/bootstrap.svg"
          alt="bootstrap-logo"
        />
        <div className={styles.nombreIcono}>Bootstrap</div>
      </span>
      <span className={`${styles.Iconos} ${styles.Icono4}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/349419/javascript.svg"
          alt="javascript-logo"
        />
        <div className={styles.nombreIcono}>Javascript</div>
      </span>
      <span className={`${styles.Iconos}  ${styles.Icono8}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/374146/typescript-official.svg"
          alt="typescript-logo"
        />
        <div className={styles.nombreIcono}>Typescript</div>
      </span>
      <span className={`${styles.Iconos} ${styles.Icono5}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/439290/react.svg"
          alt="react-logo"
        />
        <div className={styles.nombreIcono}>React</div>
      </span>
      <span className={`${styles.Iconos}  ${styles.Icono7}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/452156/angular.svg"
          alt="angular-logo"
        />
        <div className={styles.nombreIcono}>Angular</div>
      </span>
      <span className={`${styles.Iconos} ${styles.Icono6}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/452091/python.svg"
          alt="python-logo"
        />
        <div className={styles.nombreIcono}>Python</div>
      </span>
      <span className={`${styles.Iconos}  ${styles.Icono9}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/331761/sql-database-sql-azure.svg"
          alt="sql-logo"
        />
        <div className={styles.nombreIcono}>SQL</div>
      </span>
      <span className={`${styles.Iconos} ${styles.Icono10}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/331488/mongodb.svg"
          alt="mongodb-logo"
        />
        <div className={styles.nombreIcono}>MongoDB</div>
      </span>
      <span className={`${styles.Iconos}  ${styles.Icono11}`}>
        <img
          className={styles.Icono}
          src="https://www.svgrepo.com/show/439238/nodejs.svg"
          alt="mongodb-logo"
        />
        <div className={styles.nombreIcono}>NodeJs</div>
      </span>
    </>
  );
}

export default Tecnologias;
