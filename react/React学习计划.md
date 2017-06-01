# React学习计划

## 开始时间

20170312

***总的来说先学习完这个https://github.com/lewis617/react-redux-tutorial***

## 顺序

1. 先看一下redux中文api

   http://cn.redux.js.org/docs/introduction/ThreePrinciples.html

2. ​

### 20170312

-------

学习了redux部分基础

2.1 action中

```
样板文件使用提醒
使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。参照 减少样板代码 获取更多保持代码简洁的实践经验。
```

[减少样板代码](http://cn.redux.js.org/docs/recipes/ReducingBoilerplate.html) 还没仔细看

2.2 reducer中

```
处理 Reducer 关系时的注意事项

开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式，本文中为了保持示例简单没有这样处理。
```

[normalizr](https://github.com/paularmstrong/normalizr) 没仔细看

学习到拆分 Reducer明天[继续](http://cn.redux.js.org/docs/basics/Reducers.html)

### 20170313

------

总结，store存放唯一数据，action定义事件名以及参数，reducer处理事件

学习到 搭配react，英文文献随便看了一看[容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

明天[继续](http://cn.redux.js.org/docs/basics/UsageWithReact.html)

### 20170314

------

搭配react重新看一下

然后查看完整例子

明天[继续](http://cn.redux.js.org/docs/basics/ExampleTodoList.html)

### 20170315

-------

tudolist运行成功翻看一下代码

体会

1. 入口文件index.js，关联了html的元素，渲染整个app，以及创建了store，

2. store由redux的createStore创建，传入的是一个reducers

3. reducers为state的各个部分的处理方法，最后通过combineReducers产生标准的reducers对象

4. containers/app.js 为业务代码入口通过react-redux的connect方法给整个组件树共享store（connect方法第一个参数是一个mapStateToProps的函数，第二个参数是一个mapDispatchToProps）

   这个组件是一个容器组件链接其他展示组件以及redux

5. store包含 dispatch方法触发action，以及被connect处理之后state的结构

6. app组件内，放入其他具体业务的组件此例子里都是显示组件

明天继续看各个组件功能AddTodo、TodoList、Footer以及containers/app.js

### 20170316

-----

体会，

react-redux 在外层把store放入app，然后connect决定store的state内容

此例子的函数操作只是积于all的情况，在active的时候因为可见todos的index可能在all里面已经完成而导致没法完成todo

传入app一个alltodos，在todolist里渲染todo的时候加上一个switch函数把filter传进来，根据filter类型渲染不同的部分，这样map的永远是全部todos保证了index的一致性

并且在add里加入了为空的时候不加

明天看下一张了可以[开始](http://cn.redux.js.org/docs/basics/ExampleTodoList.html)

### 20170326

----

redux-thunk中间件函数，发起请求？

redux-logger 日志？

todo下面两个

router里面包router外面包provider（todo-list）【可以优化一下】

完整的reddit api代码看一下

