function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

// We use requestIdleCallback to make a loop.
// You can think of requestIdleCallback as a setTimeout, but instead of us telling it when to run,
// the browser will run the callback when the main thread is idle.
requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork) {}

const Reaquiti = {
  createElement,
  render,
};

/** @jsx Reaquiti.createElement */
const element = (
  <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
    <h1>Hello Reaquiti</h1>
  </div>
);

const container = document.getElementById("root");
Reaquiti.render(element, container);
