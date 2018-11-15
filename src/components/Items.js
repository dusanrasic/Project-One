import React, { Component } from 'react';
import {getData, getToken} from '../lib/itm';
import '../styles/Items.css';
import {connect} from 'react-redux';
import {fetchToken, fetchData} from '../actions/itemActions';

// TODO: check redux
// TODO: check thunk
// TODO: check token api
class Items extends Component{
	componentDidMount(){
		this.initApp();
	}
	initApp(){
		this.props.fetchToken();
	}
	renderItems = () => {
		const {items} = this.props;

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
const mapDispatchToProps = {
	fetchToken: fetchToken,
	fetchData: fetchData
}
const mapStateToProps = state => ({
	items: state.items.items
})
export default connect(mapStateToProps, mapDispatchToProps)(Items);