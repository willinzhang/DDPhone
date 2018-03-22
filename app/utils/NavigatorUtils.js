/***
 * 返回上一个界面
 * @param navigator
 * @returns {boolean}
 */
export function pop (navigator) {
  if (!navigator) return false
  navigator.pop()
}

/***
 * 导航切换到一个新的页面中，新的页面进行压入栈。通过jumpForward()方法可以回退过去
 * @param navigator 导航组件
 * @param name 名称
 * @param Component  跳转view
 * @param params 需要参数
 * @returns {boolean}
 */
export function push (navigator, name, Component, params) {
  if (!navigator) {
    return false
  }
  navigator.push({
    name: name,
    component: Component,
    params: params
  })
}

/***
 * 只用传入的路由的指定页面进行替换掉当前的页面
 * @param navigator 导航组件
 * @param name 名称
 * @param Component 跳转view
 * @param params 需要参数
 * @returns {boolean}
 */
export function replace (navigator, name, Component, params) {
  if (!navigator) return false
  navigator.replace({
    name: name,
    component: Component,
    params: params
  })
}

/**
 * 跳转到新的场景，并且重置整个路由栈
 * @param navigator
 * @param name
 * @param Component
 * @param params
 * @returns {boolean}
 */
export function resetTo (navigator, name, Component, params) {
  if (!navigator) return false
  navigator.resetTo({
    name: name,
    component: Component,
    params: params
  })
}

/***
 * 界面切换(push  or jumpto)
 * @param navigator
 * @param Component
 * @param params
 * @returns {boolean}
 * @constructor
 */
export function pushOrjumpTo (navigator, name, Component, params) {
  if (!navigator) return false

  const currentRouteStack = navigator.getCurrentRoutes()
  let historyPosition = 0
  let histroyRoute
  let stack = currentRouteStack[0]
  currentRouteStack.some((item, index) => {
    // 根据 Component 查找在路由栈中是否已经存在
    if (Component === item.Component) {
      historyPosition = index
      histroyRoute = currentRouteStack[index]
      return true
    }
  })

  if (Component === stack[stack.length - 1]) {
    // 避免 Component 重复记录的情况
    stack.push(Component)
  }

  if (histroyRoute) {
    let nextRoute = currentRouteStack[historyPosition]
    navigator.jumpTo(nextRoute)
  } else {
    navigator.push({
      name: name,
      component: Component,
      params: params
    })
  }
}

