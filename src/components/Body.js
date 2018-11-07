import React, { Component } from 'react';
import '../styles/Body.css';
import Items from './Items';

class Body extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div className="Body">
				<div className="wrapper">
					<div className="row1">
						<form id="loadForm" >
							<label htmlFor="from">From:</label>
							<input type="text" className="inputFromText"/>
							<label htmlFor="to">To:</label>
							<input type="text" className="inputToText"/>
							<button className="btnLoad" id="btnLoad">Load</button>
						</form>
					</div>
					<div className="row2">
						<Items></Items>
					</div>
				</div>
			</div>
		);
	}
}
export default Body;