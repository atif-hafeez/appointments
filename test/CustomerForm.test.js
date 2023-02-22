import React from "react";
import { 
  initializeReactContainer,
  render, 
  click,
  element,
  form,
  field,
  submit,
  submitButton,
  change,
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

  describe("first name field", () => {
    it("renders as a textbox", () => {
      render(<CustomerForm original={blankCustomer}/>)
      
      expect(field("firstName")).not.toBeNull();
      expect(field("firstName").tagName).toEqual("INPUT");
      expect(field("firstName").type).toEqual("text")
    })

    it("includes the existing value", () => {
      const customer = {firstName: "Ashley"};
      render (<CustomerForm original={customer} />);
      expect(field("firstName").value).toEqual("Ashley");
    })

    it("renders a label", () => {
      render(<CustomerForm original={blankCustomer} />);
      const label = element("label[for=firstName]");
      expect(label).not.toBeNull();
    })

    it("assigns an id that matches the label id", () => {
      render(<CustomerForm original={blankCustomer} />);
      
      expect(field("firstName").id).toEqual("firstName");
    });

    it("saves existing value when submitted", () => {
      expect.hasAssertions();
  
      const customer = {firstName:"Ashley"};
      render(
        <CustomerForm
          original={customer}
          onSubmit={({firstName}) => 
            expect(firstName).toEqual("Ashley")
          }
        />
      )
      const button = element("input[type=submit]");
      click(button);
    });

    it("saves new value when submitted", () => {
      expect.hasAssertions();
      render (
        <CustomerForm
          original={blankCustomer}
          onSubmit={({firstName}) =>
            expect(firstName).toEqual("Jamie")
          }
        />
      );
  
      change(field("firstName"), "Jamie");
      click(submitButton());
    })

  })

  it("renders 'First Name' as the first name label", () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element("label[for=firstName]");
    expect(label).toContainText("First Name");
  })

  

  it("renders a Submit button", () => {
    render(<CustomerForm original={blankCustomer}/>);
    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(
      <CustomerForm
        original={blankCustomer}
        onSubmit={()=> {}}
      />
    );
    const event = submit(form());
    expect(event.defaultPrevented).toBe(true);
  })


})