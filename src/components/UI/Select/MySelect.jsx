import React from 'react';
import classes from "./MySelect.module.css";

const MySelect = (props) => {
    return (
        <select
            className={classes.mySel}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
        >
            <option value="">{props.defaultValue}</option>
            {props.options.map(option =>
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
            )}
        </select>
    );
};

export default MySelect;