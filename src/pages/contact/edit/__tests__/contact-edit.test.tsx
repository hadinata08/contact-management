import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../store";
import ContactEdit from "..";

test("renders ContactList component without errors", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactEdit />
      </Router>
    </Provider>
  );
});

test("renders Save Contact button", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactEdit />
      </Router>
    </Provider>
  );
  const addContactButton = screen.getByText("Save");
  expect(addContactButton).toBeInTheDocument();
});
