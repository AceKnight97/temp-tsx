import React, { useEffect } from "react";
import { useMergeState } from "../../helpers/customHooks";
import { Layout } from "antd";
import "./_applications.css";
import Header from "../../components/Header";
import MainTable from "../../components/tables/mainTable";
import { getApplications } from "../../api/applications";

const Applications: React.FC = () => {
  const [state, setState] = useMergeState({
    applications: [],
    loading: true,
    page: 1,
    shouldHideNextButton: false,
  });

  const fetchData = async () => {
    const applications = await getApplications();
    setState({ applications, loading: false });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { applications, loading, page, shouldHideNextButton } = state;

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
  const handleChangePage = () => {};

  return (
    <div className="applications">
      <Layout.Header>
        <Header title="Applications" />
      </Layout.Header>

      <MainTable
        rowKey="_id"
        name="applications"
        columns={generateColumns()}
        totalData={applications}
        shouldHideNextButton={shouldHideNextButton}
        onRowClick={goToDetails}
        fetchData={fetchData}
        loading={loading}
        sorter={{}}
        page={page}
        handleChangePage={handleChangePage}
        isEmptySearching={false}
      />
    </div>
  );
};

export default Applications;
