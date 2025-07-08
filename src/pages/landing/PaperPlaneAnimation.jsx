import { motion } from 'framer-motion';

// SVG path para 'UNI' grande y claro, estilo manuscrito, centrado y ancho
const uniPath = `M 100 140 Q 120 60 140 140
M 160 140 L 160 60 L 200 140
M 220 140 L 220 60 L 260 140`;

// Path points para animar el avión siguiendo el trazo de 'UNI'
const planeMotion = [
  { x: 100, y: 140 }, // U inicio
  { x: 120, y: 60 },
  { x: 140, y: 140 }, // U fin
  { x: 160, y: 140 }, // N inicio
  { x: 160, y: 60 },
  { x: 200, y: 140 }, // N fin
  { x: 220, y: 140 }, // I inicio
  { x: 220, y: 60 },
  { x: 260, y: 140 }, // I fin
];

export default function PaperPlaneAnimation() {
  // Extraer arrays de x e y para framer-motion
  const xArr = planeMotion.map(p => p.x);
  const yArr = planeMotion.map(p => p.y);
  return (
    <svg
      className="plane-animation-svg"
      width="100%"
      height="220"
      viewBox="0 0 800 220"
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
    >
      {/* Trazo de UNI animado */}
      <motion.path
        d={uniPath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 2px 12px #3b82f633)' }}
      />
      {/* Avión (como lápiz) animado siguiendo el trazo */}
      <motion.g
        initial={{ x: xArr[0], y: yArr[0], opacity: 0 }}
        animate={{
          x: xArr,
          y: yArr,
          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{ duration: 2.8, times: [0,0.13,0.26,0.39,0.52,0.65,0.78,0.91,1], ease: 'easeInOut' }}
      >
        {/* Avión como lápiz: cuerpo azul, punta gris */}
        <rect x="-12" y="-6" width="24" height="12" rx="6" fill="#3b82f6" stroke="#111" strokeWidth="2" />
        <polygon points="12,0 22,4 12,8" fill="#888" />
      </motion.g>
    </svg>
  );
} 