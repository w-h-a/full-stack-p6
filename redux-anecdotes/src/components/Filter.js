import React from 'react'

const Filter =
    ({ dispatch }) =>
        <>
            <div style={{marginBottom: 10}}>
                filter <input onChange={e => dispatch({type: "FILTER", payload: e})}/>
            </div>
        </>

export default Filter
