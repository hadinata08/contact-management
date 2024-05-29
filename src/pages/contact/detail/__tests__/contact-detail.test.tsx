import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../store";
import ContactDetail from "..";

test("renders ContactList component without errors", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactDetail />
      </Router>
    </Provider>
  );
});

test("renders Back Contact button", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactDetail />
      </Router>
    </Provider>
  );
  const addContactButton = screen.getByText("Back");
  expect(addContactButton).toBeInTheDocument();
});
