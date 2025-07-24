import * as React from "react";

function MaxWidthWrapper({
  children,
  as: Tag = "div",
  className = "",
  ...delegated
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className: string;
}) {
  return (
    <Tag {...delegated} className={`max-w-7xl mx-auto ${className}`}>
      {children}
    </Tag>
  );
}

export default MaxWidthWrapper;
