<script lang="ts">
  import { TextField, Row, Col, Button, Select } from "svelte-materialify";
  import type Task from "../core/Task";
  import { httpGet, httpPost, httpPut } from "../common/api";
  import { createEventDispatcher, onMount } from "svelte";
  import type User from "../core/User";
  import { alert } from "../stores/alert-store";
  import { users } from "../stores/users-store";
  import { taskTypes } from "../stores/task-types-store";

  let taskTitle;
  let taskDescription;
  let taskAsignee;
  let taskType;
  let selectValues = [];
  let taskTypesSelect = [];

  export let task: Task;

  const dispatch = createEventDispatcher();
  const requiredRule = [(v) => !!v || "required"];
  const rules = [
    (v) => !!v || "required",
    (v) => v.length <= 50 || "Max 50 characters",
  ];

  async function saveChanges() {
    if (task) {
      editTask();
    } else {
      addTask();
    }
  }

  async function editTask() {
    let optask: Task = {
      title: taskTitle,
      description: taskDescription,
      status: 0,
      asignee: taskAsignee,
      type: taskType,
      id: task.id,
    };
    $: console.log(optask);
    const { ok } = await httpPut(`/tasks/${task.id}`, optask);
    if (ok) {
      dispatch("task_updated", {
        text: "success",
      });
      $alert = "The task was updated";
    }
  }

  async function addTask() {
    let optask: Task = {
      title: taskTitle,
      description: taskDescription,
      status: 0,
      asignee: taskAsignee,
      type: taskType,
    };
    $: console.log(optask);
    const { ok } = await httpPost(`/tasks`, optask);

    if (ok) {
      console.log("POST CORRECT?");
      dispatch("tasks_updated", {
        text: "success",
      });
      $alert = "The task was added";
    } else {
      console.log("DID NOT WORK");
    }
  }

  onMount(async () => {
    $: console.log($taskTypes);
    $users.forEach((u: User) => {
      selectValues.push({ name: u.name, value: u.alias });
    });
    selectValues.push({ name: "unassigned", value: "ua" });

    $taskTypes.forEach((t) => {
      taskTypesSelect.push({ name: t.desc, value: t.id });
    });

    if (task) {
      console.log(task);
      taskTitle = task.title;
      taskDescription = task.description;
      taskAsignee = task.asignee;
      taskType = task.type;
    } else {
      console.log("It is a new task");
    }
  });
</script>

<Row>
  <Col>
    {#if task}
      <h3>edit task</h3>
    {:else}
      <h3>add new task</h3>
    {/if}

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

    <Button depressed class="primary-color" on:click={saveChanges}>save</Button>
  </Col>
</Row>
