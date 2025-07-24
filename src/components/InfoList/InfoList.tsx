import * as React from 'react';

type InfoListProps = {
  items: Array<{
    label: string;
    value: React.ReactNode;
  }>;
  className?: string;
  gap?: string;
};

function InfoList({ items, className = '', gap = 'gap-2' }: InfoListProps) {
  return (
    <ul className={`flex flex-col ${gap} ${className}`}>
      {items.map((item, index) => (
        <li key={index}>
          <span className="font-semibold">{item.label}:</span> {item.value}
        </li>
      ))}
    </ul>
  );
}

export default InfoList;
