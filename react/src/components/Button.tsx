import React, { type AriaRole } from 'react';

type Props = {
  label?: string;
  onClick: () => void;
  type: 'primary' | 'outline';
  role?: AriaRole | string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ label, onClick, type, role, icon, children }) => {
  return (
    <button
      role={role ?? "button"}
      className={type === 'primary' ? 'button-primary' : 'button-outline'}
      onClick={onClick}
    >
      {icon && <span className={`button-icon ${label ? "button-margin" : ""}`}>{icon}</span>}
      {label && <span>{label}</span>}
      {children && children}
    </button>
  );
};

export default Button;
