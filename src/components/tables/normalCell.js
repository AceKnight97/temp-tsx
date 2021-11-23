import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Tooltip } from 'antd';
import {
  CopyFilled, CalendarFilled, VideoCameraFilled, CloseCircleFilled,
  ThunderboltFilled,
  FileTextFilled,
} from '@ant-design/icons';
import classnames from 'classnames';
import _ from 'lodash';

import {
  TABLE_CELL_TYPE, SYM_ARR, SYM_WORD_ARR, APPOINTMENT_TYPES,
  TOOLTIP_MESSAGES,
  HM_NOTIFICATION_REPORT_PRIORITY,
} from '../../Constants';
import { dateFormated, timeFormated } from '../../Utils';
import { useMergeState } from '../../Helpers/customHooks';
import { HOLTER_AND_FOLLOW, STUDY_TYPES_ENUMS } from '../../Constants/carePlan';

const NormalCell = (props) => {
  const [state, setState] = useMergeState({
    overflowActive: false,
  });

  const divRef = useRef(undefined);

  const isEllipsisActive = (e = {}) => e.offsetWidth < e.scrollWidth;

  const {
    className, cell, type, onChange,
  } = props;

  useEffect(() => {
    if (type === 'EMAIL') {
      setState({ overflowActive: isEllipsisActive(divRef.current) });
    }
  }, []);

  const { overflowActive } = state;

  let cellCT = cell;

  const classNameCT = classnames(
    'normal-cell-wrapper',
    className,
  );

  const priorityClass = (priority) => {
    switch (priority) {
      case HM_NOTIFICATION_REPORT_PRIORITY.URGENT:
        return '--urgent';
      case HM_NOTIFICATION_REPORT_PRIORITY.EMERGENT:
        return '--emergent';
      default:
        return '';
    }
  };
  switch (type) {
    case TABLE_CELL_TYPE.DATE: {
      cellCT = dateFormated(cell);
      break;
    }
    case TABLE_CELL_TYPE.STUDY_TYPE: {
      if (cell === HOLTER_AND_FOLLOW) {
        cellCT = STUDY_TYPES_ENUMS.HOLTER;
      }
      break;
    }
    case TABLE_CELL_TYPE.REASON: {
      if (cell?.length === 0) {
        return '';
      }
      const tempArr = [];
      _.forEach(cell, (x) => {
        switch (x) {
          case SYM_ARR[0]: {
            tempArr.push(SYM_WORD_ARR[0]);
            break;
          }
          case SYM_ARR[1]: {
            tempArr.push(SYM_WORD_ARR[1]);
            break;
          }
          case SYM_ARR[2]: {
            tempArr.push(SYM_WORD_ARR[2]);
            break;
          }
          case SYM_ARR[3]: {
            tempArr.push(SYM_WORD_ARR[3]);
            break;
          }
          case SYM_ARR[4]: {
            tempArr.push(SYM_WORD_ARR[4]);
            break;
          }
          case SYM_ARR[5]: {
            tempArr.push(SYM_WORD_ARR[5]);
            break;
          }
          case SYM_ARR[6]: { // medi
            tempArr.push(SYM_WORD_ARR[6]);
            break;
          }
          case SYM_ARR[7]: {
            tempArr.push(SYM_WORD_ARR[7]);
            break;
          }
          case SYM_ARR[8]: {
            tempArr.push(SYM_WORD_ARR[8]);
            break;
          }
          case SYM_ARR[9]: {
            tempArr.push(SYM_WORD_ARR[9]);
            break;
          }
          case SYM_ARR[10]: {
            tempArr.push(SYM_WORD_ARR[10]);
            break;
          }
          default: {
            break;
          }
        }
      });
      cellCT = _.join(tempArr, ', ');
      break;
    }
    case TABLE_CELL_TYPE.DATE_TIME: {
      cellCT = timeFormated(cell);
      break;
    }
    case TABLE_CELL_TYPE.TIME: {
      cellCT = timeFormated(cell);
      break;
    }
    case TABLE_CELL_TYPE.CHECKBOX: {
      return (
        <Checkbox
          className={classnames(
            'normal-cell-wrapper', 'is-done-ct', className,
          )}
          onChange={() => {
            onChange(cell, props._id);
          }}
          checked={cellCT}
        />
      );
    }
    case TABLE_CELL_TYPE.BUTTON: {
      return (
        <div className={classNameCT}>
          <button
            className="bas-btn text-color-blue-7"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(props._id);
            }}
          >
            <span>{cellCT}</span>
          </button>
        </div>
      );
    }
    case TABLE_CELL_TYPE.COPY: {
      return (
        <div className={classNameCT}>
          <button
            className="copy-btn bas-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(props._id);
            }}
          >
            <CopyFilled />
          </button>
        </div>
      );
    }
    case TABLE_CELL_TYPE.FILE: {
      return (
        <div className={classNameCT}>
          <button
            className="copy-btn bas-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(props._id);
            }}
          >
            <FileTextFilled />
          </button>
        </div>
      );
    }
    case TABLE_CELL_TYPE.CREATE_APPOINTMENT: {
      return (
        <div className={classNameCT}>
          <button
            className="copy-btn bas-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick();
            }}
          >
            <CalendarFilled />
          </button>
        </div>
      );
    }
    case TABLE_CELL_TYPE.JOIN_APPOINTMENT: {
      return (
        <div className={classNameCT}>
          <button
            className="copy-btn bas-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.onClick(props._id);
            }}
          >
            <VideoCameraFilled />
          </button>
        </div>
      );
    }
    case TABLE_CELL_TYPE.EMAIL:
      if (overflowActive) {
        return (
          <Tooltip placement="top" title={cellCT}>
            <div className={classNameCT} ref={divRef}>
              <span>{cellCT}</span>
            </div>
          </Tooltip>
        );
      }
      break;
    case TABLE_CELL_TYPE.APPOINTMENT_TYPE: {
      if (cellCT === APPOINTMENT_TYPES[0]) {
        return (
          <div
            className={classnames(
              'normal-cell-wrapper', 'virtual-color', className,
            )}
          >
            <span>{cellCT}</span>
          </div>
        );
      }
      return (
        <div
          className={classnames(
            'normal-cell-wrapper', 'in-person-color', className,
          )}
        >
          <span>{cellCT}</span>
        </div>
      );
    }
    case TABLE_CELL_TYPE.PRIORITY: {
      return (
        <div
          className={classnames(
            'priority-cell',
            priorityClass(cellCT),
            className,
          )}
        >
          {cellCT}
        </div>
      );
    }
    default:
      break;
  }

  return (
    <div className={classNameCT} ref={divRef}>
      <span>{cellCT}</span>

      {
        props.isCancel
        && (
        <Tooltip placement="bottom" title={TOOLTIP_MESSAGES.CANCELED_APPOINTMENT}>
          <CloseCircleFilled className="cancel-appointment-icon" />
        </Tooltip>
        )
      }

      {
        !props.isManual && cellCT === 'Appointment'
        && (
        <Tooltip placement="bottom" title={TOOLTIP_MESSAGES.AUTO_APPOINTMENT}>
          <ThunderboltFilled className="auto-appointment-icon" />
        </Tooltip>
        )
      }
    </div>
  );
};

NormalCell.defaultProps = {
  className: undefined,
  cell: '',
  type: 'text',
  onChange: () => { },
  onClick: () => { },
  _id: '',
  isCancel: false,
  isManual: true,
};

NormalCell.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string,
  cell: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.string),
  ]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isCancel: PropTypes.bool,
  isManual: PropTypes.bool,
};

export default NormalCell;
