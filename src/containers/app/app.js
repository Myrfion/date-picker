import React, { Component } from 'react';
import SmallPicker from '../small-picker';
import PopUp from '../pop-up';
import { connect } from 'react-redux';
import { fetchLifeTime } from '../../actions/actions';
//import { selectRange } from '../../actions/actions';

class App extends Component {
  componentWillMount = () => {
    this.props.fetchLifeTime();
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
  { fetchLifeTime }
)(App);
