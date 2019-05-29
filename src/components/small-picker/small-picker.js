import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './small-picker.scss';
import left_arrow from '../../img/ic_angle-left.svg';
import right_arrow from '../../img/ic_angle-right.svg';
import { togglePopUp, changeShowedMonth } from '../../actions/actions';

const SmallPicker = ({ first_date, second_date, togglePopUp, changeShowedMonth }) => {
  first_date = new moment.unix(first_date).format('LL');
  second_date = new moment.unix(second_date).format('LL');
  return (
    <div className="small-picker">
      <i className="fas fa-calendar-alt" onClick={togglePopUp} />
      <div className="date" onClick={togglePopUp}>
        {first_date}-{second_date}
      </div>
      <div className="arrow-group">
        <img
          className="left-arrow"
          src={left_arrow}
          onClick={e => {
            changeShowedMonth(1);
          }}
          alt="arrow"
        />
        <img
          className="left-arrow"
          src={right_arrow}
          onClick={e => {
            changeShowedMonth(-1);
          }}
          alt="arrow"
        />
      </div>
    </div>
  );
};

SmallPicker.propTypes = {
  first_date: PropTypes.number,
  second_date: PropTypes.number,
  togglePopUp: PropTypes.func,
  changeShowedMonth: PropTypes.func
};

const mapStateToProps = state => {
  return {
    first_date: parseInt(state.saved_start),
    second_date: parseInt(state.saved_finish)
  };
};

export default connect(
  mapStateToProps,
  { togglePopUp, changeShowedMonth }
)(SmallPicker);
