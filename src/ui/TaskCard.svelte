<script lang="ts">
  import Asignee from "./Asignee.svelte";
  import {
    Card,
    Dialog,
    CardActions,
    Row,
    Col,
    CardTitle,
    CardSubtitle,
    Avatar,
    Button,
  } from "svelte-materialify";
  import type Task from "../core/Task";
  import { httpDelete } from "../common/api";
  import { fetchTasks } from "../stores/init-stores";
  import { alert } from "../stores/alert-store";
  import CreateTask from "./CreateTask.svelte";

  export let task: Task;
  let deleteActive = false;
  let editActive = false;

  async function deleteTask() {
    console.log(task.id);
    const { ok } = await httpDelete(`/tasks/${task.id}`);
    if (ok) {
      fetchTasks();
      deleteActive = false;
      $alert = "The task was deleted";
    }
  }
</script>

<div class="rounded elevation-2 " style="display: flex; flex-direction: column">
  <Card outlined>
    <Row>
      <Col>
        <CardTitle>{task.title}</CardTitle>
        <CardSubtitle>
          {task.description}
        </CardSubtitle>
        Otro contenido aqui? SP? Type?
        <Asignee asignee={task.asignee} />
        <Avatar size="36px" class="blue white-text">{task.type}</Avatar>
        {#if task.type === 1}
          Story Points 0
        {/if}
        <CardActions>
          <Button rounded outlined on:click={() => (editActive = true)}
            >Edit</Button
          >
          <Button rounded outlined on:click={() => (deleteActive = true)}
            >Delete</Button
          >
        </CardActions>
      </Col>
    </Row>
  </Card>
</div>

<Dialog class="pa-4 text-center" bind:active={deleteActive}>
  <p>Confirm delete Task {task.title}</p>
  <Button on:click={deleteTask}>Delete</Button>
  <Button on:click={() => (deleteActive = false)}>Cancel</Button>
</Dialog>

<Dialog class="pa-4 text-center" bind:active={editActive}>
  <p>Edit Task {task.title}</p>
  <CreateTask
    {task}
    on:task_updated={() => {
      editActive = false;
      fetchTasks();
    }}
  />
</Dialog>

<style>
</style>
