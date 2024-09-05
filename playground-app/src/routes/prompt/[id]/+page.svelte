<script>
  export let data;
</script>

<h1>Prompt #{data.prompt?.id}</h1>
<div>
  {#each data.prompt?.messages || [] as { role, content }}
    <p>role: {role}</p>
    <p>content: {content}</p>
  {/each}
</div>
