import React, { Component } from 'react';
import {getData, getToken} from '../lib/itm';
import '../styles/Items.css';

class Items extends Component{
	constructor(props){
		super(props);
		this.state = {
			items: [],
			token: null,
			error: null,
			initialized: false,
			from: props.query.from,
			to: props.query.to
		}
	}

	componentDidMount(){
		this.initApp();
	}
	componentWillReceiveProps(nextProps){
		const {token} = this.state;
		const {from, to} = nextProps.query;
		if(nextProps.query !== this.props.query){
			getData(token, from, to)
			.then(
				(res) => {
					this.setState({
						token: res.token,
						items: res.data
					})
				}
			)
			.catch((error) => {
				this.setState({
					error
				})
			});
		}
	}
	componentDidUpdate(prevProps, prevState) {		
		const {token, initialized, items, from, to} = this.state;
		const shouldFetch = (token !== prevState.token && initialized && !items.length );
		if (shouldFetch) {
			getData(token, from, to)
			.then(
				(res) => {
					this.setState({
						token: res.token,
						items: res.data
					})
				}
			)
			.catch((error) => {
				this.setState({
					error
				})
			})
		}
	}
	initApp(){
		const dataToken = this.state.token;
		if(!dataToken){
			getToken()
			.then(
				(res) => {
					this.setState({
						token: res.token,
						initialized: true,
					})			
				}
			).catch((err) => {
				this.setState({
					error: true,
					token: null
				})
			})
		}
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