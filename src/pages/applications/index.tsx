import React, { useEffect } from "react";
import { useMergeState } from "../../helpers/customHooks";
import { Layout } from "antd";
import "./_applications.css";
import Header from "../../components/Header";
import MainTable from "../../components/tables/mainTable";
import { getApplications } from "../../api/applications";

const Applications: React.FC = () => {
  const [state, setState] = useMergeState({
    current: "SIGN_IN",
  });
  const { current } = state;

  useEffect(() => {
    getApplications();
  }, []);

  const generateColumns = () => {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "App Id",
        dataIndex: "appId",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "Name",
        dataIndex: "name",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "Description",
        dataIndex: "description",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "Back-end URI",
        dataIndex: "backendURI",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "App URL",
        dataIndex: "appURL",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      {
        title: "Owner",
        dataIndex: "owner",
        render: (cell: any) => <div className="cell">{cell}</div>,
      },
      // "id": 1,
      // "appId": "survey_app",
      // "name": null,
      // "description": "survey app",
      // "backendURI": null,
      // "appURL": null,
      // "owner": "mih1hc"
    ];
    return columns;
  };

  const goToDetails = () => {};
  const fetchData = () => {};
  const handleChangePage = () => {};

  return (
    <div className="applications">
      <Layout.Header>
        <Header title="Applications" />
      </Layout.Header>

      <MainTable
        rowKey="_id"
        name="applications"
        // className="patients-active-wrapper"
        // searchByList={searchByList.current}
        columns={generateColumns()}
        totalData={state.activeCarePlans}
        shouldHideNextButton={state.isEndOfActiveCarePlans}
        onRowClick={goToDetails}
        fetchData={fetchData}
        loading={state.loading}
        sorter={{}}
        page={state.page}
        handleChangePage={handleChangePage}
        isEmptySearching={false}
      />
    </div>
  );
};

export default Applications;
