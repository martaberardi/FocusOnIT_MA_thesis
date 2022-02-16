import React, { FC } from 'react';
import { CardMedia } from '@mui/material';
import { Topic } from '../../../models';

const ExerciseMedia: FC<ExerciseMediaProps> = function ({ topic }) {
  switch (topic) {
    case Topic.DOTTORE:
      return <CardMedia className="picture" component="img" src="/dottore.jpeg" />;
    case Topic.SPESA:
      return <CardMedia className="picture" component="img" src="/cibo.jpeg" />;
    case Topic.DESCRIZIONE_FISICA:
      return <CardMedia className="picture" component="img" src="/descrizione_fisica.jpg" />;
    case Topic.EMOZIONI_E_SALUTE:
      return <CardMedia className="picture" component="img" src="/emozioni.jpg" />;
    case Topic.MERCATO:
      return <CardMedia className="picture" component="img" src="/mercato.jpeg" />;
    case Topic.TEMPO_LIBERO:
      return <CardMedia className="picture" component="img" src="/tempo_libero.jpg" />;
    case Topic.LAVORO:
      return <CardMedia className="picture" component="img" src="/lavoro.jpg" />;
    case Topic.APPUNTAMENTO:
      return <CardMedia className="picture" component="img" src="/appuntamento.jpg" />;
    case Topic.INFORMAZIONI_PERSONALI:
      return <CardMedia className="picture" component="img" src="/info_personali.png" />;
    case Topic.CIBO:
      return <CardMedia className="picture" component="img" src="/cibo.jpeg" />;
    case Topic.MEZZI:
      return <CardMedia className="picture" component="img" src="/mezzi.jpeg" />;
    default: {
      return topic;
    }
  }
};

export default ExerciseMedia;

interface ExerciseMediaProps {
  topic: Topic
}
