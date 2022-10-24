import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequests';

function App() {

  const API_URL = 'http://localhost:3500/items'

  //adding items to App parents level

  //setting state for items
  //if shopping list is null, then the application will at least have something to work with
  //here we are loading local storage
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);


  const [items, setItems] = useState([]);

  //setting state for search
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null);
  // data is loading at first
  const [isLoading, setIsLoading] = useState(true);

  //set local state at load time
  // useEffect(() => {
  //   //saving local storage in useEffect/ Anytime items changes we will save the items state
  //   // Items are saved in local storage under the name 'shopping list' 
  //   localStorage.setItem('shoppinglist', JSON.stringify(items));
  // }, [items])


  useEffect(() => {

    //There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.

    // The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
    const fetchItems = async () => {
      try {
        //The keyword await makes JavaScript wait until that promise settles and returns its result.
        const response = await fetch(API_URL);

        if (!response.ok) throw Error('Did not recieve expected data');
        //converting the repsonse to json
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
        console.log(`fetchError is: ${fetchError}`);

      }
      catch (err) {
        setFetchError(err.message)
        console.log(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    //simulating a delay to the api call
    setTimeout(() => {
      fetchItems();
    }, 2000)

  }, [])




  //state for new items
  const [newItem, setNewItem] = useState('')




  //*function to add new item to the list*//
  const addItem = async (item) => {
    //ternary statement: increment the item id if there are items, else set the id to 1

    //I'm selecting the array number which is 1 less than the length. Then with that selected array I choose the id,then add 1 to the id
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = {
      id,
      checked: false,
      item
    }
    //create a new array using the spread operator which spreads items into several arguments, then we add the myNewItem to the end
    const listItems = [...items, myNewItem]
    setItems(listItems)

    //fucntion to create api request
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);

  }



  //*function to check length of list *//
  const handleCheck = async (id) => {
    // console.log(`key: ${id}`);
    const listItems = items.map((item) =>
      //ternary operator to check if id parameter in handleCheck function is the same as the item.id
      item.id === id ? {
        ...item,
        checked: !item.checked
      } : item);


    setItems(listItems)


    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    //if we have a result, we know there is a message that is not null so we get the fetch error and pass in result
    if (result) setFetchError(result);

  }

  //*function to delete item *//
  const handleDelete = async (id) => {
    //filter will create a new array that filters out => the item id that is equal to id
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);


  }



  //*function to submit new item to list *//
  const handleSubmit = (e) => {
    /* prevent default behaviour of the submit event (which is to reload the page)*/
    e.preventDefault();
    //if the item is empty, we can just return and exit the function altogether. After that we can set a new item
    if (!newItem) return;
    //runs the addItem function
    addItem(newItem)
    setNewItem('');

  }


  //RETURN Item//

  return (
    <div className="App">
      {/* importing Header component */}
      <Header title="Groceries" />

      <AddItem
        handleSubmit={handleSubmit}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {/* if we have a fetch error, we will display the error on page */}
        {isLoading && <p style={{ color: "blue" }}> Loading </p>}
        {fetchError && <p style={{ color: "red" }}> {`Error: ${fetchError}`} </p>}
        {!fetchError && !isLoading && <Content
          //setting a filter so that filter results are shown on list 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleDelete={handleDelete}
          handleCheck={handleCheck}

        />}
      </main>

      <Footer length={items.length} />


      {/* curly brackets indicate a jsx expression */}
      {/* <p>{[1, 2, 3]}</p> */}


    </div>
  );
}

export default App;
