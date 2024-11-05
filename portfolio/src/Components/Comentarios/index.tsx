import styles from "./styles.module.css";

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
    <form className={styles.comentarios} id="Contactos" method="POST">
      <fieldset className={styles.contactame}>
        <h1 className={styles.titulo}>CONTACT ME:</h1>
      </fieldset>
      <fieldset className={styles.commentsField}>
        <input
          id="nombre"
          type="text"
          className={styles.formulario}
          {...register("nombre", { required: true })}
          required
        />
        <div className={styles.commentsLabel}>Name</div>
      </fieldset>

      <fieldset className={styles.commentsField}>
        <input
          id="correo"
          className={styles.formulario}
          {...register("correo", {
            required: { value: true, message: "ingresa correo" },
          })}
          required
        />
        <div className={styles.commentsLabel}>Email</div>
      </fieldset>

      <fieldset className={styles.commentsTextArea}>
        <textarea
          id="comentarios"
          className={styles.textarea}
          required
          {...register("comentario", { required: true })}
        ></textarea>
        <div className={styles.commentsLabel}>
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
    <button type="submit" className={styles.btn} onClick={onClick}>
      Send
    </button>
  );
}

export default Comentarios;
