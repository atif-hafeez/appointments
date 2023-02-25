import React from "react";
import {
  initializeReactContainer,
  render,
  field,
  form,
  element,
  elements,
} from "./reactTestExtensions";
import { toContainText } from "./matchers/toContainText";
import {AppointmentForm} from "../src/AppointmentForm";

const findOption = (selectBox, textContent) => {
  const options = Array.from(selectBox.childNodes);
  return options.find(
    option => option.textContent === textContent
  );
};

describe("AppointmentForm", () => {

  const blankAppointment = {
    service: ""
  };

  const services = ["Cut", "Blow-dry"];

  beforeEach(()=> {
    initializeReactContainer();
  });

  const labelsOfAllOptions = (element) =>
    Array.from(
      element.childNodes,
      (node) => node.textContent
    );
  
  it("renders a form", () => {
    render(
      <AppointmentForm 
        original={blankAppointment}
      />
    );
    expect(form()).not.toBeNull();
  })

  describe("service field", () => {
 
    it("renders as a select box", () => {
      render(
        <AppointmentForm 
          original={blankAppointment}
        />
      );
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    })
    it("has a blank value as the first value", () => {
      render(
        <AppointmentForm 
          original={blankAppointment}
        />
      );
      const firstOption = field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    })

    it("list all salon services", () => {
      
  
      render(
        <AppointmentForm
          original={blankAppointment} 
          selectableServices={services} />
      );
  
      expect(
        labelsOfAllOptions(field("service"))
      ).toEqual(expect.arrayContaining(services));
    })

    it("pre-selects the existing value", () => {
      const appointment = {service: "Blow-dry"};

      render (
        <AppointmentForm
          selectableServices={services}
          original={appointment}
        />
      );
      const option = findOption(
        field("service"), 
        "Blow-dry"
      );
      expect(option.selected).toBe(true);
    })
  })

  describe("time slot table", () => {
    it("renders a table for time slots with an id", () => {
      render(
        <AppointmentForm original={blankAppointment}/>
      );
      expect(element("table#time-slots")).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times" , () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      );
  
      const timeofDayHeadings = elements("tbody >* th");
      expect(timeofDayHeadings[0]).toContainText(
        "09:00"
      );
      expect(timeofDayHeadings[1]).toContainText(
        "09:30"
      );
      expect(timeofDayHeadings[3]).toContainText(
        "10:30"
      );
    })
  });

 
})

