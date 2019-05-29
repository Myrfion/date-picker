import React, { Component } from 'react';
import { connect } from 'react-redux';

import './range-list.scss';
import { setSnippet } from '../../actions/actions';
//import { selectRange } from '../../actions/actions';

class RangeList extends Component {
  state = [
    'Today',
    'Yersterday',
    'Last 7 days',
    'This Month',
    'Last Month',
    'This Year',
    'Lifetime'
  ];

  render() {
    const { snippet, setSnippet } = this.props;
    return (
      <div className="range-list">
        <ul>
          {this.state.map((value, key) => {
            return (
              <li
                key={key}
                className={snippet === value ? 'selected' : ''}
                onClick={() => setSnippet(value)}
              >
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    snippet: state.selectedSnippet
  };
};

export default connect(
  mapStateToProps,
  { setSnippet }
)(RangeList);
