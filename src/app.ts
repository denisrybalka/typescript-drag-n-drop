interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
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

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.attach();
    this.configure();

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
    };

    if (
      !validate(peopleValidatable) ||
      !validate(titleValidatable) ||
      !validate(descriptionValidatable)
    ) {
      alert("Invalid input, please try again!");
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @Autobind
  private handleSubmit(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    console.log(userInput);
  }

  private configure() {
    this.element.addEventListener("submit", this.handleSubmit);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
