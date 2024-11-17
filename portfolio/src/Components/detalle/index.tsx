import styles from "./styles.module.css";

function detalle() {
  return (
    <div className={styles.detalle} id="About">
      <span className={styles.titulo}> ABOUT ME: </span>
      <br />
      <p className={styles.introduccion}>
        I am a dedicated web and mobile developer with a focus on building
        high-performance applications that deliver seamless user experiences. My
        expertise lies in leveraging the React and React Native libraries to
        create responsive, fast-loading, and intuitive applications tailored for
        both web and mobile platforms. By utilizing a diverse set of modern
        tools and frameworks, I optimize each project to reduce development time
        without compromising on quality. I am committed to crafting scalable
        solutions that meet the demands of today’s users while ensuring
        adaptability for future growth.
      </p>
    </div>
  );
}

export default detalle;
