import React, { ReactNode } from "react";

interface Props {
  label: string;
  error: any;
  required: boolean;
  children: ReactNode;
}

const Field = ({ label, children, error }: Props) => {
  return (
    <>
      <div>
        {label && <label>{label}</label>}
        {children}
        {!!error && <p role="alert">{error.message}</p>}
      </div>
    </>
  );
};

export default Field;
