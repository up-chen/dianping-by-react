
# react-router 基础知识

## 安装

安装 react-router `npm install react-router-dom --save`，完成之后可查看`package.json`的变化。

本章节演示 react-router 的一些基本用法，为了能让大家快速了解。接下来的项目开发中，可能会有另外的用法（应该不多），到时候遇到再讲。当然也欢迎大家去[官网文档](https://github.com/ReactTraining/react-router)自己提前学习。

## 创建页面

创建以下几个页面，用于演示

- `./app/containers/hello.jsx` 所有页面的外壳
- `./app/containers/Todolist` 主页
- `./app/containers/paramsexample` 列表页




## 配置 router

创建 `./app/router/routeMap.jsx` 文件，主要代码如下，详细的代码看源文件。

class RouteMap extends React.Component {    
    render() {
        return (
            <Router>
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/todolist' component={TodoList} />
                <Route path='/paramsExample' component={ParamsExample} />
                <Route path='/hello' component={Hello} />
            </div>
            </Router>
        )
    }
}


## 使用 router

`./app/index.jsx`中的代码如下，这样就使用了我们刚才定义的`routeMap`组件

```jsx
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'

import RouteMap from './router/routeMap'

render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
)


## 页面跳转

从给一个页面跳转到另一个页面，有两种方法。第一种是 `<Link>` 跳转，例如在 Home 页面中的代码。（其实这个`<Link>`渲染完了就是html中的`<a>`）


另一个方法是使用 js 跳转
history.push('pathname')


## 获取参数
this.props.match.params

## 高级 & 进阶

使用到了 router 的项目，其规模不会太小，代码量也不会太少。但是如果项目规模非常非常大的情况下，就会带来各种性能问题，其中给一个就是——视屏时间。

就像我们这次的demo，如何让`/`路由（即首页）加载的更快？抛开代码效率问题，其中一个解决方案就是先不要加载其他页面的代码，**即首页需要哪些代码我就先加载、执行哪些，不需要的就先别加载**。

反观我们现在的做法，页面一出来，不管暂时有用没用的代码，都统统加载下来了。如果项目规模很大、代码行数很多的时候，就不行了。

针对大型项目的**静态资源懒加载**问题，react-router 也给出了解决方案 —— [huge-apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps)，它将 react-router 本身和 webpack 的 `require.ensure` 结合起来，就解决了这一问题。

不过——最后——我们还是不用这种方式——因为我们的项目还没有到那种规模。任何收获都要付出相应的代价，设计越复杂风险就越大，因此我推崇精简设计。至于这个“静态资源懒加载”，大家看一下刚才的源码就能明白了。
