import React, {FC} from 'react';

const Grammatica: FC<GrammaticaProps> = () => (
  <div className="flex-center">
    <div style={{maxWidth: 800, textAlign: "center", margin: "auto"}}>
      <p>
        Consulta questa pagina per schede informative su:
      </p>
      <p>articoli, nomi, aggettivi e
        verbi.
      </p>
      <p>
        Studiare
        la grammatica non è mai stato più intuitivo!
      </p>
    </div>
    {Array.from({length: 11}).map(
      (_, imageName) => <img className="grammar-slide" src={`grammatica/${imageName + 1}.jpg`}
                             key={imageName}/>
    )}
  </div>
);

export default Grammatica;

interface GrammaticaProps {
}
