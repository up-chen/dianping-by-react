import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Star extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
    	let star = this.props.star || 0
    	if(star > 5){
    		star = 5
    	}

        return (
            <div className="star">
            	{[1,2,3,4,5].map((item, index) => {
					const style = star>=item?' light' : ''
					return <span key={index} className={'icon-star' + style}></span>
            	})}
            </div>
        )
    }
}

export default Star