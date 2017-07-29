
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props) {
        super(props)
        
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
    	var data = this.props.data
        return (
            <div className="load-more clear-fix" ref="wraper">
            	{
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={() => {
                        this.props.loadMoreFn()
                    }}>加载更多</span>
                }
            </div>
        )
    }

    componentDidMount() {
        // 使用滚动时自动加载更多
        let timeid
        const loadMoreFn = this.props.loadMoreFn
        const wraper = this.refs.wraper
        let callback = function(){
            
            const top = wraper.getBoundingClientRect().top
            if(top && top< window.screen.height - 10){
                loadMoreFn()
            }
        }

        window.addEventListener('scroll', function(){
            if (this.props.isLoadingMore) {
                return
            }
            if(timeid){
                clearTimeout(timeid)
            }
            timeid = setTimeout(callback, 50)
        }.bind(this), false)
    }
}

export default LoadMore