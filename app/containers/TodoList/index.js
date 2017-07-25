import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Input from '../../components/Input'
import List from '../../components/List'


class TodoList extends React.Component {
	constructor() {
		super()
		this.state = {
			todos: []
		}
		this.submitFn = this.submitFn.bind(this)
		this.deleteFn = this.deleteFn.bind(this)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	submitFn(value) {
		let id = this.state.todos.length
		this.setState({
			todos: this.state.todos.concat({
				id: id,
				text: value
			})
		})
	}

	deleteFn(id) {
		this.setState ({
			todos: this.state.todos.filter(item => {
                if (item.id !== id) {
                    return item
                }
            })
		})
	}

	render() {
		return (
			<div>
				<Input submitFn={this.submitFn} />
				<List todos={this.state.todos} deleteFn={this.deleteFn} />
			</div>
		)
	}
}

export default TodoList