import React, { ReactElement, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Row, Col } from "antd";

/* Shared */
import { useTaskManagerState } from "./state/reducers/taskManagerReducer";
import { apiUser } from "./utilities/http/apiUser";
import { AppRoutes } from "./routes/App.routes";

/* Custom Components */
import { Spinner } from "./components/spinner/Spinner";

/* Styles */
import "./App.scss";

export function App(): ReactElement {
  const {
    state: { users, tasks, loading },
    dispatch,
  } = useTaskManagerState();

  useEffect(() => {
    async function fetchUsers() {
      if (users.length === 0) {
        dispatch({ type: "FETCH_USERS" });

        try {
          const usersResponse = await apiUser.getUsers();
          if (!usersResponse) {
            console.error("Couldn't fetch users");
            return;
          }
          dispatch({ type: "SET_USERS", payload: { users: usersResponse } });
        } catch (e) {
          console.error(e);
        }
      }
    }
    async function fetchTasks() {
      if (users.length === 0) {
        dispatch({ type: "FETCH_TASKS" });
        try {
          const tasksResponse = await apiUser.getTasks();
          if (!tasksResponse) {
            console.error("Couldn't fetch tasks");
            return;
          }
          dispatch({ type: "SET_TASKS", payload: { tasks: tasksResponse } });
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchUsers();
    fetchTasks();
  }, [dispatch, users.length]);

  return (
    <>
      <Row>
        <Col span={24} className="col-title">
          <h1>Onboarding Tracker</h1>
        </Col>
      </Row>

      {loading || tasks.length === 0 ? (
        <Spinner />
      ) : (
        <Row>
          <Col span={24}>
            <Router>
              <AppRoutes />
            </Router>
          </Col>
        </Row>
      )}
    </>
  );
}

export default App;
