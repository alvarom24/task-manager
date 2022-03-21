import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "antd";

/* Shared */
import { useTaskManagerState } from "../../state/reducers/taskManagerReducer";
import { Task, User } from "../../types";

/* Custom Components*/
import { UserComponent } from "./User";
import { TaskComponent } from "../task/Task";

/* Styles */
import "../../App.scss";

interface RouteParameters {
  userId?: string;
}

export function UsersContainer(): React.ReactElement {
  const { userId }: RouteParameters = useParams();
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const {
    state: { users, tasks },
    dispatch,
  } = useTaskManagerState();

  const handleUserSelection = (userId: number): void => {
    dispatch({ type: "UNSELECT_USERS" });
    dispatch({ type: "SET_SELECTED_USER", payload: { userId } });
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const cloneTasks = Object.assign([], tasks);
    const userTasks = cloneTasks.filter(
      (task: Task) => task.userId === parseInt(userId as string, 10)
    );

    setCurrentTasks(userTasks as unknown as Task[]);
    handleUserSelection(parseInt(userId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Row>
      <Col span={12} className="users-container">
        <Row>
          <Col>
            <h1>Users</h1>
          </Col>
        </Row>
        {users.map((user: User): React.ReactElement => {
          return (
            <Row key={user.id} className="user-row">
              <UserComponent
                user={user}
                onSelect={(id: number) => handleUserSelection(id)}
              />
            </Row>
          );
        })}
      </Col>
      <Col span={12} className="users-container">
        <Row>
          <Col>
            <h1>Tasks List</h1>
          </Col>
        </Row>
        {currentTasks.length > 0 && <TaskComponent tasks={currentTasks} />}
      </Col>
    </Row>
  );
}

export default UsersContainer;
