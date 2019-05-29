import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Calendar from '../calendar/calendar';

import './left-side-container.scss';
import { generateCalendar, clearSelection, applyCalendar } from '../../actions/actions';

const LeftSideContainer = ({ monthes, current_showed_month, clearSelection, applyCalendar }) => {
  if (monthes.length !== 0) {
    return (
      <div>
        <div className="calendars-container">
          <Calendar data={monthes[current_showed_month - 1]} arrow_side="left" />
          <Calendar data={monthes[current_showed_month]} arrow_side="right" />
        </div>
        <div className="buttons-container">
          <button onClick={clearSelection} className="default-btn">
            clearSelection
          </button>
          <button onClick={applyCalendar} className="apply-btn default-btn">
            Apply
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Empty</div>;
  }
};

LeftSideContainer.prototype = {
  monthes: propTypes.array,
  current_showed_month: propTypes.number,
  clearSelection: propTypes.func,
  applyCalendar: propTypes.func
};

const mapStateToProps = state => {
  return {
    monthes: state.monthes,
    current_showed_month: state.current_showed_month
  };
};

export default connect(
  mapStateToProps,
  { generateCalendar, clearSelection, applyCalendar }
)(LeftSideContainer);
