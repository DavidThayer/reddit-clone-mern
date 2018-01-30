import React, { Component } from 'react';

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			allMyPosts: []
		};
	}
	componentDidMount() {
		fetch('http://localhost:8080/api/posts').then((res) => {
		  return res.json();
		}).then((json) => {
		  // Set state to this json response you got back
		  this.setState({allMyPosts: json})
		});
	}
  render() {
    return (
      <p className="HomePage">
	      Home Page
		    {/* Render all the posts in your state */}
		    { this.state.allMyPosts.map(eachPost => {
		    	return <li key={ eachPost._id }>
		    		<img height="30" width="30" src={eachPost.thumbnail_image_url}/>
		    		{ eachPost.title }
		    	</li>
		    }) }
      </p>
    );
  }
}

export default HomePage;
