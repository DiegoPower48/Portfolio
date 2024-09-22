import { ReactNode } from "react";

interface TecnologiasProps {
  children: ReactNode;
}

function Tecnologias(props: TecnologiasProps) {
  const { children } = props;
  return (
    <div className="tecnologias" id="Tecnologias">
      <h1 className="titulo">TECHNOLOGIES:</h1>
      <h1 className="wrapper">{children}</h1>
    </div>
  );
}

export function Iconos() {
  return (
    <>
      <span className="Icono1 Iconos">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/373669/html.svg"
          alt="html"
        />
        <div className="nombreIcono">Html</div>
      </span>
      <span className="Iconos Icono2">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/452185/css-3.svg"
          alt="css"
        />
        <div className="nombreIcono">Css</div>
      </span>
      <span className="Iconos Icono3">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/353498/bootstrap.svg"
          alt="bootstrap-logo"
        />
        <div className="nombreIcono">Bootstrap</div>
      </span>
      <span className="Iconos Icono4">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/349419/javascript.svg"
          alt="javascript-logo"
        />
        <div className="nombreIcono">Javascript</div>
      </span>
      <span className="Iconos Icono8">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/374146/typescript-official.svg"
          alt="typescript-logo"
        />
        <div className="nombreIcono">Typescript</div>
      </span>
      <span className="Iconos Icono5">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/439290/react.svg"
          alt="react-logo"
        />
        <div className="nombreIcono">React</div>
      </span>
      <span className="Iconos Icono7">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/452156/angular.svg"
          alt="angular-logo"
        />
        <div className="nombreIcono">Angular</div>
      </span>
      <span className="Iconos Icono6">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/452091/python.svg"
          alt="python-logo"
        />
        <div className="nombreIcono">Python</div>
      </span>
      <span className="Iconos Icono9">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/331761/sql-database-sql-azure.svg"
          alt="sql-logo"
        />
        <div className="nombreIcono">SQL</div>
      </span>
      <span className="Iconos Icono10">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/331488/mongodb.svg"
          alt="mongodb-logo"
        />
        <div className="nombreIcono">MongoDB</div>
      </span>
      <span className="Iconos Icono11">
        <img
          className="Icono"
          src="https://www.svgrepo.com/show/439238/nodejs.svg"
          alt="mongodb-logo"
        />
        <div className="nombreIcono">NodeJs</div>
      </span>
    </>
  );
}

export default Tecnologias;
