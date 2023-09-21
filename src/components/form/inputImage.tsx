import { createClassStr } from "easier-class";
import { Image } from "iconsax-react";
import { createRef, useState } from "react";
import Button from "./button";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  footerComponent?: any;
  leftComponent?: any;
  description?: string;
  textarea?: boolean;
  imageSize?: ComponentSize;
  btnLabel?: string;
};

export default function InputImage(props: Props) {
  const {
    label,
    className,
    labelClassName,
    description,
    onChange,
    defaultValue,
    name,
    size = "md",
    btnLabel = "Chọn",
  } = props;
  const [url, setUrl] = useState<string>(defaultValue as string);
  const inputRef = createRef<HTMLInputElement>();

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.currentTarget.files.item(0);
    if (file) {
      setUrl(URL.createObjectURL(file));
    }

    onChange && onChange(ev);
  }

  function openFilePicker() {
    inputRef.current && inputRef.current.click();
  }

  const sizeClassName = imageSizes[size];

  return (
    <div className={createClassStr("flex flex-row gap-3 items-end", className)}>
      <div
        className={createClassStr(
          "flex rounded-lg bg-zinc-100 items-center justify-center cursor-pointer",
          "overflow-hidden",
          sizeClassName
        )}
        onClick={openFilePicker}
      >
        {url ? (
          <img className="h-full w-full object-cover" src={url} />
        ) : (
          <Image />
        )}
      </div>
      <div className="flex flex-col items-start">
        {label ? (
          <label className={createClassStr(labelClassName)}>{label}</label>
        ) : null}
        {description ? (
          <p className="text-xs opacity-60">{description}</p>
        ) : null}
        <Button
          className="mt-2"
          type="button"
          theme="default"
          label={btnLabel || "Chọn"}
          size="xs"
          onClick={openFilePicker}
        />
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          hidden
          name={name}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

const imageSizes = {
  md: "w-[60px] h-[60px]",
  lg: "w-[80px] h-[80px]",
};
