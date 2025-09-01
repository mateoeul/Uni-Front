import React, { useMemo, useState, useEffect } from 'react';

import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import UniversityCard from '../../components/universityCard/UniversityCard';
import '../../components/universityCard/style.css';
import universityService from '../../services/university-service';

const countries = ['Argentina'];
const publics = ['Todas', 'Pública', 'Privada'];

const Universities = () => {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [ownership, setOwnership] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar universidades desde el servicio
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoading(true);
        const response = await universityService.getAll();
        if (response.success) {
          // Mapear los datos del API al formato esperado por UniversityCard
          const mappedUniversities = response.data.map(uni => ({
            id: uni.id,
            name: uni.nombre,
            type: uni.tipo,
            logoText: uni.abreviacion || uni.nombre.substring(0, 2).toUpperCase(),
            photo: uni.foto,
            abbreviation: uni.abreviacion
          }));
          setUniversities(mappedUniversities);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, []);

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                         (u.abbreviation && u.abbreviation.toLowerCase().includes(search.toLowerCase()));
      const matchOwnership = ownership ? u.type === ownership : true;
      return matchSearch && matchOwnership;
    });
  }, [search, ownership, universities]);

  if (loading) {
    return (
      <div className="universities-page">
        <div className="universities-header">
          <h2 className="universities-title">Universidades</h2>
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="universities-page">
        <div className="universities-header">
          <h2 className="universities-title">Universidades</h2>
          <span style={{color: 'red'}}>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="universities-page">
      <div className="universities-header">

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
          name="ownership"
          value={ownership}
          onChange={(e) => setOwnership(e.target.value)}
          placeholder="Pública/Privada"
          options={publics.filter(p => p !== 'Todas').map((p) => ({ value: p, label: p }))}
        />
        <Input
          name="search"
          placeholder="Buscar universidad o abreviación..."
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