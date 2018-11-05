import React, { Component } from 'react';
import * as api from '../lib/api';
import '../styles/Items.css';

class Items extends Component{
	constructor(){
		super();
		this.state = {
			items: [],
			token: ""
		}
	}

	componentDidMount(){
		this.initApp();
	}	

	initApp = () => {
		const dataToken = this.state.token;
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
					this.setState({
						token: res.token
					});
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
				this.setState({
					token: token
				});
				
				this.setState({
					items: data
				});
			}
		).catch(error => {
			let {status} = error;
			if(status === 400){
				this.getData(this.state.token);
			}else if(status === 401){
				this.setState({
					token: ""
				});
				this.getToken();
			}else if(status === 403){
				setTimeout(() => {this.setState({token: ""}); this.getToken(); console.clear();}, 30000);
			}else if(status === 500){
				this.setState({
					token: ""
				});
				this.getToken();
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
		if(!value) {
			return;
		}

		let {index, slot, city, velocity} = value;
		slot = !slot ? 0 : slot;
		city = !city ? "None" : city;
		velocity = !velocity ? 0.00 : velocity;

		return (
			<tr key={`listItem_${key}`}>
				<td>{index}</td>
				<td>{slot}</td>
				<td>{city}</td>
				<td>{velocity}</td>
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