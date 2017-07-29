import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getListData} from '../../../fetch/home'
import HomeAd from '../../../components/HomeAd'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
	constructor(props) {
		super(props)

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			data: [],
			hasMore: false,
			isLoadingMore: false, //记录当前状态下，是加载中还是‘点击加载更多’
			page: 0 //
		}
		this.loadMoreData = this.loadMoreData.bind(this)
	}

	render() {
		return (
			<div>
				<h2 className="home-list-title">猜你喜欢</h2>
				{
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData}/>
                    : ''
                }
			</div>
		)
	}

	componentDidMount() {
		this.loadFirstPageData()
	}

	loadFirstPageData() {
		const cityName = this.props.cityName
		const result = getListData(cityName, 0)
		this.resultHandler(result)
	}

	loadMoreData() {
		//记录状态
		this.setState({
			isLoadingMore: true
		})
		const cityName = this.props.cityName
		const page = this.state.page + 1
		const result = getListData(cityName, page)
		this.resultHandler(result)

		this.setState({
			isLoadingMore: false,
			page: page
		})

	}

	resultHandler(result) {
		result.then(res => {
			var hasMore = res.hasMore
			var data = res.data
			if(data.length){
				this.setState({
					data: this.state.data.concat(data),
					hasMore: hasMore,

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

export default List







