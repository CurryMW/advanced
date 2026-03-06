import { useSyncExternalStore } from "react";

/* 创建一个 hooks 类似 useState修改状态 */
export function useStorage(key: string, initialValue: any) {
  //  用来订阅数据源的变化，接受一个回调函数，在数据源更新时调用该回调函数。
  const subscribe = (callback: () => void) => {
    // 订阅数据源的变化 监听本地存储的变化
    window.addEventListener("storage", callback);
    return () => {
      // 取消订阅数据源的变化
      window.removeEventListener("storage", callback);
    }
  }

  // 获取当前数据源的快照（当前状态）。
  // 在这个函数中，我们从 localStorage 中获取数据，并返回一个快照对象。我们还使用了 lastSnapshot 和 lastCount 来缓存上一次的快照和计数，以避免不必要的重新渲染。
  let lastSnapshot: any = null;
  let lastCount: number | null = null;
  const getSnapshot = () => {
    const res = JSON.parse(localStorage.getItem(key)!) || initialValue;
    console.log('res', res, lastSnapshot, lastCount);
    if (lastSnapshot && lastCount === res.count) {
      return lastSnapshot;
    }
    console.log('lastSnapshot', lastSnapshot, lastCount);
    lastCount = res?.count;
    lastSnapshot = { count: res?.count }
    return lastSnapshot;
  }

  // 获取存储数据
  const res = useSyncExternalStore(subscribe, getSnapshot)
  // 更新存储数据
  const updateStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    // 触发本地存储变化事件，以便其他监听器能够接收到更新
    // 通知订阅者，手动触发storage事件
    window.dispatchEvent(new StorageEvent("storage"))
  }

  return [res, updateStorage] as const;
}



// const [count, setCount] = useStorage("count", 0);