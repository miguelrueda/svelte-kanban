<script lang="ts">
  import { TextField, Row, Col, Button, Select } from "svelte-materialify";
  import type Task from "../core/Task";
  import { httpGet, httpPost } from "../common/api";
  import { createEventDispatcher, onMount } from "svelte";
  import type User from "../core/User";
  import { alert } from "../stores/alert-store";

  let taskTitle;
  let taskDescription;
  let taskAsignee;
  let taskType;
  export let users;
  let selectValues = [];
  let taskTypes = [];
  let taskTypesSelect = [];

  const dispatch = createEventDispatcher();
  const requiredRule = [(v) => !!v || "required"];
  const rules = [
    (v) => !!v || "required",
    (v) => v.length <= 50 || "Max 50 characters",
  ];

  async function addTask() {
    let task: Task = {
      title: taskTitle,
      description: taskDescription,
      status: 0,
      asignee: taskAsignee,
      type: taskType,
    };
    $: console.log(task);
    const { ok } = await httpPost("/tasks", task);
    if (ok) {
      dispatch("tasks_updated", {
        text: "success",
      });
      $alert = "The task was added";
    }
  }

  onMount(async () => {
    await fetchTaskTypes();
    $: console.log(taskTypes);
    users.forEach((u: User) => {
      selectValues.push({ name: u.name, value: u.alias });
    });
    selectValues.push({ name: "unassigned", value: "ua" });

    taskTypes.forEach((t) => {
      taskTypesSelect.push({ name: t.desc, value: t.id });
    });
  });

  async function fetchTaskTypes() {
    const { data } = await httpGet("/task_types");
    taskTypes = data;
  }
</script>

<Row>
  <Col>
    <h3>add new task</h3>
    <br />
    <TextField
      clearable
      outlined
      counter={20}
      maxlength="20"
      class="accent-1
      "
      bind:value={taskTitle}
      {requiredRule}>task title</TextField
    >
    <TextField
      clearable
      outlined
      counter={50}
      {rules}
      bind:value={taskDescription}>description</TextField
    >
    <Select outlined items={selectValues} bind:value={taskAsignee}
      >asignee</Select
    >
    <Select outlined items={taskTypesSelect} bind:value={taskType}>type</Select>
    <Button depressed class="primary-color" on:click={addTask}>add task</Button>
  </Col>
</Row>
