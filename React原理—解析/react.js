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
