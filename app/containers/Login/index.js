import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userinfoActionCreator from '../../actions/userinfo.js'
import Header from '../../components/Header'
import Logincomponent from '../../components/Login'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    	this.state ={
    		check: true
    	}

    	this.loginHandle = this.loginHandle.bind(this)
    }
    render() {
        return (
            <div>
            	<Header title="登录" />
            	{
            		this.state.check
            		? ''
            		: <Logincomponent loginHandle={this.loginHandle}/>
            	}
            </div>
        )
    }

    componentDidMount() {
        console.log(this.props.match.params.router)
    	this.docheck()
    }

    docheck() {
    	const userinfo = this.props.userinfo
    	if(userinfo.username){
    		this.goUserPage()
    	}
    	else {
    		this.setState({
    			check: false
    		})
    	}
    }

    loginHandle(user) {
    	const actions = this.props.userInfoActions
    	let userinfo = this.props.userinfo
    	userinfo.username = user
    	actions.update(userinfo)

    	const params = this.props.match.params
    	const router = params.router
    	if(router){
    		this.props.history.push(`/${router}`)
    	}
    	else{
    		this.goUserPage()
    	}
    }

    goUserPage() {
    	this.props.history.push('/user')
    }
}

function mapStateToProps (state) {
	return {
		userinfo: state.userinfo
	}
}

function mapDispatchToProps (dispatch) {
	return {
		userInfoActions: bindActionCreators(userinfoActionCreator, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)