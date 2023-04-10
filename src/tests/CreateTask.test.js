import { screen, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import CreateTask from "../components/CreateTask";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("CreateTask", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  it("Should render all elements correctly", () => {
    render(
      <Provider store={store}>
        <CreateTask />
      </Provider>
    );
    expect(screen.getAllByRole("textbox")[0]).toBeTruthy();
    expect(screen.getAllByRole("textbox")[1]).toBeTruthy();
    expect(screen.getByTestId("tagList")).toBeTruthy();
    expect(screen.getAllByRole("button")).toBeTruthy();
  });
});
