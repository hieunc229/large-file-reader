import { createClassStr } from "easier-class";
import { createElement } from "react";


export default function Input(props: InputProps) {
  const {
    label,
    inputClassName,
    className,
    leftComponent,
    labelClassName,
    footerComponent,
    rightComponent,
    description,
    textarea,
    forwardRef,
    inputBackground = "bg-zinc-200/50",
    direction = "col",
    ...rest
  } = props;
  return (
    <div className={createClassStr("flex gap-1", className, `flex-${direction}`)}>
      {leftComponent}
      {label ? (
        <label className={createClassStr(labelClassName)}>{label}</label>
      ) : null}
      {createElement(textarea ? "textarea" : "input", {
        ...rest,
        ref: forwardRef,
        className: createClassStr(
          "py-2 px-4 outline-none rounded-md disabled:text-zinc-400 disabled:opacity-60 cursor:not-allowed",
          inputBackground,
          inputClassName
        ),
      })}
      {footerComponent || rightComponent}
      {description ? <p className="text-xs opacity-60">{description}</p> : null}
    </div>
  );
}
