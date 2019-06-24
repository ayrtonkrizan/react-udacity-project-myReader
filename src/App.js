import React from 'react'
import { Link, Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Shelf from "./Shelf"
import Search from "./Search"
import './App.css'

class BooksApp extends React.Component {
  SHELFS = [
    { id: 1, title: "Currently Reading", searchId: "currentlyReading" },
    { id: 2, title: "Want To Read", searchId: "wantToRead" },
    { id: 3, title: "Read", searchId: "read" }
  ]

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  getBooksByShelf(shelf) {
    return this.state.books.filter(b => b.shelf === shelf)
  }
  /*<Search event={()=> this.setState({ showSearchPage: false })}/>*/
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.SHELFS.map(s => <Shelf key={s.id} title={s.title} books={this.getBooksByShelf(s.searchId)} />)}
              </div>
            </div>

            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <Search event={() => this.setState({ showSearchPage: false })} />
        )} />
      </div>
    )
  }
}

export default BooksApp
