<script lang="ts">
  import { Row } from "svelte-materialify";
  import UserBadge from "./UserBadge.svelte";
  import { users } from "../stores/users-store";
</script>

<Row>
  {#each $users as user}
    <div>
      <UserBadge {user} />
    </div>
  {/each}
</Row>
