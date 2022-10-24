import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa';

function AddItem({ newItem, setNewItem, handleSubmit }) {

    const inputRef = useRef();

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addItem'> Add Item</label>

            <input
                autoFocus
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                //setting value to state
                value={newItem}
                //onChange allows us to change state (shown in the inout field) when we type
                onChange={(e) => setNewItem(e.target.value)}
            />



            <button
                type='submit'
                aria-label='Add Item'
                //when button is clicked, focus is set back to the inputRef
                onClick={() => inputRef.current.focus()}

            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem