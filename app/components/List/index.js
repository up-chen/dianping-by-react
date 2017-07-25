import React from 'react'

class List extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<ul style={{marginTop: '10px', fontSize: '20px', lineHeight: '30px'}}>
				{this.props.todos.map((index) => {
					return <li 
								key={index.id} 
								onClick={()=> this.props.deleteFn(index.id)}>{index.text}</li>
				})}
			</ul>
		)
	}
}

export default List