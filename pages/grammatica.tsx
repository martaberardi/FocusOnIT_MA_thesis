import React, {FC} from 'react';

const Grammatica: FC<GrammaticaProps> = () => (
  <div className="flex-center">
    {Array.from({length: 11}).map(
      (_, imageName) => <img className="grammar-slide" src={`grammatica/${imageName + 1}.jpg`} key={imageName}/>
    )}
  </div>
);

export default Grammatica;

interface GrammaticaProps {
}
