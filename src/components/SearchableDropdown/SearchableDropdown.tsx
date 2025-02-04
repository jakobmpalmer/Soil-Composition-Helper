import React, { useState } from 'react';
import { SoilMix } from '../../types/soilmix';

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
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (soilMix: SoilMix) => {
    onSelect(soilMix);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="searchable-dropdown">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Search..."
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map(option => (
            <li key={option.label} onClick={() => handleSelect(option.soilMix)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;