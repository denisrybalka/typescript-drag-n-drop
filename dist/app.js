"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    const { value, max, min, maxLength, minLength, required } = validatableInput;
    if (required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }
    if (minLength != null && typeof value === "string") {
        isValid = isValid && value.length > minLength;
    }
    if (maxLength != null && typeof value === "string") {
        isValid = isValid && value.length < maxLength;
    }
    if (min != null && typeof value === "number") {
        isValid = isValid && value > min;
    }
    if (max != null && typeof value === "number") {
        isValid = isValid && value < max;
    }
    return isValid;
}
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.attach();
        this.configure();
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
        };
        if (!validate(peopleValidatable) ||
            !validate(titleValidatable) ||
            !validate(descriptionValidatable)) {
            alert("Invalid input, please try again!");
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        console.log(userInput);
    }
    configure() {
        this.element.addEventListener("submit", this.handleSubmit);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "handleSubmit", null);
const prjInput = new ProjectInput();
