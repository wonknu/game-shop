import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemsFetchData, itemsSetData } from '../actions/items'

class ItemList extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	game: '',
    	price: '',
    	seller: '',
    	items: []
    }
  }

  handleChange(key, event) {
    switch(key){
    	case 'game':
    		this.setState({game: event.target.value})
  		break
    	case 'price':
    		this.setState({price: event.target.value})
  		break
    	case 'seller':
    		this.setState({seller: event.target.value})
  		break
    }
    
  }

  componentDidMount() {
  	this.props.fetchData()
  }

  setData() {
    this.props.setData({game: this.state.game, price: this.state.price, seller: this.state.seller})
  }

  render() {
    if (this.props.hasErrored) return <p>Sorry! There was an error loading the items</p>
    if (this.props.isLoading) return <p>Loading…</p>
    return (
    	<div style={{padding: 20}}>
    		<div>
	    		<div>
	    			Buy Games :
	    		</div>
		      <ul>
		        {Object.keys(this.props.items).map((key, i) => {
		          return <li key={i}>{this.props.items[key].seller} is selling {key} for <srong>{this.props.items[key].price}$</srong></li>
		        })}
		      </ul>
	      </div>
	      <hr/>
	      <div className='form'>
	      	<label>
	      		<div>Game name :</div>
	      		<input value={this.state.game} onChange={(e) => this.handleChange('game', e)} />
	      	</label>
	      	<label>
	      		<div>Price :</div>
	      		<input value={this.state.price} onChange={(e) => this.handleChange('price', e)} />
	      	</label>
	      	<label>
	      		<div>Seller :</div>
	      		<input value={this.state.seller} onChange={(e) => this.handleChange('seller', e)} />
	      	</label>
	      </div>
	      <button onClick={() => this.setData()}>save</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(itemsFetchData()),
    setData: (data) => dispatch(itemsSetData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
