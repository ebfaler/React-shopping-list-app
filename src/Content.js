import React from 'react'

import ItemList from './ItemList';

//parameter is the props passed from App component
function Content({ items, handleCheck, handleDelete }) {
    // name is the initial state and setName allows us to set the state


    return (
        <>
            {/* ternary operator which if true includes a message to say that the list is empty */}
            {items.length ? (

                //these are the props I will pass to ItemLists prop.
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />

            ) : (
                <p style={{ marginTop: '2rem' }}> Your list is empty </p>
            )}
        </>
    )
}

export default Content;
