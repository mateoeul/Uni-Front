import React from 'react';

const EventsTable = () => (
  <section className="card">
    <h4>Próximos eventos</h4>
    <div className="events-table-wrapper">
      <table className="events-table">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Fecha</th>
            <th>Modalidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Open Day</td>
            <td>15 Sep 2025, 10:00</td>
            <td>Presencial (Campus Principal)</td>
          </tr>
          <tr>
            <td>Inscripciones</td>
            <td>01 Oct 2025 - 30 Nov 2025</td>
            <td>Online</td>
          </tr>
          <tr>
            <td>Charlas con invitados especiales</td>
            <td>22 Oct 2025, 18:00</td>
            <td>Híbrido</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

export default EventsTable;


