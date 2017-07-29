import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actionCreator from '../../actions'
import getCityList from '../../fetch/cityList'
import LocalStore from '../../util/localStore.js'
import {CITYNAME} from '../../config/localStoreKey.js'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: []
		}
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.changeCity = this.changeCity.bind(this)
	}

	changeCity(newCity) {
		if(newCity == null){
			return
		}

		//修改 redux
		const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        //修改cookie
        LocalStore.setItem(CITYNAME, newCity)

		//跳转页面
		window.location = '/'
	} 

	render() {
		return (
			<div>
				<Header title="选择城市" />
				<CurrentCity cityName={this.props.userinfo.cityName}/>
				<CityList data={this.state.data} changeFn={this.changeCity} />
			</div>
		)
	}

	componentDidMount() {
		const result = getCityList()
		result.then(res => {
			var data = res
			if(data.length){
				this.setState({
					data: data
				})
			}
		}).catch(ex => {
            // 发生错误
            if (__DEV__) {
                console.error('首页列表获取数据报错, ', ex.message)
            }
        })
	}
}

// -------------------redux react 绑定--------------------

function mapStateToProps (state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps (dispatch) {
	return {
		userInfoActions: bindActionCreators(actionCreator, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(City)

