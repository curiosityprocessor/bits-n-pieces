<script>
  export let data;
</script>

<h1>Prompt</h1>
<div>
  {#each data.prompts as { id, alias }}
    <ul>
      <li>
        <p>id: {id}</p>
        <p>alias: {alias}</p>
      </li>
    </ul>
  {/each}
</div>
