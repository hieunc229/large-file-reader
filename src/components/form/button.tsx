import { createClassStr } from "easier-class";
import { Icon } from "iconsax-react";
import { createElement } from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label?: string;
  theme?: ButtonTheme;
  size?: ComponentSize;
  leftComponent?: any;
  icon?: Icon;
  colorClassName?: string;
  forwardRef?: any;
  rounded?: "md" | "full" | string;
};

export default function Button(props: Props) {
  const {
    children,
    label,
    className,
    theme = "primary",
    size = "md",
    leftComponent,
    colorClassName,
    forwardRef,
    rounded,
    icon,
    ...rest
  } = props;

  return (
    <button
      ref={forwardRef}
      className={createClassStr(
        className,
        btnThemeClasses.base,
        colorClassName || btnThemeClasses[theme],
        btnSizeClasses[size],
        !icon && "justify-center"
      )}
      {...rest}
    >
      {icon ? createElement(icon, { size: btnIconSizes[size] }) : null}
      {leftComponent}
      {label || children}
    </button>
  );
}

export const btnSizeClasses = {
  xs: "text-xs py-0.5 px-2 rounded",
  sm: "text-sm py-1 px-2 rounded-md",
  md: "py-2 px-4 rounded-lg",
  lg: "text-lg py-3 px-6 rounded-xl",
  xl: "text-xl py-4 px-12 rounded-xl",
};

const btnIconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 21,
  xl: 24,
};

const light =
  "text-zinc-700 bg-white hover:text-lime-700 active:bg-zinc-100 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed border py-1";
export const btnThemeClasses = {
  default: "bg-zinc-100 hover:bg-zinc-200",
  light,
  warning: "text-white bg-orange-600 hover:bg-orange-700",
  danger: "text-white bg-red-600 hover:bg-red-700",
  success: "text-white bg-green-600 hover:bg-green-700",
  primary: "text-white bg-lime-600 hover:bg-lime-700",
  info: "text-white bg-blue-600 hover:bg-blue-600",
  lightC1: light + " shadow-lg shadow-zinc-200",
  base: "duration-200 cursor-pointer font-semibold flex flex-row gap-2 items-center",
};
