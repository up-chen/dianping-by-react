import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as userinfoActionCreator from '../actions/userinfo.js'
import LocalStore from '../util/localStore.js'
import {CITYNAME} from '../config/localStoreKey.js'

import '../static/css/common.less'
import '../static/css/font.css'

import Home from '../containers/Home'
import City from '../containers/City'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import Login from '../containers/Login'
import User from '../containers/User'


class RouteMap extends React.Component { 
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			initDone: false
		}

	}

	render() {
		return (
			<Router>
				<div>
					{this.state.initDone? '' : <div>loading...</div>}

					<Route exact path='/' component={Home} />
					<Route path='/city' component={City} />
					<Route path='/search/:category/:keyword*' component={Search} />
					<Route path='/detail/:id' component={Detail} />
					<Route path='/login/:router*' component={Login} />
					<Route path='/user/' component={User} />
				</div>
			</Router>
		)
	}

	componentDidMount() {
		let cityName = LocalStore.getItem(CITYNAME)
		if(cityName == null) {
			cityName = '北京'
		}
		this.props.userInfoActions.update({
			cityName: cityName
		})

		this.setState( ({initDone}) => ({
			initDone: initDone? initDone : !initDone})
		)
	} 
}

// -------------------redux react 绑定--------------------

function mapStateToProps (state) {
	return {}
}

function mapDispatchToProps (dispatch) {
	return {
		userInfoActions: bindActionCreators(userinfoActionCreator, dispatch)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap)