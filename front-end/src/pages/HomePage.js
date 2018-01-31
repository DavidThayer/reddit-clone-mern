import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// localhost:3000/posts/1
// localhost:3000/posts/2

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			allMyPosts: [],
			newPostTitle: '',
			newPostContent: '',
			newPostThumbnail: ''
		};
		this.createPost = this.createPost.bind(this);
		this.updatePostTitle = this.updatePostTitle.bind(this);
		this.updatePostContent = this.updatePostContent.bind(this);
		this.updatePostThumbnail = this.updatePostThumbnail.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:8080/api/posts').then((res) => {
		  return res.json();
		}).then((json) => {
		  // Set state to this json response you got back
		  this.setState({allMyPosts: json})
		});
	}

	updatePostTitle(e) {
		this.setState({ newPostTitle: e.target.value })
	}

	updatePostContent(e) {
		this.setState({ newPostContent: e.target.value })
	}

	updatePostThumbnail(e) {
		this.setState({ newPostThumbnail: e.target.value })
	}

	createPost(e) {
		e.preventDefault();
		fetch('http://localhost:8080/api/posts', {  
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: this.state.newPostTitle,
		    content: this.state.newPostContent,
		    thumbnail_image_url: this.state.newPostThumbnail,
		    votes: 0,
		    comments: []
		  })
		}).then((res) => {
		    return res.json()
		}).then((json) => {
		    this.setState({
		    	allMyPosts: this.state.allMyPosts.concat(json),
		    	newPostTitle: '',
		    	newPostContent: '',
		    	newPostThumbnail: ''
		    });
		});
	}

  render() {
    return (
      <p className="HomePage">
	      Home Page
	      <form onSubmit={ this.createPost }>
	      	<input 
	      		value={ this.state.newPostTitle } 
	      		onChange={ this.updatePostTitle }
	      		type="text" 
	      		placeholder="title"/>
	      	<input 
	      		value={ this.state.newPostContent }
	      		onChange={ this.updatePostContent } 
	      		type="text" 
	      		placeholder="content"/>
	      	<input 
	      		value={ this.state.newPostThumbnail } 
	      		onChange={ this.updatePostThumbnail }
	      		type="text" 
	      		placeholder="thumbnail image url"/>
	      	<button type="submit">Add Post</button>
	      </form>

		    { this.state.allMyPosts.map(eachPost => {
		    	return <li key={ eachPost._id }>
		    		<img height="30" width="30" src={eachPost.thumbnail_image_url}/>
		    		<Link to={`/posts/${ eachPost._id }`}>{ eachPost.title }</Link>
		    	</li>
		    }) }
      </p>
    );
  }
}

export default HomePage;
