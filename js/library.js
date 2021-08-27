"use strict";
class UIApp {
  constructor(params) {
    this.changeData = (changeTo) => {
      this.data = Object.assign(Object.assign({}, this.data), changeTo);
      const body = document.querySelector(this.root);
      // re-render app
      body.innerHTML = "";
      this.view(this.elements);
      return null;
    };
    this.TextView = (value, options) => {
      const renderElement = document.querySelector(this.root);
      const el = document.createElement(
        `${
          options != undefined &&
          (options === null || options === void 0 ? void 0 : options.type) !=
            undefined
            ? options === null || options === void 0
              ? void 0
              : options.type
            : "p"
        }`
      );
      el.className = `${
        options &&
        (options === null || options === void 0 ? void 0 : options.classes) !=
          undefined
          ? options === null || options === void 0
            ? void 0
            : options.classes
          : ""
      }`;
      el.innerHTML = value;
      return renderElement.appendChild(el);
    };
    this.Button = (value, options) => {
      const renderElement = document.querySelector(this.root);
      const { onclick, classes } = options;
      const el = document.createElement("button");
      el.innerHTML = value;
      if (options != undefined) {
        el.className = `${classes}`;
        el.onclick = onclick;
      }
      return renderElement.appendChild(el);
    };
    this.Input = (value, options) => {
      const renderElement = document.querySelector(this.root);
      const el = document.createElement("input");
      const { setvalue, type, classes, onchange } = options;
      el.value = value;
      el.innerHTML = value;
      el.className = `${classes}`;
      el.type = `${type}`;
      if (onchange != undefined) {
        el.addEventListener("change", () => onchange());
      }
      el.addEventListener("change", (e) => {
        const body = document.querySelector(this.root);
        setvalue(e.target.value);
        // re-render app
        body.innerHTML = "";
        this.view(this.elements);
      });
      return renderElement.appendChild(el);
    };
    this.List = (value, options) => {
      const { render } = options;
      if (options != undefined) {
        for (let i = 0; i < value.length; i++) {
          render(value[i], i);
        }
      }
    };
    this.Stack = (type, options) => {
      const renderElement = document.querySelector(this.root);
      const { value, classes } = options;
      const el = document.createElement("div");
      el.className = `
    flex 
    ${type == "column" ? "flex-col" : "flex-row"} 
    ${options && classes != undefined ? classes : ""}`;
      for (let i = 0; i < value.length; i++) {
        el.append(value[i]);
      }
      return renderElement.appendChild(el);
    };
    this.Group = (items, options) => {
      const renderElement = document.querySelector(this.root);
      const el = document.createElement("div");
      el.className = `${
        options === null || options === void 0 ? void 0 : options.classes
      }`;
      if (items != undefined) {
        for (let i = 0; i < items.length; i++) {
          el.append(items[i]);
        }
      }
      return renderElement.appendChild(el);
    };
    this.Spacer = () => {
      const renderElement = document.querySelector(this.root);
      const el = document.createElement("div");
      el.className = "flex-1";
      return renderElement.appendChild(el);
    };
    const { root, view, data } = params;
    const elements = {
      Button: this.Button,
      onMount: this.onMount,
      changeData: this.changeData,
      List: this.List,
      Group: this.Group,
      Stack: this.Stack,
      Input: this.Input,
      TextView: this.TextView,
      Spacer: this.Spacer,
    };
    this.root = root;
    this.data = data;
    this.view = view;
    this.elements = elements;
  }
  render() {
    this.view(this.elements);
  }
  onMount(code) {
    window.addEventListener("loadedmetadata", () => {
      this.render();
      code();
    });
  }
}
