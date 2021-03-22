<script lang="ts">
  import { Tooltip, Chip, Icon, Badge } from "svelte-materialify";
  import { mdiAccount } from "@mdi/js";
  import { onMount } from "svelte";
  import type User from "../core/User";
  import type Task from "../core/Task";
  import { httpGet } from "../common/api";

  export let user: User;
  let tasks: Task[] = [];
  let count = 0;
  $: userCount = count;

  onMount(async () => {
    await fetchTasks();

    count = getUserTasksCount();
  });

  async function fetchTasks() {
    const { data } = await httpGet("/tasks");
    tasks = data;
  }

  function getUserTasksCount() {
    return tasks.filter((t) => t.asignee == user.alias).length;
  }
</script>

<Tooltip top>
  <span slot="tip">{user.name}</span>
  <Badge
    value={userCount}
    class="primary-color"
    bordered
    offsetX={16}
    offsetY={16}
  >
    <Chip class="ma-2 indigo">
      <Icon path={mdiAccount} />
      <span>{user.name}</span>
    </Chip>
  </Badge>
</Tooltip>
