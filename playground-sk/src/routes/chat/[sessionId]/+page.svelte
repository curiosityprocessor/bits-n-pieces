<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import _ from 'lodash';

  export let data;
  let currentMessage = '';
  let currentChats = data.chats;

  let chatElement: HTMLElement;
  let textAreaElement: HTMLTextAreaElement;

  const scrollChatToBottom = (behavior: ScrollBehavior = 'smooth') => {
    chatElement.scrollTo({ top: chatElement.scrollHeight, behavior });
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) {
      return;
    }
    const newMessage = {
      sessionId: data.chats[0].sessionId,
      title: data.chats[0].title,
      userId: data.chats[0].userId,
      chatId: (_.last(data.chats)?.chatId ?? 0) + 1,
      role: 'user',
      timestamp: new Date().toISOString(),
      content: currentMessage,
    };

    currentChats = [...currentChats, newMessage];
    console.log(currentChats);
    data.chats = currentChats;
    setTimeout(() => {
      scrollChatToBottom();
    }, 0);
    currentMessage = '';
    textAreaElement.value = '';
    adjustTextAreaHeight();
  };

  const onMessageKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
      return;
    }
  };

  const adjustTextAreaHeight = () => {
    if (textAreaElement) {
      textAreaElement.style.height = 'auto';
      textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
    }
  };
</script>

<div class="grid grid-row-[1fr_auto] w-full h-full">
  <section bind:this={chatElement} class="w-full h-[80vh] p-4 overflow-y-auto space-y-4">
    {#each data.chats as bubble}
      {#if bubble.role === 'user'}
        <!-- User Message Bubble -->
        <div class="grid grid-cols-[1fr_auto] gap-2">
          <div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
            <header class="flex justify-between items-center">
              <p class="font-bold">Me</p>
              <small class="opacity-50">{bubble.timestamp}</small>
            </header>
            <p style="white-space: pre-wrap;">{bubble.content}</p>
          </div>
          <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
        </div>
      {:else}
        <!-- Assistant Message Bubble -->
        <div class="grid grid-cols-[auto_1fr] gap-2">
          <Avatar src="https://i.pravatar.cc/?img=58" width="w-12" />
          <div class="card p-4 variant-soft rounded-tl-none space-y-2">
            <header class="flex justify-between items-center">
              <p class="font-bold">AI</p>
              <small class="opacity-50">{bubble.timestamp}</small>
            </header>
            <p style="white-space: pre-wrap;">{bubble.content}</p>
          </div>
        </div>
      {/if}
    {/each}
  </section>
  <section class="border-t border-surface-500/30 p-4 sticky-bottom">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
      <button class="input-group-shim">+</button>
      <textarea
        bind:value={currentMessage}
        bind:this={textAreaElement}
        class="bg-transparent border-0 ring-0"
        name="userMessage"
        id="userMessage"
        placeholder="Write a message..."
        rows="1"
        on:keydown={onMessageKeyDown}
        on:input={adjustTextAreaHeight}
        style="overflow:hidden; resize:none;"
      />
      <button
        class={currentMessage.trim() ? 'variant-filled-primary' : 'input-group-shim'}
        on:click={sendMessage}
      >
        SEND
      </button>
    </div>
  </section>
</div>

<style>
  .sticky-bottom {
    position: sticky;
    bottom: 0;
    z-index: 99;
  }
</style>
