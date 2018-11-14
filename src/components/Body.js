import React, { Component } from 'react';
import '../styles/Body.css';
import Items from './Items';

class Body extends Component{
	constructor(){
		super();
		this.state = {
			inputFromText: 1,
			inputToText : 20,
			query: {
				from: 1,
				to: 20
			}
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		let q = {
			to: this.state.inputToText,
			from: this.state.inputFromText
		};
		this.setState({
			query : q
		});
	}
	handleInputChange = (event) => {
		event.preventDefault();

		switch(event.target.name){
			case 'inputFromText': return this.setState({[event.target.name]: event.target.value}); break;
			case 'inputToText': return this.setState({[event.target.name]: event.target.value}); break;
			default: break;
		}		
	}
	render(){		
		return(
			<div className="Body">
				<div className="wrapper">
					<div className="row1">
						<form id="loadForm" onSubmit={this.handleSubmit}>
							<label htmlFor="from">From:</label>
							<input type="text" className="inputFromText" name="inputFromText" onChange={this.handleInputChange} value={this.state.inputFromText}/>
							<label htmlFor="to">To:</label>
							<input type="text" className="inputToText" name="inputToText" onChange={this.handleInputChange} value={this.state.inputToText}/>
							<button className="btnLoad" id="btnLoad">Load</button>
						</form>
					</div>
					<div className="row2">
						<Items query={this.state.query}/>
					</div>
				</div>
			</div>
		);
	}
}
export default Body;