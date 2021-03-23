<script lang="ts">
  import MainBoard from "./ui/MainBoard.svelte";
  import {
    MaterialApp,
    NavigationDrawer,
    List,
    ListItem,
    Icon,
  } from "svelte-materialify";
  import {
    mdiHomeCity,
    mdiAccount,
    mdiAccountGroup,
    mdiBrightness6,
  } from "@mdi/js";
  import { onDestroy, onMount } from "svelte";
  import time from "./stores/time-store";
  import Alert from "./ui/Alert.svelte";
  import { initStores } from "./stores/init-stores";
  import { tasks } from "./stores/tasks-store";
  import { users } from "./stores/users-store";

  let theme = "dark";
  let mini = true;

  onMount(async () => {
    await initStores();

    console.log($tasks);
    console.log($users);
  });

  onDestroy(() => {});

  function toggleTheme() {
    if (theme === "light") theme = "dark";
    else theme = "light";
  }

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
</script>

<MaterialApp {theme}>
  <div class="d-flex justify-center">
    <NavigationDrawer {mini} style="height:100vh">
      <List>
        <ListItem>
          <span slot="prepend">
            <Icon path={mdiHomeCity} class="indigo-text" />
          </span>
          Home
        </ListItem>
        <ListItem>
          <span slot="prepend">
            <Icon path={mdiAccount} class="indigo-text" />
          </span>
          Account
        </ListItem>
        <ListItem>
          <span slot="prepend">
            <Icon path={mdiAccountGroup} class="indigo-text" />
          </span>
          User
        </ListItem>
        <ListItem>
          <span slot="prepend" on:click={toggleTheme}>
            <Icon path={mdiBrightness6} class="indigo-text" />
          </span>
          Toggle Theme
        </ListItem>
      </List>
    </NavigationDrawer>
    <Alert />
    <main>
      <h2 class="mb-4">Kanban App</h2>
      {formatter.format($time)}
      <MainBoard />
    </main>
  </div>
</MaterialApp>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background-color: var(--theme-app-bar);
    width: 100vw;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
