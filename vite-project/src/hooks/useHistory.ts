import { useSyncExternalStore } from "react"

/* 利用useSyncExternalStore 获取history内容与订阅变化 */
export const useHistory = () => {

  const subscribe = (callback: () => void) => {
    // 订阅浏览器api 监听history变化
    // vue 中有三种路由模式 ssr （服务端渲染） 浏览器 hash history
    // hash模式 的底层是监听 hashchange 事件
    // history模式 的底层是监听 popstate 事件
    window.addEventListener("popstate", callback);
    window.addEventListener("hashchange", callback);
    return () => {
      // 取消订阅
      window.removeEventListener('popstate', callback);
      window.removeEventListener('hashchange', callback);
    }
  }
  // 获取当前浏览器地址
  const getSnapshot = () => {
    return window.location.href;
  }

  const url = useSyncExternalStore(subscribe, getSnapshot)

  // popstate 只能监听浏览器的前进和后退按钮 无法监听 pushState 和 replaceState
  // history push操作
  const push = (url: string) => {
    window.history.pushState(null, '', url)
    // 手动触发 popstate 事件，以便其他监听器能够接收到更新
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  // history replace操作
  const replace = (url: string) => {
    window.history.replaceState(null, "", url)
    // 手动触发 popstate 事件，以便其他监听器能够接收到更新
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  return [url, push, replace] as const;
}