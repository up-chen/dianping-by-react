import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link, browserHistory} from 'react-router-dom'

import './style.less'
import SearchInput from '../SearchInput'

class HomeHeader extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
            kwd: ''
        }

        this.enterHandle = this.enterHandle.bind(this)
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
					<Link to="/login">
						<span className="icon-user"></span>
					</Link>
				</div>

				<div className="home-header-middle">
					<div className="search-container">
						<span className="icon-search"></span>
						<SearchInput value="" enterHandle={this.enterHandle} />
					</div>
				</div>
			</div>

		)
	}

	enterHandle(value) {
        this.props.history.push(`/search/all/${value}`)
    }
}

export default HomeHeader