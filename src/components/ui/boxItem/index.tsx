import React from "react";
import classnames from "classnames";
import "./_box-item.css";

const BoxItem: React.FC<{
  className?: string | "";
  icon?: object | undefined;
  value?: string | "";
  onClick?: () => void;
}> = ({ className, icon, value, onClick }) => {
  return (
    <button className={classnames("box-item", className)} onClick={onClick}>
      {icon || null}
      {value ? <span>{value}</span> : null}
    </button>
  );
};

export default BoxItem;
