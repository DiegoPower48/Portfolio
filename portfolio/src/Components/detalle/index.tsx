import styles from "./styles.module.css";

function detalle() {
  return (
    <div className={styles.detalle} id="About">
      <span className={styles.titulo}> ABOUT ME: </span>
      <br />
      <p className={styles.introduccion}>
        I am a Web Developer with a deep interest in improving tools for
        everyone's use. I enjoy learning about different technologies and
        staying updated with new features. I have various hobbies that keep me
        learning and honing my skills.
      </p>
    </div>
  );
}

export default detalle;
