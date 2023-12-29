import React, { FC } from "react";

interface BadgeProps {
  className: string;
  label: string;
}

const Badge: FC<BadgeProps> = ({ className, label }) => {
  return (
    <span
      className={`px-2 py-[2px] text-[11px] rounded-md font-semibold ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
