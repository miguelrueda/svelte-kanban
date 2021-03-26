<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { httpGet } from "../common/api";
  import { Row, Col } from "svelte-materialify";

  import type Task from "../core/Task";
  import { fetchTasks } from "../stores/init-stores";
  import { tasks } from "../stores/tasks-store";
  import { groups } from "../stores/groups-store";
  import type TaskStatus from "../core/TaskStatus";
  import type TaskType from "../core/TaskType";
  import { links, navigate } from "svelte-routing";

  export let id;
  let task: Task = {};
  let taskStatus: TaskStatus = {};
  let taskType: TaskType = {};

  onMount(async () => {
    console.log(`onMount() called with id: ${id}`);
    await fetchTask(id)
      .then((t) => {
        task = t;
      })
      .catch((e) => {
        console.log("##############task not found");
        task = null;
      });
    if ((task && task != null) || task != undefined) {
      await fetchGroup(task.status)
        .then((g) => {
          taskStatus = g;
        })
        .catch((e) => {
          console.log("##############status not found");
        });
      await fetchType(task.type).then((t) => {
        taskType = t;
      });
    }
  });

  afterUpdate(() => {});

  async function fetchTask(id: number) {
    const { data } = await httpGet(`/tasks/${id}`);
    return data;
  }

  async function fetchGroup(id: number) {
    const { data } = await httpGet(`/status/${id}`);
    return data;
  }

  async function fetchType(id: number) {
    const { data } = await httpGet(`/task_types/${id}`);
    return data;
  }

  function nav(path) {
    navigate(`/${path}`, { replace: true });
  }
</script>

{#if task}
  <Row>
    <Col>
      <h3>{task.title}</h3>
    </Col>
  </Row>
  <Row>
    <Col>Task Description</Col>
    <Col>{task.description}</Col>
  </Row>
  <Row>
    <Col>Asignee</Col>
    <Col>{task.asignee}</Col>
  </Row>
  <Row>
    <Col>Status</Col>
    <Col>{taskStatus.name}</Col>
  </Row>
  <Row>
    <Col>Type</Col>
    <Col>{taskType.desc}</Col>
  </Row>
  <Row>
    <Col>Linked Tasks</Col>
    <Col>
      {#if task.linked}
        <a href={"/detail/" + task.linked} use:links>
          Task {task.linked}
        </a>
      {:else}
        Not linked
      {/if}
    </Col>
  </Row>
{:else}
  <Row>
    <Col>
      <h3>Task not found</h3>
      <br />
      <a href={"/"} use:links> Go Home </a>
    </Col>
  </Row>
{/if}
