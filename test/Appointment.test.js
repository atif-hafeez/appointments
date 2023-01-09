import React from "react";
import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils"
import {Appointment} from "../src/Appointment";


describe("Appointment", () => {
  it("renders the costumer first name", () => {
    const customer = {firstName: "Ashley"}
    const component = <Appointment customer={customer}/>
    const container = document.createElement("div");

    document.body.appendChild(container);
    act(() =>
      ReactDOM.createRoot(container).render(component)
    )
    
    expect(document.body.textContent).toContain("Ashley");
  });
});

describe("Appointment", () => {
  it.skip("renders another costumer's first name", () => {
    const customer = {firstName: "Jordan"}
    const component = <Appointment customer={customer}/>
    const container = document.createElement("div");

    document.body.appendChild(container);
    act(() =>
      ReactDOM.createRoot(container).render(component)
    )
    
    expect(document.body.textContent).toContain("Jordan");
  });
});