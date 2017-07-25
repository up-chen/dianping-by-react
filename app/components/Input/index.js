import React from 'react'

class Input extends React.Component {
	constructor() {
		super()
		this.state = {
			value: ''
		}
		this.onchangeHandler = this.onchangeHandler.bind(this)
		this.onkeyupHandler = this.onkeyupHandler.bind(this)
	}

	onchangeHandler(e) {
		this.setState({
			value: e.target.value
		})
	}

	onkeyupHandler(e) {
		if(e.keyCode === 13 && e.target.value.trim() != ''){
			this.props.submitFn(e.target.value)
			this.setState({value: ''})
		}
	}

	render() {
		return (
			<div>
				<input 
					style={{width: '100%', height: '40px', fontSize: '35px'}} 
					type="text"
					value={this.state.value} 
					onChange = {this.onchangeHandler}
					onKeyUp = {this.onkeyupHandler} 
				/> 
			</div>
		)
	}
}
export default Input