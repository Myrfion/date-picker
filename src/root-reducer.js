import {
  FETCH_LIFE_TIME_SUCCESS,
  TOGGLE_POP_UP,
  UPDATE_RANGE,
  SET_SNIPPET,
  CLEAN_SELECTION
} from './actions/names';

const initialState = {
  prevRange: {
    from: undefined,
    to: undefined
  },
  range: {
    from: undefined,
    to: undefined
  },
  lifeTime: '2018-09-17T00:00:00',
  isPopUpShowed: false,
  selectedSnippet: 'Last 30 days'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIFE_TIME_SUCCESS:
      return { ...state, lifeTime: action.payload };
    case TOGGLE_POP_UP:
      return { ...state, isPopUpShowed: !state.isPopUpShowed };
    case UPDATE_RANGE:
      return { ...state, prevRange: state.range, range: action.payload };
    case SET_SNIPPET:
      return { ...state, selectedSnippet: action.payload };
    case CLEAN_SELECTION:
      return {
        ...state,
        prevRange: state.range,
        range: {
          from: undefined,
          to: undefined
        }
      };
    default:
  }
  return state;
};

export default rootReducer;
