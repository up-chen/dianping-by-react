
## 代码分离

之前的demo代码都是在一个文件中，实际开发中不可能是这样子的，因此这里就先把组件的代码给拆分开。我们将使用 es6 的模块管理规范。

containers里面的每一个文件夹都是一个页面page，每个页面里都有若干个subpage和主文件index。
components里面放的是一些可重用的组件。

### page 层

创建`./app/containers/Hello/index.jsx`文件，将之前创建组件代码复制进去

```jsx
import React from 'react'

class Hello extends React.Component {
    render() {
        return (
             <p>hello world</p>
        )
    }
}

export default Hello
```

然后`./app/index.jsx`中代码就可以这样写。

```jsx
import Hello from './containers/Hello';

render(
    <Hello/>,
    document.getElementById('root')
)
```

注意，代码`import Hello from './containers/Hello';`这里可以写成`./containers/Hello/index.jsx`也可以写成`./containers/Hello/index`

### subpage 层

如果`Hello`组件再稍微复杂一点，那么把代码都放一块也会变得复杂，接下来我们再拆分。

创建`./app/containers/Hello/subpage`目录，然后在其下创建三个文件`Carousel.jsx` `Recommend.jsx` `List.jsx`，分别写入相应的代码（看代码文件即可），然后`./app/containers/Hello/index.js`中即可这样写

```jsx
import Carousel from './subpage/Carousel'
import Recommend from './subpage/Recommend'
import List from './subpage/List'

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>hello world</p>
                <hr/>
                <Carousel/>
                <Recommend/>
                <List/>
            </div>
        )
    }
}
```

注意，这里`import`时`.jsx`后缀省略了。

### component 层

以上介绍的是页面和复杂页面的拆分，但那都是页面层级的，即`page`层。这里复杂页面拆分为`subpage`其实没啥特别的，就是把复杂页面的代码拆分一下，会更加符合**开放封闭原则**。而且，只有复杂页面才有必要去拆分，简单页面根本没必要拆分。因此，无论是`page`还是`subpage`它都是页面级别的。

页面的特点是其独特性，一个页面就需要创建一个文件（如果两个页面可以共用一个文件，这是设计不合理，得治）。而页面其中的内容，就不一定是这样子了。例如，现在的APP每个页面最上面都会有个 header ，即可以显示标题，可以返回。每个页面都有，样子差不多，难道我们要为每个页面都做一个？——当然不是。

创建`./app/components/Header/index.jsx`文件，简单写入一个组件的代码（见源码文件），然后在`./app/containers/index.jsx`中引用

```jsx
import Header from '../../components/Header'

class Hello extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {/* 省略其他内容 */}
            </div>
        )
    }
}
```

Hello 页面会用到 Header，以后的其他页面也会用到 Header ，我们把多个页面都可能用到的功能，封装到一个组件中，代码放在`./app/components`下。


## 智能组件 & 木偶组件

这是用 React 做系统设计时的两个非常重要的概念。虽然在 React 中，所有的单位都叫做“组件”，但是通过以上例子，我们还是将它们分别放在了`./app/containers`和`./app/components`两个文件夹中。为何要分开呢？

- **智能组件** 在日常开发中，我们也简称**“页面”**。为何说它“智能”，因为它只会做一些很聪明的事儿，脏活累活都不干。它只对数据负责，只需要获取了数据、定义好数据操作的相关函数，然后将这些数据、函数直接传递给具体实现的组件即可。
- **木偶组件** 这里“木偶”一词用的特别形象，它总是被人拿线牵着。它从智能组件（或页面）那里接受到数据、函数，然后就开始做一些展示工作，它的工作就是把拿到的数据展示给用户，函数操作开放给用户。至于数据内容是什么，函数操作是什么，它不关心。

以上两个如果不是理解的很深刻，待把课程学完再回头看一下这两句话，相信会理解的。




## 生命周期

React 详细的生命周期可参见[这里](http://reactjs.cn/react/docs/component-specs.html)，也可查阅本文档一开始的视频教程。这里我们重点介绍这个项目开发中常用的几个生命周期函数（hook），相信你在接下来的 React 开发中，也会常用这些。

以下声明周期，也没必要每个都写demo来解释，先简单了解一下，后面会根据实际的例子来解释，这样会更加易懂。

- **`getInitialState`**

初始化组件 state 数据，但是在 es6 的语法中，我们可以使用以下书写方式代替

```jsx
class Hello extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 初始化组件 state 数据
        this.state = {
            now: Date.now()
        }
    }
}
```

- **`render`**

最常用的hook，返回组件要渲染的模板。

- **`comopentDidMount`**

组件第一次加载时渲染完成的事件，一般在此获取网络数据。实际开始项目开发时，会经常用到。

- **`shouldComponentUpdate`**

主要用于性能优化，React 的性能优化也是一个很重要的话题，后面一并讲解。

- **`componentDidUpdate`**

组件更新了之后触发的事件，一般用于清空并更新数据。实际开始项目开发时，会经常用到。

- **`componentWillUnmount`**

组件在销毁之前触发的事件，一般用户存储一些特殊信息，以及清理`setTimeout`事件等。


