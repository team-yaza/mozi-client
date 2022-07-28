import { MouseEventHandler, useEffect, useState } from 'react';

type Coordinate = { x: number; y: number };
type OnDrag = (movement: Coordinate) => void;

export const useDrag = (onDrag: OnDrag) => {
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState<Coordinate>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onDrag({ x: e.clientX - start.x, y: e.clientY - start.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStart({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, start]);

  const startDrag: MouseEventHandler = (e) => {
    setIsDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
  };

  return { isDragging, startDrag };
};
