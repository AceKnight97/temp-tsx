

export const APP_TYPES = {
  MAIN: "MAIN",
  DELETE: "DELETE",
  EDIT: "EDIT",
  ADD: "ADD",
};


export const basicProps = (props = {}) => ({
  id: props.rowData?.id || "",
  appId: props.rowData?.appId || "",
  name: props.rowData?.name || "",
  description: props.rowData?.description || "",
  backendURI: props.rowData?.backendURI || "",
  appURL: props.rowData?.appURL || "",
  owner: props.rowData?.owner || "",
});