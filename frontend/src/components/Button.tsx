import React, { ReactNode } from "react";

interface Props {
  onMouseEnter?: () => void;
  onClick: () => void;
  color?: string;
  children: ReactNode;
}

const Button = ({ onMouseEnter, onClick, color = "blue", children }: Props) => {
  return (
    <>
      <button
        type="button"
        className={"btn btn-" + color}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
