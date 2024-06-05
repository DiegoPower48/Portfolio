import axios from "axios";

const Datos = () => {
  axios.get("http://localhost:3900/solicitudes").then((response) => {
    const datos = response.data;
    const informacion = datos.solicitud;
    const solicitado = informacion[1].nombre;
    return solicitado;
  });
};
6;

function Comentarios() {
  return (
    <form
      className="comentarios"
      id="Contactos"
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        alert("GRACIAS POR COMENTAR");
      }}
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
          name="Nombre"
          type="text"
          className="formulario"
          id="numero"
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
        />
      </fieldset>
      <fieldset>
        <label>Comentarios:</label>

        <textarea
          required
          placeholder="Write your questions and comments here please"
          className="textareas"
          name="comentarios"
        ></textarea>

        <button
          type="submit"
          className="btn btn-warning"
          value="Enviar"
          onClick={Datos}
        >
          Enviar
        </button>
      </fieldset>
    </form>
  );
}

export default Comentarios;
