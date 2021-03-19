<script lang="ts">
  import { Row, Tooltip, Chip, Icon, Badge } from "svelte-materialify";
  import { mdiAccount } from "@mdi/js";
  import { httpGet } from "../common/api";
  import { onMount } from "svelte";
  import type User from "../core/User";
  import type Task from "../core/Task";

  export let users: User[];
  export let tasks: Task[] = [];

  onMount(() => {
    fetchTasks();
  });

  async function fetchTasks() {
    const { data } = await httpGet("/tasks");
    tasks = data;
  }

  function getUserTasksCount(alias: string) {
    let count = tasks.filter((t) => t.asignee == alias).length;
    return count;
  }
</script>

<Row>
  {#each users as user}
    <div>
      <Tooltip top>
        <span slot="tip">{user.name}</span>
        <Badge
          value={getUserTasksCount(user.alias)}
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
    </div>
  {/each}
</Row>
