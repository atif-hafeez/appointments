import React from "react";
import { 
  initializeReactContainer,
  render, 
  click,
  element,
  form,
  field,
  elements,
  typesOf,
  textOf,
} from "./reactTestExtension";
import {CustomerForm} from "../src/CustomerForm"

describe("Customer Form", () => {

  const blankCustomer = {
    firstName: ""
  }

  beforeEach(() => {
    initializeReactContainer();
  })

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  it("renders the first name field as a textbox", () => {
    render(<CustomerForm original={blankCustomer}/>)
    
    expect(field("firstName")).not.toBeNull();
    expect(field("firstName").tagName).toEqual("INPUT");
    expect(field("firstName").type).toEqual("text")
  })

  it("includes the existing value for the first name", () => {
    const customer = {firstName: "Ashley"};
    render (<CustomerForm original={customer} />);
    expect(field("firstName").value).toEqual("Ashley");
  })

  it("renders a label for the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).not.toBeNull();
  })

  it("renders 'First Name' as the first name lab", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).toContainText("First Name");
  })

  it("assigns an id that matches the label id to the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);
    
    expect(field("firstName").id).toEqual("firstName");
    
  })
})