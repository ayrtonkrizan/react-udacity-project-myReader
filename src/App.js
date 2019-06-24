import React from 'react'
import { Link, Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Shelf from "./Shelf"
import Search from "./Search"
import './App.css'

class BooksApp extends React.Component {
  /** Constant to control Shelfs **/
  SHELFS = [
    { id: 1, title: "Currently Reading", searchId: "currentlyReading" },
    { id: 2, title: "Want To Read", searchId: "wantToRead" },
    { id: 3, title: "Read", searchId: "read" }
  ]

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  /* Function to filter books sate by shelf */
  getBooksByShelf(shelf) {
    return this.state.books.filter(b => b.shelf === shelf)
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;

      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

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
                {this.SHELFS.map(s => <Shelf key={s.id} title={s.title} books={this.getBooksByShelf(s.searchId)} changeShelf={this.changeShelf}/>)}
              </div>
            </div>

            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <Search APIsearch={BooksAPI.search} books={this.state.books} changeShelf={this.changeShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
