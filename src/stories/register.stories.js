import React from "react";
import Register from "../components/register";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "User Page/Register",
  component: Register,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <Register/>;

Basic.storyName = "Default";