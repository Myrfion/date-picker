import moment from 'moment';
import store from '../store';
import { GENERATE_CALENDAR, SELECT_DAY, UPDATE_SELECTED_START, UPDATE_SELECTED_FINISH, SELECT_RANGE, FETCH_LIFE_TIME_START, FETCH_LIFE_TIME_SUCCESS, CLEAN_SELECTION, APPLY_CALENDAR, CHANGE_SHOWED_MONTH, CHANGE_SHOWED_MONTH_ERROR, SELECT_DAY_ERROR, TOGGLE_POP_UP, CLEAN_SUCCESS} from "./names";

const start_sales_url = "https://staging.sellermetrix.com/api/test/start_of_sales?marketplace=usa";

export const generateCalendar = (start = store.getState().life_time) => {

    const selected_start = store.getState().current_selected_start;
    
    const selected_finish = store.getState().current_selected_finish !== 0 ? store.getState().current_selected_finish : selected_start;

    let iterator = new moment(start);
    iterator = iterator.startOf('month');
    let today = moment();
    
    let month = {
        title: iterator.format("MMMM YYYY"),
        days: [],
        offset: iterator.day() - 1,
        
    };
    let payload = [];
    const compate_date = today.add(1,'months').startOf('month').format('MMMM Do YYYY');
    while(iterator.format('MMMM Do YYYY') !== compate_date)
    {
        if(iterator.format("MMMM YYYY") !== month.title){
            payload.push(month);
            month = {
                title:  iterator.format("MMMM YYYY"),
                days: [],
                offset: iterator.day() - 1
            }
        }
        
        month.days.push({
            num: iterator.date(),
            active: iterator.unix() >= selected_start && iterator.unix() <= selected_finish ? true : false,
            unix_time: iterator.unix(),
            is_first: selected_start == iterator.unix() ? true: false,
            is_last: selected_finish == iterator.unix() ? true: false
        })
        //console.log(compate_date,iterator)
        iterator.add(1,'days'); 
    }
    payload.push(month);
    return{
        type: GENERATE_CALENDAR,
        payload
    }
}
export const selectDay = (unix_time) => {
    const {dispatch} = store;
    const state = store.getState();
    const {current_selected_finish,current_selected_start} = state;
    if(unix_time >= moment(store.getState().life_time).unix() && unix_time <= moment().startOf('day').unix()){
        if(state.current_selected_start === 0){
            dispatch(updateSelectedStart(unix_time));
            dispatch(updateSelectedFinish(unix_time));
        }else{
            if(unix_time > current_selected_start && unix_time < current_selected_finish ){
                dispatch(updateSelectedStart(unix_time));
            }
            else if(unix_time > current_selected_finish){
                dispatch(updateSelectedStart(current_selected_finish));
                dispatch(updateSelectedFinish(unix_time));
                
            }else if(unix_time < current_selected_finish){
                dispatch(updateSelectedFinish(current_selected_start));
                dispatch(updateSelectedStart(unix_time));
            }
        }
        return {
            type: SELECT_DAY
        }
    }
    return {
        type: SELECT_DAY_ERROR
    }
}

export const selectRange = (type) => {
    const {dispatch} = store;
   
    switch(type){
        case "Today":
            dispatch(updateSelectedStart(moment().startOf('day').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "Yersterday":
            dispatch(updateSelectedStart(moment().startOf('day').subtract(1,'days').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').subtract(1,'days').unix()));
            break;  
        case "Last 7 days":
            dispatch(updateSelectedStart(moment().subtract(1,'weeks').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "Last 30 days":
            dispatch(updateSelectedStart(moment().subtract(1,'months').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "This Month":
            dispatch(updateSelectedStart(moment().startOf('month').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "This Month":
            dispatch(updateSelectedStart(moment().startOf('month').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "Last Month":
            dispatch(updateSelectedStart(moment().subtract(1,'months').startOf('month').unix()));
            dispatch(updateSelectedFinish(moment().subtract(1,'months').endOf('month').unix()));
            break;
        case "This Year":
            dispatch(updateSelectedStart(moment().startOf('year').unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
        case "Lifetime":
            dispatch(updateSelectedStart(moment(store.getState().life_time).unix()));
            dispatch(updateSelectedFinish(moment().startOf('day').unix()));
            break;
    }
    dispatch(generateCalendar());
    return {
        type: SELECT_RANGE,
        
    }
}

const updateSelectedStart = payload => {
    return {
        type: UPDATE_SELECTED_START,
        payload
    }
}

const updateSelectedFinish = payload => {
    return {
        type: UPDATE_SELECTED_FINISH,
        payload
    }
}

export const fetchLifeTime = () => {
    fetch(start_sales_url,
    {
        method: "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        } 
    })
    .then(resp => resp.json())
    .then((response)=>{
        store.dispatch({
            type: FETCH_LIFE_TIME_SUCCESS,
            payload: response.date
        })
    })
    .catch(err => {
        console.log(err);
    })
    
    return{
        type:FETCH_LIFE_TIME_START,
        
    }
}

export const clearSelection = () => {
    store.dispatch({
        type:CLEAN_SELECTION
    })    
    store.dispatch(generateCalendar());
    return{
        type: CLEAN_SUCCESS
    }
}


export const applyCalendar = () => {
    const range_start = store.getState().saved_start;
    const range_finish = store.getState().saved_finish;
    alert("Range Start: " + moment.unix(range_start).format("MMMM Do YYYY"));
    alert("Range Finish: " + moment.unix(range_finish).format("MMMM Do YYYY"));
    return{
        type: APPLY_CALENDAR
    }
}

export const changeShowedMonth = (n) => {
   
    const payload = store.getState().current_showed_month - n ;
    if(payload > 0 && payload < store.getState().monthes.length) {
        return{
            type:CHANGE_SHOWED_MONTH,
            payload
        }
    }
    return {
        type: CHANGE_SHOWED_MONTH_ERROR,
    }
}

export const togglePopUp = () => {
    return {
        type: TOGGLE_POP_UP
    }
}