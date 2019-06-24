import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import Book from './Book';

export default class Search extends Component {
    /** Maximium Result in search API **/
    MAX_RESULTS = 30;

    state = {
        searchBooks: [],
        searched: false
    }

    updateQuery(query) {
        this.setState({ searchBooks: [], searched: false });
        if (!query)
            return;

        this.props.APIsearch(query, this.MAX_RESULTS).then((books) => {
            if (books.length) {
                books.forEach((book, index) => {
                    let myBook = this.props.books.find((b) => b.id === book.id);
                    book.shelf = myBook ? myBook.shelf : 'none';
                    books[index] = book;
                });

                this.setState({
                    searchBooks: books
                });
            }
            else
                this.setState({ searched:true })
        });

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="800" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value.trim())}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.searchBooks.length === 0 && this.state.searched? 
                        <span>Books not found</span>
                        :
                        <ol className="books-grid">
                            {this.state.searchBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book} changeShelf={this.props.changeShelf}/>
                                </li>
                            ))}
                        </ol>
                    }
                </div>
            </div>
        )
    }
}