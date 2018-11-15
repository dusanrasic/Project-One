import React, { Component } from 'react';
import '../styles/Body.css';
import Items from './Items';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchData} from '../actions/itemActions';

class Body extends Component{
	constructor(){
		super();
		this.state = {
			inputFromText: 1,
			inputToText : 20,
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const {token} = this.props;
		let {inputFromText, inputToText} = this.state;
		this.props.fetchData(token, inputFromText, inputToText)
	}
	handleInputChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]:event.target.value
		});	
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
						<Items/>
					</div>
				</div>
			</div>
		);
	}
}
Body.propTypes =  {
	fetchData: PropTypes.func.isRequired,
}
const mapDispatchToProps = {
	fetchData: fetchData
}
const mapStateToProps = state => ({
	token: state.items.token
})
export default connect(mapStateToProps, mapDispatchToProps )(Body);