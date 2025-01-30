import React from 'react';

interface ExpandDownIcon {
  color?: string;
}

const ExpandDownIcon: React.FC<ExpandDownIcon> = ({ color = '#33363F' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 12L12 18L6 12" stroke={color} strokeWidth="2"/>
    <path d="M18 6L12 12L6 6" stroke={color} strokeWidth="2"/>
  </svg>
);

export default ExpandDownIcon;