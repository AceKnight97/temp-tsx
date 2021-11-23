import React, { useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classnames from "classnames";
import "antd/dist/antd.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
// import { connect } from 'react-redux';
import { Menu } from "antd";
import {
  CalendarOutlined,
  IdcardOutlined,
  SolutionOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
// import biocareLogo from '../../Image/Components/SideMenu/biocare-logo.svg';
import { useMergeState } from "../../helpers/customHooks";
import { toggleArr } from "../../helpers";
import boschLogo from "../../assets/bosch/bosch-invented-for-life.png";
import "./_side-bar.css";

const { SubMenu } = Menu;

const SideBar = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    pathname: "",
    openArr: ["/patients", "/reports"],
  });
  const location = useLocation();
  const { openArr } = state;

  useEffect(() => {
    const pathname = location.pathname.split("/").slice(0, 3).join("/");
    setState({ pathname });
  }, [location.pathname]);

  const onTitleClick = ({ key }) => {
    const newArr = toggleArr(key, openArr);
    if (_.isEqual(newArr, openArr)) {
      return;
    }
    setState({ openArr: newArr });
  };

  const onClickKey = () => {};
  const onClickNavLink = (link, e) => {
    history.push(link);
  };

  const getIcon = (name) => {
    switch (name) {
      case "Calendar":
        return <CalendarOutlined className="side-bar-item-icon" />;
      case "Patients":
        return <IdcardOutlined className="side-bar-item-icon" />;
      case "Reports":
        return <SolutionOutlined className="side-bar-item-icon" />;
      default:
        return null;
    }
  };

  const { menu } = props;

  return (
    <div className="side-bar">
      <div className="side-bar-logo">
        <img src={boschLogo} alt="Bosch-logo" />
      </div>
      <Menu
        mode="inline"
        defaultOpenKeys={openArr}
        selectedKeys={[state.pathname]}
      >
        {_.map(menu, (item) =>
          item.sub ? (
            <SubMenu
              className="side-bar-submenu"
              key={item.link}
              onTitleClick={onTitleClick}
              onClick={onClickKey}
              title={
                <div
                  className={classnames(
                    "fr-sb",
                    "pos-re",
                    "side-bar-submenu-item"
                  )}
                >
                  <div>
                    {getIcon(item.name)}
                    <span className="side-bar-item-text">{item.name}</span>
                  </div>
                  <div className="side-bar-item-caret">
                    {openArr.includes(item.link) ? (
                      <CaretUpOutlined />
                    ) : (
                      <CaretDownOutlined />
                    )}
                  </div>
                </div>
              }
            >
              {_.map(item.sub, (d) => (
                <Menu.Item key={d.link}>
                  <NavLink
                    key={d.link}
                    to={d.link}
                    onClick={(e) => onClickNavLink(d.link, e)}
                  >
                    {d.name}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.link} className="side-bar-menu">
              <NavLink
                key={item.link}
                to={item.link}
                onClick={(e) => onClickNavLink(item.link, e)}
              >
                {getIcon(item.name)}
                <span className="side-bar-item-text">{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

SideBar.defaultProps = {
  menu: [],
};
SideBar.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape()),
};

export default SideBar;
// const mapStateToProps = state => ({
// });

// const mapDispatchToProps = {
// };
// export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
