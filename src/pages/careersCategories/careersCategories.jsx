// src/pages/careersCategories/careersCategories.jsx
import React, { useEffect, useState } from 'react';
import "./careers.css";
import { FaList, FaSearch, FaBuilding, FaCode, FaHeartbeat, FaShieldAlt, FaGlobe, FaFeather, FaGraduationCap, FaMicrophone, FaLeaf, FaAtom } from 'react-icons/fa';
import CareerDetails from '../careerList/careerList';
import categoryService from '../../services/category-service';
import { useNavigate, useParams } from 'react-router-dom';

const CareersCategories = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAll();
        if (response.success) {
          // Helper para elegir icono por nombre de categoría
          const selectIconByName = (categoryName) => {
            const name = (categoryName || '').toString().toLowerCase();
            // Tecnología / Innovación usan un ícono distinto a Ciencias Exactas
            if (
              name.includes('tec') ||
              name.includes('tecnolog') ||
              name.includes('innov') ||
              name.includes('sistema') ||
              name.includes('informat') ||
              name.includes('program')
            ) return <FaCode />;
            if (name.includes('salud') || name.includes('medic') || name.includes('enfermer')) return <FaHeartbeat />;
            if (name.includes('segur') || name.includes('defen') || name.includes('polic') || name.includes('milit')) return <FaShieldAlt />;
            if (name.includes('negocio') || name.includes('empresa') || name.includes('admin') || name.includes('comerc')) return <FaShieldAlt />;
            // Diferentes íconos para ciencias exactas, naturales y sociales
            if (name.includes('exacta') || name.includes('exactas')) return <FaBuilding />;
            if (name.includes('natural') || name.includes('naturales')) return <FaLeaf />;
            if (name.includes('social') || name.includes('sociales')) return <FaGlobe />;
            if (name.includes('internac') || name.includes('geo') || name.includes('turismo') || name.includes('global')) return <FaGlobe />;
            if (name.includes('arte') || name.includes('letra') || name.includes('human') || name.includes('literat') || name.includes('diseño') || name.includes('diseno')) return <FaFeather />;
            if (name.includes('educ') || name.includes('pedag') || name.includes('docen')) return <FaGraduationCap />;
            if (name.includes('comun') || name.includes('period') || name.includes('radio') || name.includes('audio') || name.includes('multimed')) return <FaMicrophone />;
            if (name.includes('ambient') || name.includes('ecolog') || name.includes('agro') || name.includes('bio')) return <FaLeaf />;
            if (name.includes('busc') || name.includes('search')) return <FaSearch />;
            return <FaList />;
          };

          const selectColorByName = (categoryName) => {
            const name = (categoryName || '').toString().toLowerCase();
            if (name.includes('exacta') || name.includes('exactas')) return '#E3F2FD';
            if (
              name.includes('tec') ||
              name.includes('tecnolog') ||
              name.includes('innov') ||
              name.includes('sistema') ||
              name.includes('informat') ||
              name.includes('program')
            ) return '#E8F5E8';
            if (name.includes('salud') || name.includes('medic') || name.includes('enfermer')) return '#FCE4EC';
            if (name.includes('social') || name.includes('sociales')) return '#FFF3E0';
            if (name.includes('arte') || name.includes('letra') || name.includes('human') || name.includes('literat') || name.includes('diseño') || name.includes('diseno')) return '#F3E5F5';
            if (name.includes('negocio') || name.includes('empresa') || name.includes('admin') || name.includes('comerc')) return '#E8EAF6';
            if (name.includes('natural') || name.includes('naturales') || name.includes('ambient') || name.includes('ecolog') || name.includes('agro') || name.includes('bio')) return '#E8F5E8';
            if (name.includes('educ') || name.includes('pedag') || name.includes('docen')) return '#FCE4EC';
            if (name.includes('comun') || name.includes('period') || name.includes('radio') || name.includes('audio') || name.includes('multimed')) return '#E3F2FD';
            return '#E3F2FD';
          };

          // Ordenar igual que en Home (filas y columnas):
          // 0: Ciencias exactas
          // 1: Tecnología e innovación
          // 2: Salud
          // 3: Ciencias sociales
          // 4: Arte y diseño
          // 5: Negocios y administración
          // 6: Ciencias naturales
          // 7: Educación
          // 8: Comunicación y medios
          const selectOrderIndex = (categoryName) => {
            const name = (categoryName || '').toString().toLowerCase();
            if (name.includes('exacta')) return 0;
            if (
              name.includes('tec') ||
              name.includes('tecnolog') ||
              name.includes('innov') ||
              name.includes('sistema') ||
              name.includes('informat') ||
              name.includes('program')
            ) return 1;
            if (name.includes('salud') || name.includes('medic') || name.includes('enfermer')) return 2;
            if (name.includes('social')) return 3;
            if (name.includes('arte') || name.includes('diseño') || name.includes('diseno') || name.includes('human')) return 4;
            if (name.includes('negocio') || name.includes('empresa') || name.includes('admin') || name.includes('comerc')) return 5;
            if (name.includes('natural') || name.includes('ambient') || name.includes('ecolog') || name.includes('agro') || name.includes('bio')) return 6;
            if (name.includes('educ') || name.includes('pedag') || name.includes('docen')) return 7;
            if (name.includes('comun') || name.includes('period') || name.includes('radio') || name.includes('audio') || name.includes('multimed')) return 8;
            // Por defecto al final
            return 999;
          };

          // Helper para generar slug
          const toSlug = (text) => (text || '')
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          // Mapeo: { id, name, slug, icon }
          const mapped = (response.data || []).map((cat, idx) => {
            const displayName = cat.nombre || cat.name || `Categoría ${idx + 1}`;
            return {
              id: cat.id,
              name: displayName,
              slug: toSlug(displayName),
              bgColor: selectColorByName(displayName),
              icon: selectIconByName(displayName),
              _order: selectOrderIndex(displayName)
            };
          })
          // Ordenar por índice definido para igualar Home; mantener orden alfabético como secundario
          .sort((a, b) => {
            if (a._order !== b._order) return a._order - b._order;
            return a.name.localeCompare(b.name);
          })
          // remover campo interno
          .map(({ _order, ...rest }) => rest);
          setCategories(mapped);

          // Si hay slug en URL, seleccionar correspondiente
          if (slug) {
            if (slug === 'todas') {
              setSelectedCategory({ ...allCategory, id: null, isAll: true });
            } else {
              const found = mapped.find(c => c.slug === slug);
              if (found) setSelectedCategory(found);
            }
          }
        } else {
          setError('No se pudieron cargar las categorías');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (category?.isAll) {
      navigate('/careers/todas');
    } else if (category?.slug) {
      navigate(`/careers/${category.slug}`);
    }
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    navigate('/careers');
  };

  // Opción "Todas" (estilo del ejemplo)
  const allCategory = { name: 'Todas', icon: <FaList />, bgColor: '#F5F5F5' };

  // Si hay una categoría seleccionada, mostrar los detalles
  if (selectedCategory) {
    return <CareerDetails selectedCategory={selectedCategory} onBack={handleBack} />;
  }

  // Si no hay categoría seleccionada, mostrar la vista de categorías
  return (
    <div className="careers-container">
      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Busca Por Categorías</h2>

        {loading && (
          <div style={{ padding: 16 }}>Cargando categorías...</div>
        )}
        {error && (
          <div style={{ padding: 16, color: 'red' }}>Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="categories-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-card"
                  style={{ backgroundColor: category.bgColor }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
            <div className="all-category-container" style={{ marginTop: 24 }}>
              <div
                className="category-card all-category"
                style={{ backgroundColor: allCategory.bgColor }}
                onClick={() => handleCategoryClick({ ...allCategory, id: null, isAll: true })}
              >
                <div className="category-icon">{allCategory.icon}</div>
                <span className="category-name">{allCategory.name}</span>
              </div>
            </div>
          </>
        )}
      </section>

    </div>
  );
};

export default CareersCategories;