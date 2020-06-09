import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
    	name: 'Mark Twain',
    	imageUrl: 'images/authors/marktwain.jpg',
    	imageSource: 'Wikimedia Commons',
    	books: ['The Adventures of Huckleberry Finn','Life on the Mississipi', 'Roughing It']
	},
	{
    	name: 'JK Rowling',
    	imageUrl: 'images/authors/jkrowling.jpg',
    	imageSource: 'Wikimedia Commons',
    	books: ['Harry potter and the chamber of secret','Harry potter and the sorcerors stone']
	},
	{
    	name: 'George RR Martin',
    	imageUrl: 'images/authors/georgerrmartin.jpg',
    	imageSource: 'Wikimedia Commons',
    	books: ['Game of Thrones','Fire and Blood']
	},
	{
    	name: 'William Shakespeare',
    	imageUrl: 'images/authors/shakespeare.jpg',
    	imageSource: 'Wikimedia Commons',
    	books: ['Macbeth','Hamlet', 'Julius Caeser']
	},
	{
    	name: 'Jane Austen',
    	imageUrl: 'images/authors/janeausten.jpg',
    	imageSource: 'Wikimedia Commons',
    	books: ['Pride and Prejudice','Sense and Sensibility', 'Emma']
    }

];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p,c,i) {
	  return (p.concat(c.books))
  },[]);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);
  return {
	 books: fourRandomBooks,
	 author: authors.find((author) => author.books.some((title) => title === answer)) 
     };
}
function resetState() {
	return {
		turnData : getTurnData(authors),
		highlight: ''
	}
}
let state = resetState();
function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}
 
 function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} 
	onContinue= {() => {
	 state= resetState();
	 render();
	}}
	/>;	
 }
 const AuthorWrapper = withRouter(({history}) => 
	 <AddAuthorForm onAddAuthor={(author) => {
		 authors.push(author);
	  history.push('/');
   }} />
 )

function render() {
ReactDOM.render(<BrowserRouter>
<React.Fragment>
<Route basename="/React_Apps/authorquiz" exact path="/" component={App} />
<Route exact path="/add" component={AuthorWrapper} />
</React.Fragment>
</BrowserRouter>, document.getElementById('root'));
}
render();
serviceWorker.unregister();
