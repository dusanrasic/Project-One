import React, { Component } from 'react';
import * as api from '../lib/api';
import '../styles/Items.css';
import {addItemToLocalStorage} from '../lib/token';

class Items extends Component{
	constructor(){
		super();
		this.state = {
			items: []
		}
	}

	componentDidMount(){
		this.initApp();
	}	

	initApp = () => {
		const dataToken = localStorage.getItem('token');
		if(!dataToken){
			this.getToken();
		}
		else{
			this.getData(dataToken);	
		}
	}

	getToken = () => {
		api.get('api/token')
			.then( 
				(res) => {
					addItemToLocalStorage(res.token);
					this.getData(res.token);
				}
			);
	}

	getData = (token) => {
		api.get('api/data', {
			from: 1,
			to: 20,
			token: token
		})		
		.then(
			(res)=>{
				const {token, data} = res;
				addItemToLocalStorage(token);
				
				this.setState({
					items: data
				});
			}
		).catch(error => {
			const {status} = error;
			if(status){
				setTimeout(() => {
					this.getToken()
				}, 30000);
			}
			
		});
	}

	renderItems = () => {
		const {items} = this.state;

		if(items && !items.length) {
			return "Loading..."

		}
		return items.map(this.renderItem);
	}

	renderItem = (value, key) => {
		const {index, slot, city, velocity} = value;
		let sl1,ci1,vel1;
		if(slot == null){
			sl1 = 0;
			ci1 = city;
			vel1 = velocity;
		} else if(city == null){
			sl1 = slot;
			ci1 = "None";
			vel1 = velocity;
		} else if(velocity == null){
			sl1 = slot;
			ci1 = city;
			vel1 = 0.00;
		} else{
			sl1 = slot;
			ci1 = city;
			vel1 = velocity;
		}
		
		
		if(!value) {
			return;
		}

		return (
			<tr key={`listItem_${key}`}>
				<td>{index}</td>
				<td>{sl1}</td>
				<td>{ci1}</td>
				<td>{vel1}</td>
			</tr>
		);
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
					{this.renderItems()}
				</tbody>
				<tfoot>
					<tr>
						
					</tr>
				</tfoot>
			</table>
		);
	}
}
export default Items;