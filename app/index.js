import React from 'react'
import { render } from 'react-dom'

// 通用样式
import './static/css/common.less'

import Hello from './containers/Hello/index'

render(
    <Hello />,
    document.getElementById('root')
)
