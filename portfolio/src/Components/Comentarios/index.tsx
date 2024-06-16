import axios from "axios";
import { useForm } from "react-hook-form";

function Comentarios() {
  //HOOK DE FORMS

  const { register, watch, handleSubmit, reset } = useForm();

  const informacionFormulario = watch();

  const Datos = () => {
    axios
      .post("http://localhost:3000/correo", informacionFormulario)
      .then((response) => {
        reset();
        console.log(response);
        alert("Gracias por el mensaje, la web esta en desarrollo aun :)");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="comentarios" id="Contactos" method="POST">
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

        <Boton onClick={handleSubmit(Datos)} />
      </fieldset>
    </form>
  );
}

interface BotonProps {
  onClick: () => void;
}

function Boton({ onClick }: BotonProps) {
  return (
    <button type="submit" className="btn btn-warning" onClick={onClick}>
      Enviar
    </button>
  );
}

export default Comentarios;
