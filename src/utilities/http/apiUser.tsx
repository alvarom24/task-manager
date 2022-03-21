export const apiUser = {
  getUsers: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users;
  },
  getTasks: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const tasks = await response.json();
    return tasks;
  },
  markTaskAsComplete: async () => {
    // this is just a fake call to the api, to simulate the task completion change
    await fetch("https://jsonplaceholder.typicode.com/todos");
    return true;
  },
};
