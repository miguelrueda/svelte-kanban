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

  let theme = "dark";
  let mini = true;

  function toggleTheme() {
    if (theme === "light") theme = "dark";
    else theme = "light";
  }
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
    <main>
      <h2 class="mb-4">Kanban App</h2>
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
