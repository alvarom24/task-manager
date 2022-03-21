import React from "react";
import { render, screen } from "@testing-library/react";

/* Fixtures*/
import {
  SelectedElementHtml,
  tasksFixture,
} from "./fixtures/TaskManagerFixtures";

import App from "./App";
import { TaskManagerProvider } from "./state/reducers/taskManagerReducer";
import { TaskComponent } from "./components/task/Task";

// To allow jest to mock jsdom
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("it should render application title", () => {
  render(
    <TaskManagerProvider>
      <App />
    </TaskManagerProvider>
  );
  const title = screen.getByText(/Onboarding Tracker/i);
  expect(title).toBeInTheDocument();
});

test("it should render list of tasks", () => {
  const { container } = render(
    <TaskManagerProvider>
      <TaskComponent tasks={tasksFixture} />
    </TaskManagerProvider>
  );
  const title = screen.getByText(/delectus aut autem/i);
  expect(container.getElementsByClassName("task-wrapper").length).toBe(4);
  expect(container.getElementsByClassName("task-wrapper")[3].innerHTML).toBe(
    SelectedElementHtml
  );
});
