// react 的jsx语法通过 babel、swc、esbuild 等编译器转换成 js 代码
const React = {
  createElement: function (type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          if (typeof child === "object") {
            return child;
          } else {
            return React.createTextElement(child);
          }
        }),
      },
    };
  },
  createTextElement: function (text, props, ...children) {
    return {
      type: "TEXT_ELEMENT",
      props: { nodeValue: text, children: [] },
    };
  },
};

const vdom = React.createElement(
  "div",
  { id: "foo" },
  "hello",
  React.createElement("a", null, "world")
);
console.log("vdom", vdom);

// 完成虚拟DOM 转Fiber结构 和 时间切片
let nextUnitOfWork = null; // 下一个工作单元
let wipRoot = null; // 工作中的根节点 fiber树
let currentRoot = null; // (旧的fiber树)当前根节点
let deletions = null; // 删除的节点 fiber

// 初始化工作单元, 初始化时，传入放入节点与根节点类似 createRoot(doucment.getElementById('root').render(<App />))
function render(element, container) {
  // 首先初始化wiproot(fiber树)，根节点
  wipRoot = {
    dom: container, // 根节点对应的DOM元素
    props: {
      children: [element], // 根节点下的子节点
    },
    alternate: currentRoot, // 当前旧的fiber树，用于diff算法比较新旧树的不同
  };
  deletions = []; // 初始化删除的节点列表为空
  nextUnitOfWork = wipRoot; // 下一个工作单元为根节点
}

// 创建一个fiber节点（工作单元）
function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type); // 创建DOM节点
  // 挂载新的属性；初始化渲染时没有更新，所以prevProps为空对象
  // 相当于新旧属性对比，删除旧的属性，添加新的属性
  updateDom(dom, {}, fiber.props);
  return dom;
}
function updateDom(dom, prevProps, nextProps) {
  // 旧的属性删除，遍历旧的属性，不是children的属性，则删除为空
  Object.keys(prevProps)
    .fiter(name => name !== "children")
    .forEach(name => (dom[name] = ""));

  // 新的属性要添加
  Object.keys(nextProps)
    .fiter(name => name !== "children")
    .forEach(name => (dom[name] = nextProps[name]));
}

// 创建workloop 时间切片函数
function workLoop(deadline) {
  let showldYield = false; // 是否应该暂停执行
  while (nextUnitOfWork && !showldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行下一个工作单元
    showldYield = deadline.timeRemaining() < 1; // 如果剩余时间小于1毫秒，则暂停执行
    // 如果没有下一个工作单元，则跳出循环
  }
  requestIdleCallback(workLoop); // 请求下一帧执行
}
// 执行下一个工作单元函数
requestIdleCallback(workLoop);

// 一个工作单元就相当于fiber节点
function performUnitOfWork(fiber) {
  // 如果fiber节点不存在则创建一个新的fiber节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber); // 创建fiber节点
  }
  let elements = fiber.props.children; // 子节点数组
  // 初始化完fiber根节点后，开始遍历子节点
  reconcileChildren(fiber, elements);
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 如果有兄弟节点，则返回兄弟节点
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent; // 如果没有兄弟节点，则返回父节点
  }
  return null; // 没有父节点，则返回null
}

function reconcileChildren(fiber, elements) {
  // diff 算法
  // 形成fiber树
  let index = 0; // 当前索引
  let prevSibling = null; // 上一个兄弟节点
  let oldFiber = fiber.alternate && fiber.alternate.child; // 旧的fiber树的第一个子节点
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index]; // 当前子节点
    const newFiber = null;
    // 复用: 比较新旧子节点是否相同，如果相同则复用旧fiber树的子节点
    const stameType = oldFiber && element && oldFiber.type === element.type; // 比较新旧子节点是否相同
    if (stameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props, // 新子节点的props
        parent: fiber, // 父节点
        dom: oldFiber.dom, // 复用旧fiber树的DOM节点
        alternate: oldFiber, // 旧fiber树对应的当前子节点
        effectTag: "UPDATE", // 更新标记
      };
    }
    // 新增
    if (element && !stameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: oldFiber.dom, // 复用旧fiber树的DOM节点
        effectTag: "PLACEMENT", // 新增标记
        alternate: oldFiber, // 旧fiber树对应的当前子节点
      };
    }
    // 删除
    if (oldFiber && !stameType) {
      deletions.push(oldFiber); // 将旧fiber树对应的当前子节点添加到删除列表中
    }
    if (oldFiber) oldFiber = oldFiber.sibling; // 移动到下一个旧fiber树对应的当前子节点

    if (index === 0) {
      // 如果是第一个子节点，则设置为父节点的child
      fiber.child = newFiber; // 设置为父节点的第一个子节点
    } else if (element) {
      prevSibling.sibling = newFiber; // 否则设置为上一个兄弟节点的下一个兄弟节点
    }
    prevSibling = newFiber; // 更新上一个兄弟节点为当前fiber
    index++; // 索引加1
  }
}

// 渲染函数
render(vdom, document.getElementById("root"));
