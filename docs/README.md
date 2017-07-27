Redux
为什么需要redux？
通俗的将redux就是一个state管理器。在react应用中，react仅仅是一个view层，光有界面不是，还要有数据。react通过props，state传递数据。但是 数据通信之间的问题：
1，祖父组件到孙子组件。
这个看上去只是父到子的衍生,但是祖祖祖父到孙子组件呢。

2，子到父。下面是一种方案：父给子传递一个函数，子在只要调用这个函数，父就能得到相关的数据。但是孙子到祖祖祖父呢。。

3，非父子关系：基本可以叫做是兄弟关系，以网页为例，总归有一个共同的祖先<body>，但是有可能是非常非常远的兄弟。这个怎么处理。

对于上面的2，3两点,用react本事的机制，写出来都很别扭，特别是第3点。两个不相关的地方，要数据通信，最简单就是一个全局变量。当然光有全局变量还不行，你改了全局变量，其他所有对这个变量感兴趣React组件的都要被通知到,这样才能相应改变界面。

如果你的应用有以下场景，可以考虑使用 Redux 

某个组件的状态，需要共享
某个状态需要在任何地方都可以拿到
一个组件需要改变全局状态
一个组件需要改变另一个组件的状态

Redux架构


redux把整个react应用的状态state提取出来，存入一个store中。这个store是唯一的，state是只读的。
创建store。调用redux的createStore（reducers，[initialsate]）。第二个参数是可选的, 用于设置 state 初始状态

react会根据state来渲染页面，这一点很好理解。就是说，state变化，页面也会跟着变化。那怎么让页面变化呢？

通常页面的变化是跟用户的操作有关。redux把用户的操作定义为一个个action。action是一个对象（异步action是一个函数），携带着操作的一些信息。然后store根据action和之前的state来更新状态。想让store知道action，只有store.dispatch（action）方法实现。

store怎样根据action返回一个什么样的state呢？答案是reducers。reducers指定了action改变state的一些规则。store.dispatch（）函数会自动调用reducers函数

store的state更新之后，怎样通知react知道state更新了呢。通过store.subscribe(listener)注册监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。然后调用组件的setState
返回值
(Function): 一个可以解绑变化监听器的函数。调用这个函数就实现解绑

基本的流程就是这样子。redux维持了一个state的对象来维持整个应用的状态。实现了状态之间的共享和数据通信。

Redux有三大原则
单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

State 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers。

Action
Action 是把数据从应用（这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 
我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。
通常设计一个Action的生成函数

Reducers
处理 Reducer 关系时的注意事项
开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式。

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
(previousState, action) => newState

注意事项：
1，不要修改 state。 使用 Object.assign() 新建了一个副本，或使用 { ...state, ...newState } 达到相同的目的。

2，在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

拆分 Reducer
import { combineReducers } from 'redux';
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

Store 
store有以下职责：
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合而不是创建多个 store。









搭配react
区分容器类组件和UI组件

    展示组件    容器组件
作用  描述如何展现（骨架、样式）   描述如何运行（数据获取、状态更新）
直接使用 Redux  否   是
数据来源    props   监听 Redux state
数据修改    从 props 调用回调函数  向 Redux 派发 actions
调用方式    手动  通常由 React Redux 生成
可以简单的说，用容器组件渲染展示组件

容器组件
技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。 
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps)(TodoList)

mapStateToProps()
mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
mapStateToProps是一个函数，它接受state作为参数，返回一个对象。还可以使用第二个参数，代表容器组件的props对象。

mapDispatchToProps()
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。会得到dispatch和ownProps（容器组件的props对象）两个参数。 


<Provider> 组件
connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

异步Action 和 Middleware




