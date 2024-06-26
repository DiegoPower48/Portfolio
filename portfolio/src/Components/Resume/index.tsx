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
          src="https://i.ibb.co/d7nS8gq/foto.jpg"
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
          <p className="card-text">Edad: 30 años</p>
          <p className="card-text">Nacionalidad: Peruano</p>
          <p className="card-text">Email: diego_torres_11@hotmail.com</p>
          <p className="card-text">Celular: +51 986377441</p>
        </div>
      </div>
    </>
  );
}

export default Resume;
