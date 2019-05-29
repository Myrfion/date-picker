import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import CalendarNavbar from '../../components/calendar-navbar';

import './left-side-container.scss';
import 'react-day-picker/lib/style.css';
import CalendarHeader from '../../components/calendar-header';
import { updateRange, applyCalendar, cleanSelection, setSnippet } from '../../actions/actions';

class LeftSideContainer extends Component {
  static defaultProps = {
    numberOfMonths: 2
  };
  _dayClickHandler = day => {
    this.props.updateRange(day);
    this.props.setSnippet('');
  };
  render() {
    const { numberOfMonths, range, applyCalendar, cleanSelection } = this.props;
    const { from, to } = range;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <div className="calendars-container">
          <DayPicker
            className="Selectable"
            numberOfMonths={numberOfMonths}
            modifiers={modifiers}
            selectedDays={[from, { from, to }]}
            onDayClick={this._dayClickHandler}
            navbarElement={CalendarNavbar}
            captionElement={CalendarHeader}
          />
        </div>
        <div className="buttons-container">
          <button className="default-btn" onClick={cleanSelection}>
            clearSelection
          </button>
          <button className="apply-btn default-btn" onClick={applyCalendar}>
            Apply
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    range: state.range
  };
};

export default connect(
  mapStateToProps,
  { updateRange, applyCalendar, cleanSelection, setSnippet }
)(LeftSideContainer);
