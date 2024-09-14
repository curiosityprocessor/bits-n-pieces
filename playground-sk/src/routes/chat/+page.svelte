<script>
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

  export let data;
</script>

<div class="flex flex-col h-full">
  <header class="flex justify-between items-center p-4 border-b">
    <h1 class="h1">Chat</h1>
  </header>

  <div class="flex flex-col mt-4">
    <nav class="list-nav">
      <ul>
        {#each data.chats as { sessionId, title, firstMessage, createdAt, messageCount }}
          <li>
            <a href={`/chat/${sessionId}`}>
              <div class="flex w-full">
                <div class="relative inline-block">
                  <span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
                    >{messageCount}</span
                  >
                  <span class="badge bg-secondary-500 h-9 w-12"># {sessionId}</span>
                </div>
                <span class="flex-auto ml-3">
                  <dt class="font-bold">{title}</dt>
                  <dd>
                    <div class="flex w-full">
                      <span class="flex-none w-[80%]"
                        >{firstMessage.length > 50
                          ? firstMessage.slice(0, 50) + '...'
                          : firstMessage}</span
                      >

                      <span class="text-sm flex-none w-[20%] ml-2"
                        ><FontAwesomeIcon icon={faPaperPlane} /> {createdAt}</span
                      >
                    </div>
                  </dd>
                </span>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
