// src/components/Agenda.js

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configura o localizador de data/hora para usar o Moment.js
const localizer = momentLocalizer(moment);

const Agenda = () => {
  const events = [
    {
      id: 0,
      title: 'Reunião de equipe',
      start: new Date(2024, 2, 15, 9, 0), // ano, mês (Janeiro é 0, Fevereiro é 1, e assim por diante), dia, hora, minuto
      end: new Date(2024, 2, 15, 10, 0),
    },
    // Adicione mais eventos aqui
  ];

  return (
    <div className="agenda">
      <h1>Agenda</h1>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ maxWidth: 800, margin: '0 auto' }}
        />
      </div>
    </div>
  );
}

export default Agenda;