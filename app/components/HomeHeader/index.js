import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'

import './style.less'


class HomeHeader extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render() {
		return (
			<div id="home-header" className="clear-fix">
				<Link to="/city">
					<div className="home-header-left float-left">
						<span>{this.props.cityName}</span>&nbsp;
						<span className="icon-angle-down"></span>
					</div>
				</Link>
				
				<div className="home-header-right float-right">
					<span className="icon-user"></span>
				</div>

				<div className="home-header-middle">
					<div className="search-container">
						<span className="icon-search"></span>
						<input type="text" placeholder="请输入关键字" />
					</div>
				</div>
			</div>

		)
	}
}

export default HomeHeader