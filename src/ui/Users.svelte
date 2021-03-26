<script lang="ts">
  import { Row } from "svelte-materialify";
  import UserBadge from "./UserBadge.svelte";
  import { users } from "../stores/users-store";
  import { onMount } from "svelte";

  let renderUsers = false;
  let users_value;

  const unsubscribe = users.subscribe((value) => {
    users_value = value;
    if (users_value && users_value.length >= 1) {
      renderUsers = true;
    }
  });

  onMount(() => {});
</script>

<div class="users-row">
  {#if renderUsers}
    {#each $users as user}
      <div>
        <UserBadge {user} />
      </div>
    {/each}
  {:else}
    <div class="user_header">
      <h6>No users found</h6>
    </div>
  {/if}
</div>

<style>
  .users-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .user_header {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
