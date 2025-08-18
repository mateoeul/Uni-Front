import React from 'react';

const FacultyList = () => (
  <section className="card">
    <h4>Facultades</h4>
    <ul className="faculty-list">
      {[
        'Arquitectura', 'Abogacía', 'Actuaría', 'Licenciatura en Sistemas', 'Licenciatura en Contabilidad',
        'Ingeniería Industrial', 'Veterinaria', 'Farmacia', 'Bioquímica', 'Historia',
        'Ingeniería en Informática', 'Comunicación', 'Diseño', 'Psicología'
      ].map((fac) => (
        <li key={fac} className="faculty-list-item">{fac}</li>
      ))}
    </ul>
  </section>
);

export default FacultyList;


