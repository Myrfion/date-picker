import moment from 'moment';
import { DateUtils } from 'react-day-picker';

import store from '../store';
import {
  FETCH_LIFE_TIME_START,
  FETCH_LIFE_TIME_SUCCESS,
  APPLY_CALENDAR,
  TOGGLE_POP_UP,
  UPDATE_RANGE,
  UPDATE_RANGE_ERROR,
  SET_SNIPPET,
  CLEAN_SELECTION,
  UDPATE_PREV_RANGE
} from './names';

const start_sales_url = 'https://staging.sellermetrix.com/api/test/start_of_sales?marketplace=usa';

export const updatePrevRange = () => {
  return {
    type: UDPATE_PREV_RANGE
  };
};

export const updateRange = day => {
  const day_unix = moment(day).unix();
  const payload = DateUtils.addDayToRange(day, store.getState().range);
  if (
    moment()
      .add(1, 'days')
      .startOf('day')
      .unix() >= day_unix &&
    moment(store.getState().lifeTime).unix() <= day_unix &&
    (payload.from || payload.to)
  ) {
    return {
      type: UPDATE_RANGE,
      payload
    };
  }
  return {
    type: UPDATE_RANGE_ERROR
  };
};

export const fetchLifeTime = () => {
  fetch(start_sales_url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(response => {
      store.dispatch({
        type: FETCH_LIFE_TIME_SUCCESS,
        payload: response.date
      });
    })
    .catch(err => {
      console.log(err);
    });

  return {
    type: FETCH_LIFE_TIME_START
  };
};

export const togglePopUp = () => {
  return {
    type: TOGGLE_POP_UP
  };
};

export const applyCalendar = () => {
  alert('This action was called due to ui of other components should change with the new range');
  return {
    type: APPLY_CALENDAR
  };
};

export const updateRangeToToday = date => {
  const { dispatch } = store;

  dispatch(updateRange(moment().toDate()));
  dispatch(updateRange(date));
};

export const cleanSelection = () => {
  return {
    type: CLEAN_SELECTION
  };
};

export const setSnippet = payload => {
  switch (payload) {
    case 'Today':
      updateRangeToToday(moment().toDate(), moment().toDate());
      break;
    case 'Yersterday':
      store.dispatch(
        updateRange(
          moment()
            .subtract(1, 'days')
            .toDate()
        )
      );
      store.dispatch(
        updateRange(
          moment()
            .subtract(1, 'days')
            .toDate()
        )
      );
      break;
    case 'Last 7 days':
      updateRangeToToday(
        moment()
          .subtract(1, 'week')
          .toDate()
      );
      break;
    case 'This Month':
      updateRangeToToday(
        moment()
          .startOf('month')
          .toDate()
      );
      break;
    case 'Last Month':
      updateRangeToToday(
        moment()
          .subtract(1, 'months')
          .toDate()
      );
      break;
    case 'This Year':
      updateRangeToToday(
        moment()
          .startOf('years')
          .toDate()
      );
      break;
    case 'Lifetime':
      updateRangeToToday(moment(store.getState().lifeTime).toDate());
      break;
    default:
  }
  return {
    type: SET_SNIPPET,
    payload
  };
};
