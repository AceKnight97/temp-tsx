import classnames from "classnames";
import React from "react";

interface Props {
  className?: string | "";
  title?: string | "";
}

const InputTitle: React.FC<Props> = (props) => {
  const { className, title } = props;
  if (title) {
    return (
      <div className={classnames("input-title", className)}>
        <span>{title}</span>
      </div>
    );
  }
  return null;
};

export default InputTitle;
