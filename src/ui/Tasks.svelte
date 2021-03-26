<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { tasks } from "../stores/tasks-store";
  import {
    Button,
    Row,
    Col,
    Snackbar,
    Dialog,
    ListItem,
    Menu,
    List,
  } from "svelte-materialify";
  import { groups } from "../stores/groups-store";
  import { alert } from "../stores/alert-store";
  import { fetchTasks } from "../stores/init-stores";
  import { httpGet, httpPut } from "../common/api";
  import TaskCard from "./TaskCard.svelte";

  let renderTasks = false;
  let snackbarContent = "";

  let tasks_value;

  let snackbar = false;

  const unsubscribe = tasks.subscribe((value) => {
    tasks_value = value;
    if (tasks_value && tasks_value.length >= 1) {
      renderTasks = true;
    }
  });

  onMount(async () => {});

  onDestroy(unsubscribe);

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

  // TODO: if the same tasks is dropped, the message does not appear
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
      $alert = `The task ${t.id} was updated`;
      t.status = group;
      $: console.log(t);
      updateTask(t);
    });
    console.log(task);
  }

  // TODO: How to refactor this tasks?
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

  async function handleUpdate() {
    console.log("***************************");
    await fetchTasks();
  }
</script>

<div class="container">
  {#if renderTasks}
    <Row class="align-start" noGutters style={"border: 1px solid black;"}>
      {#each $groups as group, g}
        <Col style={"border: 1px solid black;"}>
          <div class="pa-2">
            {group.name}
          </div>
          <div on:drop={(e) => drop(e, g)} on:dragover={dragover} style="">
            <div>
              {#each $tasks.filter((t) => t.status == g) as task, i}
                <div
                  id={task.id}
                  draggable="true"
                  on:dragstart={handleDragStart}
                >
                  <TaskCard {task} on:tasks_updated={handleUpdate} />
                </div>
              {/each}
            </div>
          </div>
        </Col>
      {/each}
    </Row>
  {:else}
    <div>
      <h6>No tasks found</h6>
    </div>
  {/if}
</div>

<style>
  .container {
    border: 1px solid aqua;
  }
</style>
