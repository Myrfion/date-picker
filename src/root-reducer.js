import { GENERATE_CALENDAR, SELECT_DAY, UPDATE_SELECTED_FINISH, UPDATE_SELECTED_START, FETCH_LIFE_TIME_SUCCESS, CLEAN_SELECTION, CHANGE_SHOWED_MONTH, TOGGLE_POP_UP } from "./actions/names";

const initialState = {
    monthes: [],
    current_selected_start:0,
    current_selected_finish:0,
    current_showed_month: 8,
    life_time: "2018-09-17T00:00:00",
    is_pop_up_showed: false,
    saved_start: 0,
    saved_finish:0
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GENERATE_CALENDAR:
            return {...state, monthes: action.payload};
        case UPDATE_SELECTED_START:
            return {...state,current_selected_start: action.payload,saved_start: action.payload};
        case UPDATE_SELECTED_FINISH:
            return {...state,current_selected_finish: action.payload,saved_finish: action.payload}
        case FETCH_LIFE_TIME_SUCCESS:
            return {...state,life_time: action.payload};
        case CLEAN_SELECTION:
            return {...state,current_selected_finish: 0,current_selected_start: 0}
        case CHANGE_SHOWED_MONTH:
            return {...state,current_showed_month: action.payload};
        case TOGGLE_POP_UP:
            return {...state, is_pop_up_showed: !state.is_pop_up_showed};
    }
    return state;
} 

export default rootReducer;