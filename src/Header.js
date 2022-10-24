import React from 'react'

//passing in props, which come from the parent App component
//here I am using object destructiring others would pass in 'props' and return props.title
function Header({ title }) {

    // const headerStyle = {
    //     backgroundColor: 'mediumblue',
    //     color: '#fff'
    // }

    return (
        <header  >
            <h1> {title} </h1>

        </header>
    )
}

// setting default value if there is no title
Header.defaultProps = {
    title: "Default Title"
}

export default Header;