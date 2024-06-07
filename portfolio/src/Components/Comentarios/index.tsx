import axios from "axios";
import { useState } from "react";

interface form {
  nombre: string;
  correo: string;
  comentario: string;
}

function Comentarios() {
  // const Datos = () => {
  //   axios.get("http://localhost:3900/solicitudes").then((response) => {
  //     const datos = response.data;
  //     const informacion = datos.solicitud;
  //     const solicitado = informacion[1].nombre;
  //     return solicitado;
  //   });
  // };

  const [state, setState] = useState<form[]>([]);

  const manejador = (e: React.FormEvent) => {
    e.preventDefault();
    alert("GRACIAS POR COMENTAR");
  };

  const manejadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
      [e.currentTarget.name]: e.currentTarget.value,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <form
      className="comentarios"
      id="Contactos"
      method="GET"
      onSubmit={manejador}
    >
      <fieldset className="contactame">
        <h1>
          <label>Contactame</label>
        </h1>
      </fieldset>
      <fieldset>
        <label>Nombre:</label>
        <input
          placeholder="Name"
          name="nombre"
          type="text"
          className="formulario"
          id="numero"
          onChange={manejadorChange}
          required
        />
      </fieldset>
      <fieldset>
        <label> Email: </label>
        <input
          required
          placeholder="Email"
          name="correo"
          type="text"
          className="formulario"
          onChange={manejadorChange}
        />
      </fieldset>
      <fieldset>
        <label>Comentarios:</label>

        <input
          type="textarea"
          required
          placeholder="Write your questions and comments here please"
          className="textareas"
          name="comentario"
          onChange={manejadorChange}
        ></input>

        <button type="submit" className="btn btn-warning" value="Enviar">
          Enviar
        </button>
      </fieldset>
    </form>
  );
}

export default Comentarios;
