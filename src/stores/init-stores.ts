import { httpGet } from "../common/api";
import { tasks } from "../stores/tasks-store";
import { users } from "../stores/users-store";
import { groups } from "../stores/groups-store";
import { taskTypes } from "./task-types-store";

export async function initStores() {
    await fetchTasks();
    await fetchUsers();
    await fetchStatusGroups();
    await fetchTaskTypes();
}

export async function fetchTasks() {
    const { data } = await httpGet("/tasks");
    tasks.set(data);
  }

  async function fetchStatusGroups() {
    const { data } = await httpGet("/status");
    groups.set(data);
  }

  async function fetchUsers() {
    const { data } = await httpGet("/users");
    users.set(data);
  }

  export async function fetchTaskTypes() {
    const { data } = await httpGet("/task_types");
    taskTypes.set(data);
  }