import React, { Component } from 'react';

class ShelfChanger extends Component{
    render(){
        return(
            <div className="book-shelf-changer">
                <select
                    value={this.props.currentShelf}
                    onChange={this.props.changeShelf}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default class Book extends Component {

    render() {
        return (
            <div className="book" id={this.props.book.id}>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <ShelfChanger currentShelf={this.props.book.shelf} changeShelf={ (event)=> this.props.changeShelf(this.props.book, event.target.value)}/>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}