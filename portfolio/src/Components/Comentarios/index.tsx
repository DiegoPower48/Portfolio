import axios from "axios";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

function Comentarios() {
  //HOOK DE FORMS

  const { register, watch, handleSubmit, reset } = useForm();

  const informacionFormulario = watch();

  const Datos = () => {
    toast
      .promise(
        axios.post(
          "https://backendportfolio-one.vercel.app/correo",
          informacionFormulario
        ),
        {
          loading: "⏳⏳  ENVIANDO COMENTARIO......",
          success: <b>"GRACIAS POR EL COMENTARIO!!!!🚀🚀🚀"</b>,
          error: <b>NO SE PUDO GUARDAR</b>,
        }
      )
      .then((response) => {
        reset();
        console.log(response);
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
          {...register("nombre", { required: true })}
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
          {...register("correo", { required: true })}
        />
      </fieldset>
      <fieldset>
        <label>Comentarios:</label>

        <textarea
          required
          placeholder="Write your questions and comments here please"
          className="textarea"
          {...register("comentario", { required: true })}
        ></textarea>

        <Boton onClick={handleSubmit(Datos)} />
      </fieldset>
      <Toaster />
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
