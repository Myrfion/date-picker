import React,{Component} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import './range-list.scss';
import { selectRange } from '../../actions/actions';

class RangeList extends Component{
    state = {
        list:[
            {title: "Today",selected: true},
            {title: "Yersterday",selected: false},
            {title: "Last 7 days",selected: false},
            {title: "Last 30 days",selected: false},
            {title: "This Month",selected: false},
            {title: "Last Month",selected: false},
            {title: "This Year",selected: false},
            {title: "Lifetime",selected: false}
        ]
    }
    _clickHandler = (e) => {
        const {selectRange} = this.props;
        const title = e.currentTarget.innerHTML;
        this.setState((prevState)=>{
            prevState.list.find((el)=>{
                if(el.selected) el.selected = false;
                if(el.title == title){
                    el.selected = true;
                }
            })
            return prevState;
        })
        selectRange(title);
    }
    render(){
        const {list} = this.state; 
        
        return(
            <div className="range-list">
                <ul>
                    {
                        list.map((item,key)=>{
                            return <li key={key} className={(item.selected ? "selected" : "")} onClick={this._clickHandler}>{item.title}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

RangeList.propTypes = {
    selectRange: propTypes.func,
    list: propTypes.array
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps,{selectRange})(RangeList);