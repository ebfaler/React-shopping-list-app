import React from 'react'

const today = new Date();
function Footer({ length }) {
    return (
        <footer>
            {/* logic encapsualted inside the footer component */}
            <p> {length} List {length === 1 ? "item" : "items"} </p>
            <p>Copyright &copy; {today.getFullYear()}</p>

        </footer>
    )
}

export default Footer