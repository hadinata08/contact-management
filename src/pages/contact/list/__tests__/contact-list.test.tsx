import { render, screen } from "@testing-library/react";
import ContactList from "..";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../store";

test("renders ContactList component without errors", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactList />
      </Router>
    </Provider>
  );
});

test("renders Add Contact button", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactList />
      </Router>
    </Provider>
  );
  const addContactButton = screen.getByText("Add Contact");
  expect(addContactButton).toBeInTheDocument();
});
