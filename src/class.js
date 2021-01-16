"use strict";
export default class CreateBox {
    constructor(wrapper, width, height, margin, background) {
        this.wrapper = document.querySelector(wrapper);
        this.width = width;
        this.height = height;
        this.background = background;
        this.margin = margin;
    }

    create() {
        const box = document.createElement('div');
        box.style.cssText = `
        width: ${this.width};
        height: ${this.height};
        margin: ${this.margin};
        background-color: ${this.background};
        `;
        this.wrapper.append(box);
    }
}
