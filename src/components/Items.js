import React, { Component } from 'react';
import * as api from '../lib/api';
import '../styles/Items.css';
import * as token from '../lib/token';

class Items extends Component{
	
	constructor(){
		super();
		this.state ={
			items: []
		}
		
	}
	componentDidMount(){

		const tokenData = api.get('api/token');
		if(localStorage.getItem('token') == null){
			tokenData.then(
				(res) => {
					token.addItemToLocalStorage(res.token);
					console.log(res);
					console.log(localStorage.getItem('token'));
				}
			);
		} else{
			const data = api.get('api/data', {
				params: {
					from: 1,
					to: 1000,
					token: localStorage.getItem('token')
				}
			})
		}
		
		
		// fetch(this.base_url)
		// .then(response => {
		// 	return response.json();
		// })
		// .then(data => {
		// 	console.log(data.results);
		// 	let items = data.results.map((item) => {
		// 		return(
		// 			<tr>
		// 				<td></td>
		// 			</tr>
		// 			);
		// 	})
		// 	console.log(items);
		// 	this.setState({
		// 		items: items
		// 	});
		// });
	}
	render(){
		return(
			<table>
			<tr>
				<th>Index</th>
				<th>Slot</th> 
				<th>City</th>
				<th>Velocity</th>
			</tr>
			{this.state.items}
			</table>
			
		);
	}
}
export default Items;