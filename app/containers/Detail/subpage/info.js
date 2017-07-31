
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getInfoData} from '../../../fetch/detail'
import DetailInfo from '../../../components/DetailInfo'

class Info extends React.Component {
    constructor(props) {
        super(props)
        
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            data: []
        }
    }

    render() {
    	var data = this.props.data
        return ( 
            <div className="">
                <DetailInfo data={this.state.data} />
            </div> 
            
        )
    }

    componentDidMount() {
        var id = this.props.id
        var result = getInfoData()
        result.then(res => {
            if(res){
                this.setState({
                    data: res
                })
            }
        })
        .catch(ex => {
            if(__DEV__){
                console.error('获取商户详情Info数据失败', ex.message)
            }
        })
    }
}

export default Info