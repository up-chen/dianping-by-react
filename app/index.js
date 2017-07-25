import React from 'react'
import { render } from 'react-dom'

// 通用样式
import './static/css/common.less'

import Hello from './containers/Hello/index'
import TodoList from './containers/TodoList'

// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}
console.log(__DEV__)
render(
    <TodoList />,
    document.getElementById('root')
)
