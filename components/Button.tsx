import React, { MouseEventHandler } from "react";

type ButtonProps = {
  icon?: JSX.Element;
  text: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  right?: boolean;
  left?: boolean;
  className?: string;
};

const Button = ({
  text,
  onClick,
  left = false,
  right = false,
  className,
  type = "button",
  icon,
}: ButtonProps) => {
  const handleClick = typeof onClick === "function" ? onClick : () => {};
  if (className) {
    return (
      <button
        className={`cursor-pointer w-fit h-11 px-6 py-2 mt-4 rounded-lg font-bold text-sm flex flex-row items-center justify-center transition duration-500 outline-none ${className}`}
        onClick={handleClick}
        type={type}
      >
        {left && icon ? icon : null}
        {text}
        {right && icon ? icon : null}
      </button>
    );
  }
  return (
    <button
      className="cursor-pointer w-fit h-12 px-8 py-2 mt-4 rounded-lg flex flex-row items-center justify-center transition duration-500 outline-none font-bold text-sm"
      onClick={handleClick}
      type={type}
    >
      {left && icon ? icon : null}
      {text}
      {right && icon ? icon : null}
    </button>
  );
};

export default Button;
