import React from 'react';
import propTypes from 'prop-types';

import './button.scss';

const Button = ({clickFunction,title,style}) => {
    return(
        <p className="button" style={style} onClick={clickFunction}>{title}</p>
    )
}

Button.propTypes = {
    clickFunction: propTypes.func,
    title: propTypes.string,
    style: propTypes.object
}

export default Button;
