<script lang="ts">
  import { Avatar } from "svelte-materialify";
  import { getMinifiedUser } from "../common/utils";

  export let asignee: string;
</script>

<Avatar size="36px" class="blue white-text">{getMinifiedUser(asignee)}</Avatar>
