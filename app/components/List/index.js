import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

class List extends React.Component {
    constructor(props) {
        super(props)
        
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        var data = this.props.data
        return (
            <div>
                {data.map((item, index) => {
                    return <Item key={index} data={item} />
                })}
            </div>
        )
    }
}

export default List