import React, { useState } from 'react';
import { SoilMix } from '../../types/soilmix';
import styles from './SearchableDropdown.module.scss';

interface Option {
  label: string;
  soilMix: SoilMix;
}

interface SearchableDropdownProps {
  options: Option[];
  onSelect: (soilMix: SoilMix) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (soilMix: SoilMix) => {
    onSelect(soilMix);
    // setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={styles.searchableDropdown}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className={styles.optionsGrid}>
        {filteredOptions.map(option => (
          <button
            key={option.label}
            onClick={() => handleSelect(option.soilMix)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchableDropdown;