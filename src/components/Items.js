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
		const dataToken = localStorage.getItem('token');
		const tokenData = api.get('api/token')
			.then( 
				(res) => {
					if (dataToken == null || dataToken !== res.token){
						token.addItemToLocalStorage(res.token);
						// console.log(res);
						// console.log(dataToken);
						getData();
					} else if(dataToken === res.token){
						getData();
					}
				}
			);
			
		function getData(){
			if(dataToken !== null){
				const data = api.get('api/data', {
					from: 1,
					to: 20,
					token: dataToken
				})
					.then(
					(res)=>{
						const {data} = res;
						let {index, slot, city, velocity} = data;
						// let index;
						// let slot;
						// let city;
						// let velocity;

						console.table(data)
						let items = res.results.map((item) => {
							index = item.index
							if(item.slot === null){
								slot = 0;
							} else{
								slot = item.slot;
							}
							if(item.city === null){
								city = "None";
							} else{
								city = item.city;
							}
							if(item.velocity === null){
								velocity = 0.00;
							} else{
								velocity = item.velocity;
							}
							return (
								<tr>
									<td>`${index}`</td>
									<td>`${slot}`</td>
									<td>`${city}`</td>
									<td>`${velocity}`</td>
								</tr>
							)
						})
						});
						
						// data.forEach(element => {
						// 	console.log(element.index);
						// 	console.log(element.slot);
						// 	console.log(element.city);
						// 	console.log(element.velocity);
						// 	index = element.index;
						// 	if(element.slot === null){
						// 		slot = 0;
						// 	} else{
						// 		slot = element.slot;
						// 	}
						// 	if(element.city === null){
						// 		city = "None";
						// 	} else{
						// 		city = element.city;
						// 	}
						// 	if(element.velocity === null){
						// 		velocity = 0.00;
						// 	} else{
						// 		velocity = element.velocity;
						// 	}
						// 	return (
						// 		<tr>
						// 			<td>`${index}`</td>
						// 			<td>`${slot}`</td>
						// 			<td>`${city}`</td>
						// 			<td>`${velocity}`</td>
						// 		</tr>
						// 	)
						// });
						
			}
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
				<thead>
					<tr>
						<th>Index</th>
						<th>Slot</th>
						<th>City</th>
						<th>Velocity</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
				<tfoot>
					<tr>
						<td colspan="2">React project</td>
					</tr>
				</tfoot>
			</table>
		);
	}
}
export default Items;