import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import './small-picker.scss';
import { togglePopUp } from '../../actions/actions';

const SmallPicker = ({ range, prevRange, togglePopUp }) => {
  let from, to;
  if (range.from !== undefined) {
    from = new moment(range.from).format('LL');
    to = new moment(range.to).format('LL');
  } else {
    from = new moment(prevRange.from).format('LL');
    to = new moment(prevRange.to).format('LL');
  }
  return (
    <div className="small-picker">
      <i className="fas fa-calendar-alt" onClick={togglePopUp} />
      <div className="date" onClick={togglePopUp}>
        {from}-{to}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    range: state.range,
    prevRange: state.prevRange
  };
};

export default connect(
  mapStateToProps,
  { togglePopUp }
)(SmallPicker);
