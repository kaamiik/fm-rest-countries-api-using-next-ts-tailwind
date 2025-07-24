import * as React from 'react';
import Image from 'next/image';

function Icon({
  src,
  width,
  height,
  className = '',
  ...delegated
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      src={src}
      width={width}
      height={height}
      className={className}
      {...delegated}
    />
  );
}

export default Icon;
