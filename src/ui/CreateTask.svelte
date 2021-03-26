<script lang="ts">
  import { TextField, Row, Col, Button, Select } from "svelte-materialify";
  import type Task from "../core/Task";
  import { httpGet, httpPost, httpPut } from "../common/api";
  import { createEventDispatcher, onMount } from "svelte";
  import type User from "../core/User";
  import { alert } from "../stores/alert-store";
  import { users } from "../stores/users-store";
  import { taskTypes } from "../stores/task-types-store";
  import { groups } from "../stores/groups-store";
  import { tasks } from "../stores/tasks-store";
  import time from "../stores/time-store";

  export let task: Task;
  const dispatch = createEventDispatcher();

  let taskTitle;
  let taskDescription;
  let taskAsignee;
  let taskType;
  let taskStatus;
  let linked;
  let selectValues = [];
  let taskTypesSelect = [];
  let statusSelect = [];
  let linkedSelect = [];

  const requiredRule = [(v) => !!v || "required"];
  const rules = [
    (v) => !!v || "required",
    (v) => v.length <= 50 || "Max 50 characters",
  ];

  onMount(async () => {
    setupForm();

    // If we receive the param it is an edition
    if (task) {
      console.log(task);
      taskTitle = task.title;
      taskDescription = task.description;
      taskAsignee = task.asignee;
      taskType = task.type;
      taskStatus = task.status;
    }
  });

  function setupForm() {
    if ($users && $users.length >= 1) {
      $users.forEach((u: User) => {
        selectValues.push({ name: u.name, value: u.alias });
      });
    }
    selectValues.push({ name: "unassigned", value: "ua" });

    if ($taskTypes && $taskTypes.length >= 1) {
      $taskTypes.forEach((t) => {
        taskTypesSelect.push({ name: t.desc, value: t.id });
      });
    }
    taskTypesSelect.push({ name: "undefined", value: -1 });

    if ($groups && $groups.length >= 1) {
      $groups.forEach((g) => {
        statusSelect.push({ name: g.name, value: g.id });
      });
    }
    statusSelect.push({ name: "unknown", value: -1 });

    if ($tasks && $tasks.length >= 1) {
      let filtered: Task[];
      if (task) {
        filtered = $tasks.filter((t) => t.id !== task.id);
      } else {
        filtered = $tasks;
      }
      filtered.forEach((element) => {
        linkedSelect.push({ name: element.title, value: element.id });
      });
      linkedSelect.push({ name: "not linked", value: -1 });
    }
  }

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
      status: taskStatus,
      asignee: taskAsignee,
      type: taskType,
      id: task.id,
    };
    if (linked !== -1) {
      optask.linked = linked;
    }
    $: console.log(optask);
    const { ok } = await httpPut(`/tasks/${task.id}`, optask);
    if (ok) {
      dispatch("task_updated", {
        text: "success",
        updatedId: optask.id,
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
    if (linked !== -1) {
      optask.linked = linked;
    }
    $: console.log(optask);
    const { ok } = await httpPost(`/tasks`, optask);

    if (ok) {
      console.log("POST CORRECT?");
      dispatch("tasks_updated", {
        text: "success",
        updatedId: optask.id,
      });
      $alert = "The task was added";
    } else {
      console.log("DID NOT WORK");
    }
  }
</script>

<Row>
  <Col>
    {#if task}
      <h3>edit task</h3>
    {:else}
      <h3>add task</h3>
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
    {#if task}
      <Select outlined items={statusSelect} bind:value={taskStatus}>
        status
      </Select>
    {/if}
    <Select outlined items={selectValues} bind:value={taskAsignee}
      >asignee</Select
    >
    <Select outlined items={taskTypesSelect} bind:value={taskType}>type</Select>

    <Select outlined items={linkedSelect} bind:value={linked}>Linked</Select>

    <Button depressed class="primary-color" on:click={saveChanges}>save</Button>
  </Col>
</Row>
