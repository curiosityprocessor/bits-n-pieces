<script>
  export let data;
</script>

<h1>Chat</h1>
<div>
  {#each data.chats as { sessionId, title, firstMessage, createdAt }}
    <ul>
      <li>
        <p><a href={`/chat/${sessionId}`}>sessionId: {sessionId}</a></p>
        <p>title: {title}</p>
        <p>firstMessage: {firstMessage}</p>
        <p>createdAt: {createdAt}</p>
      </li>
    </ul>
  {/each}
</div>
