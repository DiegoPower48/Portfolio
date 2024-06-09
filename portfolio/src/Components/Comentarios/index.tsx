import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Comentarios() {
  //HOOK DE FORMS
  const { register, handleSubmit, watch } = useForm();

  const datosObtenidos = watch();

  const Datos = () => {
    axios
      .post("https://portfolio-8az3.onrender.com/correo", datosObtenidos)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      className="comentarios"
      id="Contactos"
      method="POST"
      onSubmit={handleSubmit((data) => console.log(data))}
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
          type="text"
          className="formulario"
          required
          {...register("nombre")}
        />
      </fieldset>
      <fieldset>
        <label> Email: </label>
        <input
          required
          placeholder="Email"
          id="email"
          type="text"
          className="formulario"
          {...register("correo")}
        />
      </fieldset>
      <fieldset>
        <label>Comentarios:</label>

        <textarea
          required
          placeholder="Write your questions and comments here please"
          className="textarea"
          {...register("comentario")}
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
