import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import RangeList from '../range-list';
import LeftSideContainer from '../left-side-container/left-side-container';

import './pop-up.scss';

const PopUp = ({ is_pop_up_showed }) => {
  if (is_pop_up_showed) {
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

PopUp.propTypes = {
  is_pop_up_showed: propTypes.bool
};

const mapStateToProps = state => {
  return {
    is_pop_up_showed: state.is_pop_up_showed
  };
};

export default connect(mapStateToProps)(PopUp);
