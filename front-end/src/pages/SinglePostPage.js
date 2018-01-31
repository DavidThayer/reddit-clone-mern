import React, { Component } from 'react';

class SinglePostPage extends Component {
	constructor() {
		super();
		this.state = {
			myPost: {},
			newComment: ''
		}
		this.addComment = this.addComment.bind(this);
		this.updateCommentInState = this.updateCommentInState.bind(this);
	}
	componentDidMount() {
  	let idOfPostToDisplay = this.props.match.params.post_id; // gets :post_id from URL
		fetch('http://localhost:8080/api/posts/' + idOfPostToDisplay)
			.then(res => res.json())
			.then(json => {
				// console.log(json)
				this.setState({myPost: json});
			});
	}

	addComment(e) {
		e.preventDefault();

  	let idOfCurrentPost = this.props.match.params.post_id;

		fetch(`http://localhost:8080/api/posts/${ idOfCurrentPost }/comments`, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    content: this.state.newComment,
		    votes: 0
		  })
		}).then(res => {
			return res.json();
		}).then(json => {
			this.setState({
				myPost: { 
					title: this.state.myPost.title,
					content: this.state.myPost.content,
					votes: this.state.myPost.votes,
					thumbnail_image_url: this.state.myPost.thumbnail_image_url,
					comments: this.state.myPost.comments.concat(json) 
				},
				newComment: ''
			})
		})
	}

	updateCommentInState(e) {
		this.setState({ newComment: e.target.value });
	}

  render() {
    return (
      <div className="SinglePostPage">
	      <img height="100" src={ this.state.myPost.thumbnail_image_url }/>
	      <h1>{ this.state.myPost.title }</h1>
	      <p>{ this.state.myPost.content }</p>
	      <p>{ this.state.myPost.votes } Votes</p>

	      <h2>Comments</h2>
	      <form onSubmit={ this.addComment }>
	      	<input 
	      		value={ this.state.newComment } 
	      		onChange={ this.updateCommentInState }
	      		type="text" 
	      		placeholder="write comment here.."/>
	      	<button type="submit">Add Comment</button>
	      </form>
	      { 
	      	(this.state.myPost.comments) && this.state.myPost.comments.map(comment => {
	      		return <li>{ comment.content } - { comment.votes } Votes</li>;
	      	})
	      }
      </div>
    );
  }
}

export default SinglePostPage;
