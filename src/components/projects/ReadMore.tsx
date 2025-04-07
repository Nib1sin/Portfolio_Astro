// Importaciones necesarias
import { useState } from 'preact/hooks';

// Componente ReadMore
const ReadMore = ({ description, maxLines }: { description: string; maxLines: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Estilo para limitar las líneas de texto visibles
  const style = `display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical; overflow: hidden;`;

  return (
    <div>
      <div class={isExpanded ? '' : 'line-clamp'} style={!isExpanded ? style : ''}>
        {description}
      </div>
      <button class="text-blue-500 hover:underline" onClick={toggleExpand}>
        {isExpanded ? 'Mostrar menos' : 'Seguir leyendo'}
      </button>
    </div>

    
  );
};

export default ReadMore;
