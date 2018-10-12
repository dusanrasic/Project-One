import React, { Component } from 'react';
import '../styles/Items.css';

class Items extends Component{
	const base_url = 'https://f-test-01.glitch.me/api/'
	constructor(){
		super();
		this.state ={
			items: []
		}
	}
	componentDidMount(){
		fetch('')
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data.results);
			let items = data.results.map((item) => {
				return(
					<tr>
						<td></td>
					</tr>
					);
			})
			console.log(items);
			this.setState({
				items: items
			});
		});
	}
	render(){
		return(
			<table style="width:100%">
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