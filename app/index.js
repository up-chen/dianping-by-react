import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// 通用样式
import './static/css/common.less'

import RouteMap from './router/routerMap'

// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}
render(
    <RouteMap />,
    document.getElementById('root')
)
