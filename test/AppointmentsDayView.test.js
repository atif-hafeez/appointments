import React from "react";
import ReactDOM from "react-dom/client";
import {act} from "react-dom/test-utils"
import {Appointment, AppointmentsDayView} from "../src/AppointmentsDayView";


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

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const twoAppointments = [
    {
      startsAt: today.setHours(12,0),
      customer: {
        firstName: "Ashley",
        lastName: "Keeling",
        phoneNumber: "(554) 338-1814"
      },
      stylist: "Maggie",
      service: "Beard trim",
      notes: "Necessitatibus"
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {firstName: "Jordan"}
    },
  ];

  beforeEach(() => {
    container = document.createElement("div")
    document.body.replaceChildren(container)
  })
  const render = (component) =>
    act(() => 
      ReactDOM.createRoot(container).render(component)
    )

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(
      document.querySelector(
        "div#appointmentsDayView"
      )
    ).not.toBeNull()
    })

    it("renders an ol element to display appointments", () => {
      render(<AppointmentsDayView appointments={[]} />)
      const listElement = document.querySelector("ol")
      expect(listElement).not.toBeNull()
    })

    it("renders an li for each appointment", () => {
      render(
        <AppointmentsDayView 
          appointments={twoAppointments}
        />
      )

      const listChildren = 
        document.querySelectorAll("ol > li")

      expect(listChildren).toHaveLength(2);
    })

    it("render the time of each appointment", () => {
      render(
        <AppointmentsDayView 
          appointments={twoAppointments}
        />
      )

      const listChildren = 
        document.querySelectorAll("li");
        expect(listChildren[0].textContent).toEqual("12:00");
        expect(listChildren[1].textContent).toEqual("13:00");
    })

    it("initially shows a message saying there are no appointments today.", () => {
      render(<AppointmentsDayView appointments={[]} />);
      expect(document.body.textContent).toContain(
        "There are no appointments scheduled for today."
      );
    });

    it("selects the first appointment by default", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);
      expect(document.body.textContent).toContain(
        "Ashley"
      );
    });

    it("has a button element in each li", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      );

      const buttons = 
        document.querySelectorAll("li > button");

      expect(buttons).toHaveLength(2);
      expect(buttons[0].type).toEqual("button");
    })

    it("renders another appointment when selected", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      );

      const button = 
        document.querySelectorAll("button")[1];
        act(() => button.click());
        expect(document.body.textContent).toContain(
          "Jordan"
        );
    })

    it("renders a table element", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )
      const table = 
        document.querySelector('table');
      expect(table).not.toBeNull()     
    })

    it("renders a table with 5 rows", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )

      const rows = document.querySelectorAll("table > tr")
      expect(rows).toHaveLength(5)
    })

    it("render the five appointment fields", () => {
      render (
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )

      expect(document.body.textContent).toContain("Customer")
      expect(document.body.textContent).toContain("Phone number")
      expect(document.body.textContent).toContain("Stylist")
      expect(document.body.textContent).toContain("Service")
      expect(document.body.textContent).toContain("Notes")

    })

    it("render the five appointment values", () => {
      render (
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )

      expect(document.body.textContent).toContain("Ashley Keeling")
      expect(document.body.textContent).toContain("(554) 338-1814")
      expect(document.body.textContent).toContain("Maggie")
      expect(document.body.textContent).toContain("Beard trim")
      expect(document.body.textContent).toContain("Necessitatibus")
    })

    it("renders the heading element", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )

      const heading = 
        document.querySelector("h1");
      expect(heading).not.toBeNull();
    })

    it("render a heading showing the appointment date", () => {
      render(
        <AppointmentsDayView
          appointments={twoAppointments}
        />
      )
      
      expect(document.body.textContent)
        .toContain("Today's appointment at 12:00")

    })
})