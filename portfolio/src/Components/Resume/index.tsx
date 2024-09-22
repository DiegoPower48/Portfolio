function Resume() {
  return (
    <div className="Resume" id="Resume">
      <Card />
      <Fotos />
    </div>
  );
}

export function Fotos() {
  return (
    <>
      <div className="fotografia">
        <img
          src="https://i.ibb.co/drwFYjN/me.jpg"
          className="foto"
          alt="foto"
        />

        <div className="Footers">
          <div className="imageLink">
            <a href="https://github.com/DiegoPower48" target="_blank">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="card-img"
                alt="github-icon"
              />
            </a>
            <div>Github</div>
          </div>
          <div className="imageLink2">
            <a
              href="https://www.linkedin.com/in/diego-arturo-torres-pacherres-440423242/"
              target="_blank"
            >
              <img
                src="https://www.svgrepo.com/show/473701/linkedin.svg"
                className="card-img"
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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">DIEGO TORRES</h5>
          <h3 className="Titulo-resume">WEB DEVELOPER</h3>
          <br />
          <p className="card-text">
            <b>Age: </b> 31 years old
          </p>
          <p className="card-text">
            <b>Nationality: </b> Peruvian
          </p>
          <p className="card-text">
            <b>Email: </b> diego_torres_11@hotmail.com
          </p>
          <p className="card-text">
            <b>Phone: </b> +51 986377441
          </p>
        </div>
      </div>
    </>
  );
}

export default Resume;
