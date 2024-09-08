<script>
  import { Avatar } from '@skeletonlabs/skeleton';

  export let data;
</script>

<section class="w-full max-h-[400px] p-4 overflow-y-auto space-y-4">
  {#each data.chats as bubble, i}
    {#if bubble.role === 'user'}
      <div class="grid grid-cols-[1fr_auto] gap-2">
        <div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
          <header class="flex justify-between items-center">
            <p class="font-bold">Me</p>
            <small class="opacity-50">{bubble.timestamp}</small>
          </header>
          <p>{bubble.content}</p>
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
          <p>{bubble.content}</p>
        </div>
      </div>
    {/if}
  {/each}
</section>
