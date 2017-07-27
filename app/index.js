import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {Provider} from 'react-redux'

// 通用样式
import './static/css/common.less'

import RouteMap from './router/routerMap'
import App from './containers/App'
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
    	<App />
    </Provider>,
    document.getElementById('root')
)
