import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'


class CityList extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.mouseup = this.mouseup.bind(this)
		this.mousedown = this.mousedown.bind(this)

	}

	mousedown(e) {
		e.target.style.backgroundColor = '#ccc !important'

	}

	mouseup(e) {
		e.target.style.backgroundColor = '#fff !important'
		this.props.changeFn(e.target.innerHTML)

	}
	
	render() {
		return (
			<div className="city-list clear-fix">
				<h3> 热门城市</h3>
				<ul>
					{this.props.data.map((item, index) => {
						return <li key={index}>
									<span 
										onMouseDown={this.mousedown}
										onMouseUp={this.mouseup}>{item}</span>
							</li>
					})}
				</ul>
			</div>

		)
	}
}

export default CityList