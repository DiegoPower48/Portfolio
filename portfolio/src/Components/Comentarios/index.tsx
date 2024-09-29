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
          "https://portfolio-c4l9.onrender.com/correo",
          informacionFormulario
        ),
        {
          loading: "⏳⏳  ENVIANDO COMENTARIO......",
          success: <b>"GRACIAS POR EL COMENTARIO!!!!🚀"</b>,
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
        <h1 className="titulo">CONTACT ME:</h1>
      </fieldset>
      <fieldset className="commentsField">
        <input
          id="nombre"
          type="text"
          className="formulario"
          {...register("nombre", { required: true })}
          required
        />
        <div className="commentsLabel">Name</div>
      </fieldset>

      <fieldset className="commentsField">
        <input
          id="correo"
          className="formulario"
          {...register("correo", {
            required: { value: true, message: "ingresa correo" },
          })}
          required
        />
        <div className="commentsLabel">Email</div>
      </fieldset>

      <fieldset className="commentsTextArea">
        <textarea
          id="comentarios"
          className="textarea"
          required
          {...register("comentario", { required: true })}
        ></textarea>
        <div className="commentsLabel">
          Write your questions and comments here please
        </div>
      </fieldset>
      <Boton onClick={handleSubmit(Datos)} />
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
      Send
    </button>
  );
}

export default Comentarios;
