import React from "react";
import renderer from "react-test-renderer";
import AdminPanel from "./AdminPanel";

test("AdminPanel renders correctly", () => {
  const component = renderer.create(<AdminPanel />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("handleChange updates eventData state correctly", () => {
  const component = renderer.create(<AdminPanel />);
  const instance = component.getInstance();

  // Simulate a change event on the name input
  const nameInput = { target: { name: "name", value: "New Event Name" } };
  instance.handleChange(nameInput);

  // Check if eventData state is updated correctly
  expect(instance.state.eventData.name).toBe("New Event Name");
});
