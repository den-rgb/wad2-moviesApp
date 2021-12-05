import React from "react";
import Login from "../components/login";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "User Page/Login",
  component: Login,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <Login/>;

Basic.storyName = "Default";