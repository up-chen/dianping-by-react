import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux'

// 通用样式
import './static/css/common.less'

import RouteMap from './router/routeMap'

import configureStore from './stores/configureStore';
const store = configureStore();
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}

render(
	<Provider store={store}>
    	<RouteMap />
    </Provider>,
    document.getElementById('root')
)
