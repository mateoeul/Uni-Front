import React, { useMemo, useState } from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import UniversityCard from '../../components/universityCard/UniversityCard';
import '../../components/universityCard/style.css';
import { UNIVERSITIES } from './data';

const countries = ['Argentina'];
const locations = ['CABA', 'Buenos Aires', 'La Plata', 'Rosario'];
const publics = ['Todas', 'Pública', 'Privada'];

const Universities = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [location, setLocation] = useState('');
  const [ownership, setOwnership] = useState('');

  const filtered = useMemo(() => {
    return UNIVERSITIES.filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
      const matchLocation = location ? u.location === location : true;
      const matchOwnership = ownership ? u.type === ownership : true;
      return matchSearch && matchLocation && matchOwnership;
    });
  }, [search, location, ownership]);

  return (
    <div className="universities-page">
      <div className="universities-header">
        <h2 className="universities-title">Universidades</h2>
        <span className="universities-count">{filtered.length} resultados</span>
      </div>

      <div className="universities-toolbar">
        <Select
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="País"
          options={countries.map((c) => ({ value: c, label: c }))}
        />
        <Select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localidad"
          options={locations.map((l) => ({ value: l, label: l }))}
        />
        <Select
          name="ownership"
          value={ownership}
          onChange={(e) => setOwnership(e.target.value)}
          placeholder="Pública/Privada"
          options={publics.filter(p => p !== 'Todas').map((p) => ({ value: p, label: p }))}
        />
        <Input
          name="search"
          placeholder="Buscar universidad..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="universities-grid">
        {filtered.map((u) => (
          <UniversityCard key={u.id} university={u} />
        ))}
      </div>
    </div>
  );
};

export default Universities;