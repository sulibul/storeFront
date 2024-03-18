import React, { ReactNode } from "react";

interface Props {
  onMouseEnter?: () => void;
  onClick: () => void;
  children: ReactNode;
  className: string;
}

const Button = ({ onMouseEnter, onClick, children, className }: Props) => {
  return (
    <>
      <button
        type="button"
        className={"btn btn-" + className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
