import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'


class Header extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.clickHandler = this.clickHandler.bind(this)
	}
	clickHandler() {
		window.history.back()
	}
	render() {
		return (
			<div id="common-header">
				<span className="back-icon float-lfet" onClick={this.clickHandler}>
					<i className="icon-chevron-left"></i>
				</span>
				<h1>{this.props.title}</h1>
			</div>

		)
	}
}

export default Header