import React, { Component } from 'react';
import SmallPicker from '../small-picker';
import PopUp from '../pop-up';
import { connect } from 'react-redux';
import { generateCalendar, selectRange } from '../../actions/actions';

class App extends Component {
  componentWillMount = () => {
    this.props.generateCalendar();
    this.props.selectRange('Today');
  };
  render() {
    return (
      <div className="container">
        <SmallPicker />
        <PopUp />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { generateCalendar, selectRange }
)(App);
