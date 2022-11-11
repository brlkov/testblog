import React from 'react';

const Pagination = (props) => {
    return (
        <div className="pages">
            {props.pagesArray.map(p =>
                <span
                    onClick={() => props.setPage(p)}
                    key={p}
                    className={props.page === p ? 'page page_current' : 'page'}
                >
                    {p}
                    </span>)}
        </div>
    );
};

export default Pagination;