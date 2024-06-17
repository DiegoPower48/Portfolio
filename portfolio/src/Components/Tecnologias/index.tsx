import { ReactNode } from "react";

interface TecnologiasProps {
  children: ReactNode;
}

function Tecnologias(props: TecnologiasProps) {
  const { children } = props;
  return (
    <div className="tecnologias" id="Tecnologias">
      <h1>Tecnologias:</h1>
      <h1 className="wrapper">{children}</h1>
    </div>
  );
}

export function Iconos() {
  return (
    <>
      <img
        className="Iconos Icono1"
        src="https://www.svgrepo.com/show/373669/html.svg"
        alt="html"
      />
      <img
        className="Iconos Icono2"
        src="https://www.svgrepo.com/show/452185/css-3.svg"
      />
      <img
        className="Iconos Icono3"
        src="https://www.svgrepo.com/show/353498/bootstrap.svg"
        alt="bootstrap-logo"
      />

      <img
        className="Iconos Icono4"
        src="https://www.svgrepo.com/show/349419/javascript.svg"
        alt="javascript-logo"
      />
      <img
        className="Iconos Icono5"
        src="https://www.svgrepo.com/show/439290/react.svg"
        alt="react-logo"
      />
      <img
        className="Iconos Icono6"
        src="https://www.svgrepo.com/show/452091/python.svg"
        alt="python-logo"
      />
      <img
        className="Iconos Icono7"
        src="https://www.svgrepo.com/show/452156/angular.svg"
        alt="angular-logo"
      />
      <img
        className="Iconos Icono8"
        src="https://www.svgrepo.com/show/374146/typescript-official.svg"
        alt="typescript-logo"
      />
      <img
        className="Iconos Icono9"
        src="https://www.svgrepo.com/show/331761/sql-database-sql-azure.svg"
        alt="sql-logo"
      />
      <img
        className="Iconos Icono10"
        src="https://www.svgrepo.com/show/331488/mongodb.svg"
        alt="mongodb-logo"
      />
    </>
  );
}

export default Tecnologias;
