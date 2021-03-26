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
    Icon,
    Tooltip,
  } from "svelte-materialify";
  import type Task from "../core/Task";
  import { httpDelete, httpGet } from "../common/api";
  import { fetchTasks } from "../stores/init-stores";
  import { alert } from "../stores/alert-store";
  import CreateTask from "./CreateTask.svelte";
  import { mdiBook, mdiBug, mdiCalendarCheck, mdiHelp, mdiLink } from "@mdi/js";
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import { tasks } from "../stores/tasks-store";
  import { Link, links } from "svelte-routing";

  const dispatch = createEventDispatcher();
  export let task: Task;
  let deleteActive = false;
  let editActive = false;
  let cardIcon;

  async function deleteTask() {
    console.log(task.id);
    const { ok } = await httpDelete(`/tasks/${task.id}`);
    if (ok) {
      fetchTasks();
      deleteActive = false;
      $alert = "The task was deleted";
    }
  }

  onMount(() => {
    setupIcon();
  });

  afterUpdate(() => {
    setupIcon();
  });

  function setupIcon() {
    switch (task.type) {
      case 1:
        cardIcon = mdiBook;
        break;
      case 2:
        cardIcon = mdiBug;
        break;
      case 3:
        cardIcon = mdiCalendarCheck;
        break;
      case 4:
        cardIcon = mdiHelp;
        break;
    }
  }

  async function handleTaskUpdated(e) {
    console.log(e);
    editActive = false;
    setupIcon();
    dispatch("tasks_updated", {
      text: "success",
    });
  }
</script>

<div class="rounded elevation-2 " style="display: flex; flex-direction: column">
  <Card outlined>
    <Row>
      <Col>
        <CardTitle>
          <a href={"/detail/" + task.id} use:links>
            {task.title}
          </a>
        </CardTitle>
        <CardSubtitle>
          {task.description}
        </CardSubtitle>
        <Asignee asignee={task.asignee} />
        <!-- <Avatar size="36px" class="blue white-text"> -->
        {#if task.type !== 0}
          <Icon path={cardIcon} />
        {/if}
        <!-- </Avatar> -->
        {#if task.type === 1}
          SP 0
        {/if}
        {#if task.linked}
          <Icon path={mdiLink} />
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
  <CreateTask {task} on:task_updated={handleTaskUpdated} />
</Dialog>

<style>
</style>
