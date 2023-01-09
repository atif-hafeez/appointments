import React from "react";
import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils"
import {Appointment} from "../src/Appointment";


describe("Appointment", () => {

  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  })

  const render = component => 
    act(() => 
      ReactDOM.createRoot(container).render(component)
    );
  
  
  it("renders the costumer first name", () => {
    const customer = {firstName: "Ashley"}; 
    render(<Appointment customer={customer}/>);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another costumer's first name", () => {
    const customer = {firstName: "Jordan"};
    render(<Appointment customer={customer}/>);
    expect(document.body.textContent).toContain("Jordan");
  });
});