<script lang="ts">
  import { Button, Snackbar, Dialog, Row, Col } from "svelte-materialify";
  import Users from "./Users.svelte";
  import CreateTask from "./CreateTask.svelte";
  import { fetchTasks } from "../stores/init-stores";
  import Tasks from "./Tasks.svelte";

  let dialogActive = false;

  async function handleTasksUpdated(event) {
    console.log(event);
    dialogActive = false;
    await fetchTasks();
  }
</script>

<div style="" class="boardcontainer">
  <div class="text-center">
    <Users />
  </div>
  <div class="text-center">
    <Button
      on:click={() => {
        dialogActive = true;
      }}>Add new Task</Button
    >
  </div>
  <div class="" style="overflow: scroll;">
    <Tasks />
  </div>
</div>

<Dialog class="pa-4 text-center" bind:active={dialogActive}>
  <CreateTask on:tasks_updated={handleTasksUpdated} />
</Dialog>

<style>
  .boardcontainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: inherit;
    max-height: 85vh;
  }
</style>
