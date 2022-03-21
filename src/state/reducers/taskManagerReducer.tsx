import { createContext, ReactNode, useContext, useReducer } from "react";
import { User, Task } from "../../types";

export type taskManagerAction =
  | { type: "FETCH_USERS" }
  | { type: "FETCH_TASKS" }
  | {
      type: "SET_USERS";
      payload: { users: User[] };
    }
  | {
      type: "SET_TASKS";
      payload: { tasks: Task[] };
    }
  | {
      type: "SET_TASK_COMPLETED";
      payload: { taskId: number; value: boolean };
    }
  | {
      type: "SET_SELECTED_USER";
      payload: { userId: number };
    }
  | {
      type: "UNSELECT_USERS";
    };

export interface TasksState {
  loading: boolean;
  users: User[];
  tasks: Task[];
}

type Dispatch = (action: taskManagerAction) => void;

export const taskManagerInitialState: TasksState = {
  loading: false,
  users: [],
  tasks: [],
};

export const taskManagerReducer = (
  state: TasksState,
  action: taskManagerAction
): TasksState => {
  switch (action.type) {
    case "FETCH_USERS": {
      return { ...state, loading: true };
    }
    case "FETCH_TASKS": {
      return { ...state, loading: true };
    }
    case "SET_USERS": {
      const { users } = action.payload;
      return {
        ...state,
        loading: false,
        users,
      };
    }
    case "SET_TASKS": {
      const { tasks } = action.payload;
      return {
        ...state,
        loading: false,
        tasks,
      };
    }
    case "UNSELECT_USERS": {
      const cloneStateUsers = Object.assign([], state.users);
      return {
        ...state,
        loading: false,
        users: cloneStateUsers.map((user: User) => {
          return { ...user, selected: false };
        }),
      };
    }
    case "SET_SELECTED_USER": {
      const { userId } = action.payload;
      const cloneStateUsers = Object.assign([], state.users);
      const user = cloneStateUsers.find((user: User) => user.id === userId) as
        | User
        | undefined;
      if (user) {
        user.selected = true;
      }
      return {
        ...state,
        loading: false,
        users: cloneStateUsers,
      };
    }
    case "SET_TASK_COMPLETED": {
      const { taskId, value } = action.payload;
      const cloneTasks = Object.assign([], state.tasks);
      const foundTask = cloneTasks.find((task: Task) => task.id === taskId) as
        | Task
        | undefined;

      if (foundTask) {
        foundTask.completed = value;
      }

      return {
        ...state,
        loading: false,
        tasks: cloneTasks,
      };
    }
    default:
      return state;
  }
};

const TaskManagerStateContext = createContext<
  { state: TasksState; dispatch: Dispatch } | undefined
>(undefined);

interface TaskManagerProviderProps {
  children: ReactNode;
  reducerInitialState?: TasksState;
}

export function TaskManagerProvider(props: TaskManagerProviderProps) {
  const { children, reducerInitialState } = props;
  const initialState = reducerInitialState ?? {
    loading: false,
    users: [],
    tasks: [],
  };
  const [state, dispatch] = useReducer(taskManagerReducer, initialState);

  const value = { state, dispatch };

  return (
    <TaskManagerStateContext.Provider value={value}>
      {children}
    </TaskManagerStateContext.Provider>
  );
}

export function useTaskManagerState() {
  const context = useContext(TaskManagerStateContext);
  if (!context) {
    throw new Error(
      "useTaskManagerState must be used within a TaskManagerProvider"
    );
  }

  return context;
}
