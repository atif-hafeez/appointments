import React from "react";
import { 
  initializeReactContainer,
  render, 
  click,
  element,
  form,
  elements,
  typesOf,
  textOf,
} from "./reactTestExtension";
import {CustomerForm} from "../src/CustomerForm"

describe("Customer Form", () => {
  beforeEach(() => {
    initializeReactContainer();
  })

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form()).not.toBeNull();
  })
})