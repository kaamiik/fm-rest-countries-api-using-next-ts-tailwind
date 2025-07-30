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
    <dl className={`flex flex-col ${gap} ${className}`}>
      {items.map((item, index) => (
        <div className="flex flex-row items-center gap-2" key={index}>
          <dt className="inline-block font-semibold">{item.label}:</dt>
          <dd className="inline-block">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default InfoList;
