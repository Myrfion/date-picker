import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './calendar.scss';
import { selectDay, generateCalendar, changeShowedMonth } from '../../actions/actions';

import left_arrow from '../../img/ic_angle-left.svg';
import right_arrow from '../../img/ic_angle-right.svg';
import left_double_arrow from '../../img/ic_angle_double_left.svg';
import right_double_arrow from '../../img/ic_angle_double_right.svg';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    };
  }
  _minusOffset = () => {
    this.setState(prevState => {
      return {
        offset: prevState.offset - 1
      };
    });
  };
  _dayClickHandler = e => {
    this.props.selectDay(e.currentTarget.dataset.timeUnix);
    this.props.generateCalendar();
  };
  _arrowClickHandler = e => {
    this.props.changeShowedMonth(e.currentTarget.dataset.number);
  };
  render() {
    const { data, arrow_side } = this.props;
    let offsetRow = [];
    for (let i = 0; i < data.offset; i++) {
      offsetRow.push(<div key={i} className="calendar-item" />);
    }

    return (
      <div className="calendar">
        <header>
          {arrow_side == 'left' && (
            <div className="arrow_container arrow_container_left">
              <img onClick={this._arrowClickHandler} src={left_arrow} data-number="1" />
              <img onClick={this._arrowClickHandler} src={left_double_arrow} data-number="2" />
            </div>
          )}

          <p className={arrow_side == 'left' ? 'title title_left' : 'title title_right'}>
            {data.title}
          </p>

          {arrow_side == 'right' && (
            <div className="arrow_container arrow_container_right">
              <img onClick={this._arrowClickHandler} src={right_double_arrow} data-number="-2" />
              <img onClick={this._arrowClickHandler} src={right_arrow} data-number="-1" />
            </div>
          )}
        </header>
        <div className="calendar-field">
          <div className="calendar-row">
            {this.state.weekDays.map((value, key) => {
              // console.log(key);
              return (
                <div key={key} className="calendar-item">
                  {value}
                </div>
              );
            })}
          </div>
          <div className="calendar-row">
            {offsetRow}
            {data.days.map((value, key) => {
              let classes = 'calendar-item';
              classes += value.active ? ' active' : '';
              classes += value.is_first ? ' active-first' : '';
              classes += value.is_last ? ' active-last' : '';
              return (
                <div
                  key={key}
                  className={classes}
                  onClick={this._dayClickHandler}
                  data-time-unix={value.unix_time}
                >
                  {value.num}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  data: PropTypes.object,
  arrow_side: PropTypes.string,
  selectDay: PropTypes.func,
  generateCalendar: PropTypes.func,
  changeShowedMonth: PropTypes.func
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { selectDay, generateCalendar, changeShowedMonth }
)(Calendar);
