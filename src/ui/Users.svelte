<script lang="ts">
  import { Row } from "svelte-materialify";
  import { httpGet } from "../common/api";
  import { onMount } from "svelte";
  import type User from "../core/User";
  import type Task from "../core/Task";
  import UserBadge from "./UserBadge.svelte";

  export let users: User[];
  export let tasks: Task[] = [];

  onMount(() => {
    fetchTasks();
  });

  async function fetchTasks() {
    const { data } = await httpGet("/tasks");
    tasks = data;
  }
</script>

<Row>
  {#each users as user}
    <div>
      <UserBadge {user} />
    </div>
  {/each}
</Row>
