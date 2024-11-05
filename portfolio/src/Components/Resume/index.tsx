import styles from "./styles.module.css";

function Resume() {
  return (
    <div className={styles.Resume} id="Resume">
      <Card />
      <Fotos />
    </div>
  );
}

export function Fotos() {
  return (
    <>
      <div className={styles.fotografia}>
        <img
          src="https://i.ibb.co/drwFYjN/me.jpg"
          className={styles.foto}
          alt="foto"
        />

        <div className={styles.Footers}>
          <div className={styles.imageLink}>
            <a href="https://github.com/DiegoPower48" target="_blank">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className={styles.cardimg}
                alt="github-icon"
              />
            </a>
            <div>Github</div>
          </div>
          <div className={styles.imageLink2}>
            <a
              href="https://www.linkedin.com/in/diego-arturo-torres-pacherres-440423242/"
              target="_blank"
            >
              <img
                src="https://www.svgrepo.com/show/473701/linkedin.svg"
                className={styles.cardimg}
                alt="linkedin-icon"
              />
            </a>
            <div>linkedin</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Card() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardbody}>
          <h5 className={styles.cardtitle}>DIEGO TORRES</h5>
          <h3 className={styles.Titulo}>WEB DEVELOPER</h3>
          <br />
          <p className={styles.cardtext}>
            <b>Age: </b> 31 years old
          </p>
          <p className={styles.cardtext}>
            <b>Nationality: </b> Peruvian
          </p>
          <p className={styles.cardtext}>
            <b>Email: </b> diego_torres_11@hotmail.com
          </p>
          <p className={styles.cardtext}>
            <b>Phone: </b> +51 986377441
          </p>
        </div>
      </div>
    </>
  );
}

export default Resume;
