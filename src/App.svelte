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
  import { Router, Link, Route, navigate } from "svelte-routing";
  import About from "./ui/About.svelte";
  import Detail from "./ui/Detail.svelte";

  let theme = "dark";
  let mini = true;
  export let url = "";

  onMount(async () => {
    await initStores();
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

  function nav(path) {
    navigate(`/${path}`, { replace: true });
  }
</script>

<MaterialApp {theme}>
  <Alert />
  <div class="d-flex" style="height: 100vh">
    <div style="display: flex: flex: 1">
      <NavigationDrawer {mini} style="display: flex; height: 100%;">
        <List>
          <ListItem>
            <span slot="prepend" on:click={() => nav("")}>
              <Icon path={mdiHomeCity} class="indigo-text" />
            </span>
            Home
          </ListItem>
          <ListItem>
            <span slot="prepend" on:click={() => nav("about")}>
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
    </div>
    <Router {url}>
      <div style="dsplay: flex; flex: 1; width: 96vw">
        <main class="maincontent">
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <h2 class="mb-4">Kanban App</h2>
            {formatter.format($time)}
            <MainBoard />
          </Route>
          <Route path="/detail/:id" let:params>
            <Detail id={params.id} />
          </Route>
        </main>
      </div>
    </Router>
  </div>
</MaterialApp>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background-color: var(--theme-app-bar);
    width: 98vw;
    height: 100%;
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
