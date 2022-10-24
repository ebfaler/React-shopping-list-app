import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function LineItem({ item, handleCheck, handleDelete }) {
    return (
        <li className='item' >

            <input

                type="checkbox"
                checked={item.checked}
                //calling an anonymous function so that we can pass in a p[arameter into the handleCheck function]
                onChange={
                    () => handleCheck(item.id)
                }
            />

            <label
                style={(item.checked) ? { textDecoration: 'line-through' }
                    : null}
                onDoubleClick={() => handleCheck(item.id)}


            > {item.item} </label>

            {/* adding trash icon */}
            <FaTrashAlt
                onClick={
                    () => handleDelete(item.id)
                }
                role="button"
                tabIndex="0"
                // adding aria-label for accessibility
                aria-label={`Delete ${item.item}`}
            />
        </li>
    )
}


export default LineItem