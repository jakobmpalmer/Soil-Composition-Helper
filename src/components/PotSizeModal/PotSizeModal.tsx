import React, { Dispatch, SetStateAction } from 'react';
import { potSizes, PotSize } from '../../utils/gardenPotUtils';

interface PotSizeModalProps {
  onSelectSize: Dispatch<SetStateAction<PotSize | null>>;
}

const PotSizeModal: React.FC<PotSizeModalProps> = ({ onSelectSize }) => {
  const handleSelectSize = (size: string) => {
    const selectedSize: PotSize = potSizes[size];
    if (selectedSize) {
      onSelectSize(selectedSize);
    }

    console.log('selectedSize', selectedSize);
  };

  return (
    <div>
      <h2>Select Pot Size</h2>
      {Object.keys(potSizes).map((size) => (
        <button
          key={size}
          onClick={() => handleSelectSize(size)}
          style={{ margin: '5px' }}
        >
          {size} inch
        </button>
      ))}
    </div>
  );
};

export default PotSizeModal;