import Header from "./Components/Header";
import Resume from "./Components/Resume";
import Detalle from "./Components/detalle";
import Proyectos from "./Components/Proyectos";
import Tecnologias, { Iconos } from "./Components/Tecnologias";
import Comentarios from "./Components/Comentarios";
import Footers from "./Components/Footers";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Header />
      <Resume />
      <Detalle />
      <Proyectos />
      <Tecnologias>
        <Iconos />
      </Tecnologias>
      <Comentarios />
      <Footers />
      <Analytics />
    </>
  );
}

export default App;
