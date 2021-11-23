import { Input } from "antd";
import classnames from "classnames";
import React from "react";
import InputTitle from "../inputTitle";

interface Props {
  title?: string | "";
  className?: string | "";
  errMes?: string | "";
  disabled?: boolean | false;
  onChange: (name: string, value: any) => void;
  value?: any;
  prefix?: any;
  suffix?: any;
  onBlur?: () => any;
  placeholder?: string | "";
  name: string;
}

const InputCT: React.FC<Props> = (props) => {
  const {
    title,
    className,
    errMes,
    disabled,
    value,
    prefix,
    suffix,
    onBlur,
    placeholder,
    name,
  } = props;

  const onChange = (e: any) => {
    props.onChange(name, e.target.value);
  };

  return (
    <div className={classnames("input-ct-wrapper", className)}>
      <InputTitle title={title} />
      <Input
        className={errMes ? "err-border" : ""}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        prefix={prefix}
        suffix={suffix}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputCT;
