<script lang="ts">
  import { onMount } from "svelte";
  import { httpGet, httpPut } from "../common/api";
  import TaskCard from "./TaskCard.svelte";
  import { Button, Row, Col, Snackbar, Dialog } from "svelte-materialify";
  import Users from "./Users.svelte";
  import CreateTask from "./CreateTask.svelte";

  export let date: Date;
  let snackbar = false;
  let users = [];
  let tasks = [];
  let groups = [];
  let snackbarContent = "";
  let active1;

  async function fetchUsers() {
    const { data } = await httpGet("/users");
    users = data;
  }

  async function fetchTasks() {
    const { data } = await httpGet("/tasks");
    tasks = data;
  }

  async function fetchStatusGroups() {
    const { data } = await httpGet("/status");
    groups = data;
  }

  async function fetchTask(id: number) {
    const { data } = await httpGet(`/tasks/${id}`);
    return data;
  }

  async function updateTask(task) {
    const { ok } = await httpPut(`/tasks/${task.id}`, task);
    if (ok) {
      fetchTasks();
    }
  }

  onMount(() => {
    fetchUsers();
    fetchTasks();
    fetchStatusGroups();
  });

  function handleDragStart(event) {
    let attributeId = event.target.getAttribute("id");
    console.log("handle drag start", attributeId);

    event.dataTransfer.setData("id", attributeId);

    console.log(event.dataTransfer);
    console.log(attributeId);
  }

  function dragover(event) {
    event.preventDefault();
    console.log("dragover");
    event.dataTransfer.dropEffect = "move";
  }

  function drop(event, group) {
    event.preventDefault();
    console.log("drop called");
    var i = event.dataTransfer.getData("id");
    console.log(event.dataTransfer);
    console.log(i);

    let task = fetchTask(i).then((t) => {
      $: console.log(t);
      console.log(
        `Move Task ${t.id} from group ${t.status} to new group ${group}`
      );
      t.status = group;
      $: console.log(t);
      updateTask(t);
    });
    console.log(task);
  }
</script>

<div>
  <div>
    <Users {users} />
  </div>
  <div class="text-center">
    <Button
      on:click={() => {
        active1 = true;
      }}>Add new Task</Button
    >
  </div>
  <div class="container">
    <Row class="align-start" noGutters>
      {#each groups as group, g}
        <Col style={"border: 1px solid black; height: 90vh"}>
          <div
            class="pa-2"
            on:click={() => {
              snackbar = true;
              snackbarContent = `Clicked from Group ${group.name}`;
            }}
          >
            {group.name}
          </div>
          <div
            on:drop={(e) => drop(e, g)}
            on:dragover={dragover}
            style="height: 85vh"
          >
            <div>
              {#each tasks.filter((t) => t.status == g) as task, i}
                <div
                  id={task.id}
                  draggable="true"
                  on:dragstart={handleDragStart}
                >
                  <TaskCard {task} />
                </div>
              {/each}
            </div>
          </div>
        </Col>
      {/each}
    </Row>
  </div>
  <!--container-->
</div>

<Dialog class="pa-4 text-center" bind:active={active1}>
  <CreateTask {users} />
</Dialog>

<Snackbar
  class="flex-column"
  bind:active={snackbar}
  bottom
  center
  timeout={3000}
>
  Here are some actions
  <div class="mt-1">
    <Button text class="success-text">Accept</Button>
    <Button
      class="red-text"
      text
      on:click={() => {
        snackbar = false;
      }}>{snackbarContent}</Button
    >
  </div>
</Snackbar>

<style>
  .container {
    padding: 8px;
    margin-bottom: 12px;
    background-color: var(--theme-app-bar);
  }

  .col {
    border: 1px solid black;
  }
</style>
