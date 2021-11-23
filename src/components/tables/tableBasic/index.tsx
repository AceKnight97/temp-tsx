import { RightOutlined } from "@ant-design/icons";
import { Table } from "antd";
import classnames from "classnames";
import _ from "lodash";
import React, { useRef } from "react";
import { useUpdateEffect } from "../../../helpers/customHooks";
import BoxItem from "../../ui/boxItem";
import "./_table-basic.css";

interface Props {
  rowKey?: string | "";
  name: string | "";
  className?: string | "";
  totalData: [any] | [];
  columns?: [any] | [];
  onRowClick: (index: any, record: any) => void;
  shouldHideNextButton?: boolean | false;
  fetchData: (
    updatedFilter: any | {},
    isNextPage?: boolean | false,
    isReload?: boolean | false,
    isSearch?: boolean | false
  ) => void;
  loading?: boolean | false;
  sorter?: any;
  emptyText?: string | "";
  shouldShowAllData?: boolean | false;
  page: number | 1;
  handleChangePage: (page: number) => void;
  isNoPagination?: boolean | false;
  sticky?: boolean | false;
}

const TableBasic: React.FC<Props> = (props) => {
  const {
    rowKey,
    name,
    className,
    totalData,
    columns,
    onRowClick,
    shouldHideNextButton,
    fetchData,
    loading,
    sorter,
    emptyText,
    shouldShowAllData,
    page,
    handleChangePage,
    isNoPagination,
    sticky,
  } = props;
  const tmpCurrentPage = useRef(1);
  const shouldIncreasePage = useRef(false);

  const onClickNext = () => {
    if (!shouldShowAllData) {
      tmpCurrentPage.current = page + 1;
      if (tmpCurrentPage.current > Math.ceil(totalData.length / 10)) {
        shouldIncreasePage.current = true;
        if (["notification", "monthly"].includes(name)) {
          fetchData(
            { reportCursor: totalData[totalData.length - 1]._id },
            true
          );
        } else if (name === "appointments") {
          fetchData(
            { carePlanCursor: totalData[totalData.length - 1]._id },
            true
          );
        } else {
          fetchData({ cursor: totalData[totalData.length - 1]._id }, true);
        }
      } else {
        handleChangePage(tmpCurrentPage.current);
      }
    }
  };

  useUpdateEffect(() => {
    if (shouldIncreasePage.current && page < Math.ceil(totalData.length / 10)) {
      shouldIncreasePage.current = false;
      handleChangePage(tmpCurrentPage.current);
    } else {
      tmpCurrentPage.current = page;
    }
  }, [totalData]);

  const onChangePage = (page: number) => {
    handleChangePage(page);
  };

  const handleTableChange = (
    pagination: any,
    filters: object,
    curSorter: any
  ) => {
    const shorthandOrder = sorter.order === "ascend" ? "asc" : "desc";
    if (
      !_.isEmpty(curSorter) &&
      !_.isEmpty(sorter) &&
      (curSorter.field !== sorter.field ||
        shorthandOrder !== curSorter.sorter.order)
    ) {
      fetchData({
        sortField: curSorter.field,
        sortOrder: shorthandOrder,
      });
    }
  };

  const itemRender = (current: any, type: string, originalElement: any) => {
    if (type === "prev") {
      if (page === 1) {
        return null;
      }
      return originalElement;
    }
    if (type === "next") {
      if (shouldShowAllData && page === Math.ceil(totalData.length / 10)) {
        return null;
      }
      return (
        !shouldHideNextButton && (
          <BoxItem
            icon={<RightOutlined className="color-gray-8" />}
            onClick={onClickNext}
          />
        )
      );
    }
    return originalElement;
  };

  return (
    <Table
      rowKey={rowKey}
      className={classnames(className, `table-basic`)}
      dataSource={totalData}
      onRow={(record, rowIndex) => ({
        onClick: (e) => {
          const cellText: any = document.getSelection();
          if (cellText.type === "Range") {
            e.stopPropagation();
          } else {
            onRowClick(rowIndex, record);
          }
        },
      })}
      pagination={
        isNoPagination
          ? false
          : {
              itemRender,
              onChange: onChangePage,
              current: page,
              showSizeChanger: false,
            }
      }
      locale={{ emptyText }}
      columns={columns}
      loading={loading}
      onChange={shouldShowAllData ? undefined : handleTableChange}
      sticky={sticky}
    />
  );
};

export default TableBasic;
