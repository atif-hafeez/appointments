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

  const itRendersAsATextBox = (firstName) => 
    it("renders as a textbox", () => {
      render(<CustomerForm original={blankCustomer}/>)
      
      expect(field(firstName)).not.toBeNull();
      expect(field(firstName).tagName).toEqual("INPUT");
      expect(field(firstName).type).toEqual("text")
    });

  const itIncludesTheExistingValue = (fieldName, existing) => {
    it("includes the existing value", () => {
      const customer = {[fieldName]: existing};
      render (<CustomerForm original={customer} />);
      expect(field(fieldName).value).toEqual(existing);
    })
  }

  describe("first name field", () => {
    
    
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley")
      

    const itRendersALabel = (fieldName, text) => {
      it("renders a label", () => {
      render(<CustomerForm original={blankCustomer} />);
      const label = element(`label[for=${fieldName}]`);
      expect(label).not.toBeNull();
      });
      it(`renders '${text}' as the label content`, () => {
        render(<CustomerForm original={blankCustomer} />);
        const label = element(`label[for=${fieldName}]`);
        expect(label).toContainText(text);
      })
    }
    itRendersALabel("firstName", "First Name")



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