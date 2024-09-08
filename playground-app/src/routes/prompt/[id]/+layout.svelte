<script>
  export let data;
</script>

<div class="layout">
  <main>
    <slot></slot>
  </main>
</div>

<aside>
  <h2>더보기</h2>
  <ul>
    {#each data.prompts as { id, alias }}
      <li>
        <a href="/prompt/{id}">#{id}: {alias}</a>
      </li>
    {/each}
  </ul>
</aside>

<style>
  @media (min-width: 640px) {
    .layout {
      display: grid;
      grid-template-columns: 1fr 16em;
      gap: 2em;
    }
  }
</style>
