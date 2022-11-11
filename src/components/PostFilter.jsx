import React from 'react';
import MyInput from "./UI/Input/MyInput";
import classes from "./UI/Input/MyInput.module.css";
import MySelect from "./UI/Select/MySelect";

const PostFilter = (props) => {
    return (
        <div className='filter'>
            <MyInput
                className={classes.mySrch}
                value={props.filter.search}
                onChange={event => props.setFilter({...props.filter, search: event.target.value})}
                placeholder="Search..."
                type="text"/>
            <MySelect
                defaultValue="Sorting"
                options={[
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'}
                ]}
                value={props.filter.sort}
                onChange={selectedSort => props.setFilter({...props.filter, sort: selectedSort})}
            />
        </div>
    );
};

export default PostFilter;