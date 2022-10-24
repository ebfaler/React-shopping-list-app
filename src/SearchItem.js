import React from 'react'

const SearchItem = ({ search, setSearch }) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmltFor='search'> Search</label>

            <input

                id='search'
                type='text'
                role='searchBox'
                placeholder='Search Items'
                value={search}
                //here we set the state with setSearch
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchItem