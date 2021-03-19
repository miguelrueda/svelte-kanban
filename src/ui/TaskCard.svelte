<script lang="ts">
  import Asignee from "./Asignee.svelte";
  import {
    Card,
    CardText,
    CardActions,
    Row,
    Col,
    CardTitle,
    CardSubtitle,
    Avatar,
  } from "svelte-materialify";

  export let task;
</script>

<div class="rounded elevation-2 " style="flex-grow:1; max-width:300px;">
  <Card outlined style="max-width:300px">
    <Row>
      <Col>
        <CardTitle>{task.title}</CardTitle>
        <CardSubtitle>
          {task.description}
        </CardSubtitle>
        <CardActions>
          <!-- <Button rounded outlined>Action</Button> -->
          <Asignee asignee={task.asignee} />
          <Avatar size="36px" class="blue white-text">{task.type}</Avatar>
        </CardActions>
      </Col>
    </Row>
  </Card>
</div>

<style>
</style>
