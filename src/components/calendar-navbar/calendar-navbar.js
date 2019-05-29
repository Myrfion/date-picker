import React, { Component } from 'react';

import './calendar-navbar.scss';
import left_double_arrow from '../../img/ic_angle_double_left.svg';
import right_double_arrow from '../../img/ic_angle_double_right.svg';
import left_arrow from '../../img/ic_angle-left.svg';
import right_arrow from '../../img/ic_angle-right.svg';

class CalendarNavbar extends Component {
  componentWillMount = () => {
    this.props.onPreviousClick(); //because calendar shows current month like a first
  };
  render() {
    const { onPreviousClick, onNextClick, className } = this.props;
    return (
      <div className={className + ' calendar-navbar'}>
        <div className="left-group">
          <img src={left_arrow} onClick={() => onPreviousClick()} alt="left arrow" />
          <img
            src={left_double_arrow}
            onClick={() => {
              onPreviousClick();
              onPreviousClick();
            }}
            alt="left arrow"
          />
        </div>
        <div className="right-group">
          <img
            src={right_double_arrow}
            onClick={() => {
              onNextClick();
              onNextClick();
            }}
            alt="right arrow"
          />
          <img src={right_arrow} onClick={() => onNextClick()} alt="right arrow" />
        </div>
      </div>
    );
  }
}

export default CalendarNavbar;
