import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BuyAndStore from '../../../components/BuyAndStore'

import * as storeActionCreator from '../../../actions/store.js'
class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    	this.state = {
    		isStore: false
    	}

    	this.buyHandle = this.buyHandle.bind(this)
    	this.storeHandle = this.storeHandle.bind(this)
    }
    render() {
        return (
            <div>
            	<BuyAndStore 
            		isStore={this.state.isStore}
            		buyHandle={this.buyHandle}
            		storeHandle={this.storeHandle} />
            </div>
        )
    }
    componentDidMount() {
    	this.checkStore()
    }
    checkStore() {
    	const store = this.props.store

    	store.some(item => {
    		if(item.id === this.props.id)
    		{	
    			this.setState({
    				isStore: true
    			})
    			return true
    		}
    	})
    }

    loginCheck() {
    	const id = this.props.id
    	const userinfo = this.props.userinfo
    	if(!userinfo.username){
    		this.props.history.push('/login/detail/' + id)
    		return false
    	}

    	return true
    }
    buyHandle() {
    	// 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // 此过程为模拟购买，因此可省去复杂的购买过程

        //跳转用户主页
        this.props.history.push('/user')
    }

    storeHandle() {
    	// 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

    	const storeActions = this.props.storeActions
    	const id = this.props.id
    	if(this.state.isStore){
    		storeActions.rm({id: id})
    	}
    	else{
    		storeActions.add({id: id})
    	}

    	this.setState({
    		isStore: !this.state.isStore
    	})
    }


}

function mapStateToProps (state) {
	return {
		userinfo: state.userinfo,
		store: state.store
	}
}

function mapDispatchToProps (dispatch) {
	return {
		storeActions: bindActionCreators(storeActionCreator, dispatch)
	}	
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Buy)