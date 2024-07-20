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
          src="https://i.ibb.co/9Vd1v22/foto.jpg"
          className="foto"
          alt="foto"
        />
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
            <b>Edad: </b> 30 años
          </p>
          <p className="card-text">
            <b>Nacionalidad: </b> Peruano
          </p>
          <p className="card-text">
            <b>Email: </b> diego_torres_11@hotmail.com
          </p>
          <p className="card-text">
            <b>Celular: </b> +51 986377441
          </p>
        </div>
      </div>
    </>
  );
}

export default Resume;
