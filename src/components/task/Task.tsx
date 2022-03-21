import React, { useState } from "react";
import { Checkbox } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

/* Shared */
import { Task } from "../../types";
import { useTaskManagerState } from "../../state/reducers/taskManagerReducer";
import { apiUser } from "../../utilities/http/apiUser";

/* Custom Components */
import { Spinner } from "../spinner/Spinner";

type Props = {
  tasks: Task[];
};

export function TaskComponent({ tasks }: Props): React.ReactElement {
  const { dispatch } = useTaskManagerState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fakeApiCall = async (): Promise<boolean> => {
    await apiUser.markTaskAsComplete();
    return true;
  };

  const onChange = async (
    value: CheckboxChangeEvent,
    taskId: number
  ): Promise<void> => {
    const { checked } = value.target;
    setIsLoading(true);
    const updateTaskResponse = await fakeApiCall();

    if (updateTaskResponse) {
      dispatch({
        type: "SET_TASK_COMPLETED",
        payload: { value: checked, taskId },
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task: Task) => (
          <div className="task-wrapper" key={task.id}>
            {task.completed ? (
              <>
                <CheckCircleTwoTone twoToneColor={"#87d068"} /> {task.title}
              </>
            ) : (
              <Checkbox
                onChange={(value: CheckboxChangeEvent) =>
                  onChange(value, task.id)
                }
                checked={task.completed}
                disabled={task.completed}
              >
                {task.title}
              </Checkbox>
            )}
          </div>
        ))}
    </div>
  );
}
