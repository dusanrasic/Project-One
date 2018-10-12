import React, { Component } from 'react';
import '../styles/Navigation.css';

class Navigaion extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<nav className="Navigation">
				<a
					className="App-link"
					href="../index.html"
					// target="_blank"
					rel="noopener noreferrer"
				>
				React test demo	
				</a>
			</nav>
		);
	}
}
export default Navigaion;