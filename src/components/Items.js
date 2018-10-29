import React, { Component } from 'react';
import * as api from '../lib/api';
import '../styles/Items.css';
import * as token from '../lib/token';

class Items extends Component{
	constructor(){
		super();
		this.items = [];
	}
	token(){
		const dataToken = localStorage.getItem('token');
		if(dataToken === null){
			this.getToken();
		}
		else{
				this.getData(dataToken);	
		}
	}
	getToken(){
		const tokenData = api.get('api/token')
			.then( 
				(res) => {
					const dataToken = localStorage.getItem('token');
					if (dataToken !== res.token){
						token.addItemToLocalStorage(res.token);
						this.getData(res.token);
					} else if(dataToken === res.token){
						this.getData(res.token);
					}
				}
			);
	}
	getData(token){
		const data = api.get('api/data', {
			from: 1,
			to: 20,
			token: token
		})		
		.then(
			(res)=>{
				if(res.status === 400 || res.status === 401 || res.status === 403 || res.status === 500){
					const {error} = res;
					this.getToken();
					console.log(error);
				} else{
					const {data} = res;
					const {token} = res;
					console.log(token);
					this.token.addItemToLocalStorage(token);
					// dataToken = token;
					let {index, slot, city, velocity} = data;
					const object = [];
					console.table(data)
					let items = data.map((item) => {
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
							object.push('<tr><td>`${index}`</td><td>`${slot}`</td><td>`${city}`</td><td>`${velocity}`</td></tr>'),
							this.setstate({
								items: object
							})
						);
					})}
				})
			}	
	componentDidMount(){
			this.token();
		}	
	render(){
		setTimeout(() => {
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
						{this.state.items}
					</tbody>
					<tfoot>
						<tr>
							<td>React project</td>
						</tr>
					</tfoot>
				</table>
			);
		},5000)
		return "";
		
	}
}
export default Items;