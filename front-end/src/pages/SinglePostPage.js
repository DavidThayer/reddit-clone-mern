import React, { Component } from 'react';

class SinglePostPage extends Component {
	constructor() {
		super();
		this.state = {
			myPost: {}
		}
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
  render() {
    return (
      <div className="SinglePostPage">
	      <img height="100" src={ this.state.myPost.thumbnail_image_url }/>
	      <h1>{ this.state.myPost.title }</h1>
	      <p>{ this.state.myPost.content }</p>
	      <p>{ this.state.myPost.votes } Votes</p>

	      <h2>Comments</h2>
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
