import React from 'react';

type Props = {
  label?: string;
  onClick?: () => void;
  variant: 'primary' | 'outline';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  datatype?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<Props> = ({ label, onClick, type, icon, children, datatype, variant }) => {
  return (
    <button
      type={type ?? 'button'}
      datatype={datatype}
      className={variant === 'primary' ? 'button-primary' : 'button-outline'}
      onClick={onClick}
    >
      {icon && <span className={`button-icon ${label ? "button-margin" : ""}`}>{icon}</span>}
      {label && <span>{label}</span>}
      {children && children}
    </button>
  );
};

export default Button;
