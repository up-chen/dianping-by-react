import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getAdData} from '../../../fetch/home'
import HomeAd from '../../../components/HomeAd'

class Ad extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			data: []
		}
	}

	render() {
		return (
			<div>
			{
				this.state.data.length
				?<HomeAd data={this.state.data} />
				:'loading...'
			}	
			</div>
		)
	}

	componentDidMount() {
		var result = getAdData()
		result.then(res => {
			var data = res
			if(data.length){
				this.setState(prevState => ({
					data: prevState.data.concat(data)
				}))
			}
		}).catch(ex => {
            // 发生错误
            if (__DEV__) {
                console.error('首页广告模块获取数据报错, ', ex.message)
            }
        })
	}
}

export default Ad