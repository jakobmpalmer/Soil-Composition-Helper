import React, { useState } from 'react';
import { useFloating, offset, shift, flip } from '@floating-ui/react';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ label, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { x, y, strategy, refs } = useFloating({
    placement: 'top',
    middleware: [offset(10), shift(), flip()],
  });

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ display: 'inline-block' }}
    >
      {children}
      {isVisible && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            background: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Tooltip;