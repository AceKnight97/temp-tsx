import { Drawer, Space, Spin } from "antd";
import React from "react";
import { useMergeState } from "../../../helpers/customHooks";

const APPLICATION_DRAWER_TYPES = ["CREATE", "EDIT", "DISPLAY"];

interface Props {
  visible: boolean | false;
  _id?: string | "";
  onCloseDrawer: () => void;
  followUpId?: string | "";
  patientId?: string | "";
}

const ApplicationDrawer: React.FC<Props> = (props) => {
  const [state, setState] = useMergeState({
    current: "",
    loading: false,
    status: "",
  });

  const { loading } = state;
  const { visible } = props;

  const renderMainView = () => null;

  return (
    <Drawer width={400} placement="right" closable={false} visible={visible}>
      {loading && (
        <Space className="loading-space" size="middle">
          <Spin size="large" />
        </Space>
      )}
      {renderMainView()}
    </Drawer>
  );
};

export default ApplicationDrawer;
