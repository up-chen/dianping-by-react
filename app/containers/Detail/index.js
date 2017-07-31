import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import Info from './subpage/info.js'
import Comment from './subpage/comment.js'
import Buy from './subpage/Buy.js'

class Detail extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

	}


	render() {
		const params = this.props.match.params
		return (
			<div>
				<Header title="商户详情" />
				<Info id={params.id}/>
				<Buy id={params.id} history={this.props.history}/>
				<Comment id={params.id} />
			</div>
		)
	}

}

export default Detail

