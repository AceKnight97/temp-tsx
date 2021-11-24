import { Button, Col, Row } from "antd";
import classnames from "classnames";
import _ from "lodash";
import React, { useMemo } from "react";
import { useMergeState } from "../../../helpers/customHooks";
import TableBasic from "../tableBasic";
import { PlusOutlined } from "@ant-design/icons";
import InputCT from "../../inputs/inputCT";

import "./_main-table.css";

interface Props {
  rowKey: string | "";
  name: string | "";
  className?: string;
  searchByList?: any | [];
  columns?: any;
  totalData?: any;
  onRowClick: (index: any, record: any) => void;
  fetchData: (
    updatedFilter: object | {},
    isNextPage: boolean | false,
    isReload: boolean | false,
    isSearch: boolean | false
  ) => void;
  shouldHideNextButton?: boolean;
  loading?: boolean;
  sorter?: object;
  isVisible?: boolean;
  searchBarLength?: number;
  isEmptySearching?: boolean;
  page: number | 1;
  handleChangePage: (page: number) => void;
  onClickAddNew: () => void;
  isNew?: boolean | false;
}

const MainTable: React.FC<Props> = (props) => {
  const [state, setState] = useMergeState({
    searchText: "",
  });
  const {
    className,
    onRowClick,
    searchByList,
    sorter,
    rowKey,
    isVisible,
    page,
    name,
    columns,
    loading,
    totalData,
    shouldHideNextButton,
    handleChangePage,
    onClickAddNew,
    isNew,
  } = props;

  const { searchText } = state;

  const onChange = (key: string, value: any) => {
    setState({ [key]: value });
  };

  const fetchData = async (
    updatedFilter: object = {},
    isNextPage: boolean = false,
    isReload: boolean = false,
    isSearch: boolean = false
  ) => {
    setState({ searchOption: updatedFilter });
    _.forEach(state.selectedOption, (x) => {
      _.assign(updatedFilter, {
        [x.name]: x.value?.includes("All") ? undefined : x.value,
      });
    });
    props.fetchData(updatedFilter, isNextPage, isReload, isSearch);
  };

  return (
    <div className={classnames(className, "main-table")}>
      <div className="main-table-body">
        <Row gutter={24} className="fr-sb pr-12">
          <Col span={8}>
            <InputCT
              onChange={onChange}
              value={searchText}
              name="searchText"
              placeholder="Search..."
            />
          </Col>
          {isNew && (
            <Button onClick={onClickAddNew} type="primary">
              <PlusOutlined />
              Add New
            </Button>
          )}
        </Row>

        <TableBasic
          rowKey={rowKey}
          name={name}
          className="mt-24"
          totalData={totalData}
          columns={columns}
          onRowClick={onRowClick}
          shouldHideNextButton={shouldHideNextButton}
          fetchData={fetchData}
          loading={loading}
          sorter={sorter}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MainTable;
