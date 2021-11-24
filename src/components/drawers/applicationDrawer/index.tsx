import { Button, Drawer, Space, Spin } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";
import { useMergeState } from "../../../helpers/customHooks";
import InputCT from "../../inputs/inputCT";
import { APP_TYPES, basicProps } from "./helper";
import "./_application-drawer.css";
interface Props {
  visible: boolean | false;
  _id?: string | "";
  onCloseDrawer: () => void;
  followUpId?: string | "";
  patientId?: string | "";
  title?: string | "";
  rowData: any | {};
}
const { MAIN, DELETE, EDIT, ADD } = APP_TYPES;

const ApplicationDrawer: React.FC<Props> = (props) => {
  const [state, setState] = useMergeState({
    current: MAIN,
    loading: false,
    ...basicProps(props),
  });

  const {
    loading,
    id,
    appId,
    name,
    description,
    backendURI,
    appURL,
    owner,
    current,
  } = state;
  const { visible, title, onCloseDrawer } = props;

  useEffect(() => {
    if (visible) {
      setState({ ...basicProps(props) });
    }
  }, [visible]);

  const onChange = (key: string, value: any) => {
    setState({ [key]: value });
  };

  const onClickDelete = () => {
    setState({ current: DELETE });
  };

  const onClickEdit = () => {};

  const onClickAdd = () => {};

  const renderAddEdit = () => (
    <>
      <InputCT
        title="Id"
        onChange={onChange}
        value={id}
        name="id"
        placeholder="Enter Id"
      />
      <InputCT
        title="App Id"
        onChange={onChange}
        value={appId}
        name="appId"
        placeholder="Enter appId"
        className="mt-24"
      />
      <InputCT
        title="Name"
        onChange={onChange}
        value={name}
        name="name"
        placeholder="Enter name"
        className="mt-24"
      />
      <InputCT
        title="Description"
        onChange={onChange}
        value={description}
        name="description"
        placeholder="Enter description"
        className="mt-24"
      />
      <InputCT
        title="Backend URI"
        onChange={onChange}
        value={backendURI}
        name="backendURI"
        placeholder="Enter backendURI"
        className="mt-24"
      />
      <InputCT
        title="App URL"
        onChange={onChange}
        value={appURL}
        name="appURL"
        placeholder="Enter appURL"
        className="mt-24"
      />
      <InputCT
        title="Owner"
        onChange={onChange}
        value={owner}
        name="owner"
        placeholder="Enter owner"
        className="mt-24"
      />

      {_.isEmpty(props.rowData) ? (
        <Button block type="primary" onClick={onClickAdd} className="mt-48">
          Add new
        </Button>
      ) : (
        <div className="fr-sb mt-48">
          <Button
            danger
            onClick={onClickDelete}
            className="application-drawer-delete-btn"
          >
            Delete
          </Button>

          <Button
            onClick={onClickEdit}
            type="primary"
            className="application-drawer-edit-btn"
            disabled={_.isEqual(
              { id, appId, name, description, backendURI, appURL, owner },
              { ...basicProps(props) }
            )}
          >
            Edit
          </Button>
        </div>
      )}
    </>
  );

  const renderConfirm = () => (
    <>
      <div>dasda</div>
    </>
  );

  const renderMainView = () => (
    <div className="application-drawer">
      <div className="application-drawer-header">
        <span>{`Application: ${title}`}</span>

        <button
          className="nor-btn application-drawer-close-btn"
          onClick={onCloseDrawer}
        >
          X
        </button>
      </div>

      <div className="application-drawer-body">
        {current === MAIN ? renderAddEdit() : renderConfirm()}
      </div>
    </div>
  );

  return (
    <Drawer
      width={400}
      placement="right"
      closable={false}
      visible={visible}
      destroyOnClose
    >
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
