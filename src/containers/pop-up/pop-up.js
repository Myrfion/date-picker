import React from 'react';
import { connect } from 'react-redux';

import RangeList from '../range-list';
import LeftSideContainer from '../left-side-container';

import './pop-up.scss';

const PopUp = ({ isPopUpShowed }) => {
  if (isPopUpShowed) {
    return (
      <div className="pop-up">
        <LeftSideContainer />
        <RangeList />
      </div>
    );
  } else {
    return <div />;
  }
};

const mapStateToProps = state => {
  return {
    isPopUpShowed: state.isPopUpShowed
  };
};

export default connect(mapStateToProps)(PopUp);
