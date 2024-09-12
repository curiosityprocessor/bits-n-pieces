<script lang="ts">
  import { enhance } from '$app/forms';
  import {
    faCaretRight,
    faExclamationTriangle,
    faTimesCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { SlideToggle } from '@skeletonlabs/skeleton';
  export let form;

  let systemPromptUiOpen = false;
  let parameterUiOpen = false;

  let responseText = '';
  let isStreaming = false;

  const handleStreamResponse = async (reader: ReadableStreamDefaultReader) => {
    const decoder = new TextDecoder();
    const startAt = performance.now();
    const timeout = 1000 * 60 * 2; // 2 minutes

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (performance.now() - startAt > timeout) {
        break;
      }

      responseText += decoder.decode(value, { stream: true });
    }
  };

  const handleSumbit = async (event: SubmitEvent) => {
    event.preventDefault();
    console.log('event:', event);
    isStreaming = true;
    responseText = '';

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log(`debugging formData`);
    for (const [key, value] of formData.entries()) {
      console.log(key, value); // Make sure the input names and values are correct
    }

    const response = await fetch('/task', {
      method: 'POST',
      body: formData,
    });

    if (response.body) {
      const reader = response.body.getReader();
      await handleStreamResponse(reader);
    } else {
      responseText = 'No response from the server';
    }
    isStreaming = false;
  };
</script>

<div class="flex flex-col h-full">
  <header class="flex justify-between items-center p-4 border-b">
    <h1 class="h1">Task</h1>
    <SlideToggle name="help" checked>HELP</SlideToggle>
  </header>

  <!-- Data -->
  <div class="flex flex-grow">
    <div class="flex flex-col w-1/2 min-w-[200px] resize-x overflow-auto border-r p-4">
      <form method="post" on:submit={handleSumbit}>
        <h3 class="h3 mb-4">Input</h3>

        <div class="mb-4">
          <button
            type="button"
            class="w-full btn-lg variant-soft p-2 rounded flex justify-between text-left"
            on:click={() => (systemPromptUiOpen = !systemPromptUiOpen)}
          >
            <span>System Prompt</span>
            {systemPromptUiOpen ? '▲' : '▼'}
          </button>
          {#if systemPromptUiOpen}
            <div class="w-full mt-2">
              <label for="systemMessage" class="label"
                ><span>System message (optional)</span>
                <textarea
                  name="systemMessage"
                  class="textarea"
                  rows="4"
                  placeholder="(Optional)"
                  autocomplete="off"
                /></label
              >
            </div>
          {/if}
        </div>

        <div class="mb-4">
          <button type="button" class="w-full btn-lg variant-soft p-2 rounded text-left"
            >User Prompt</button
          >
          <div class="w-full mt-2">
            <label class="label">
              <span>User message</span>
              {#if form?.error}
                <aside class="alert variant-filled-error">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <div class="alert-message">
                    <p>{form.description}</p>
                  </div>
                  <div class="alert-actions">
                    <button type="button" on:click={() => (form.error = null)}>
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                </aside>
              {/if}
              <textarea
                name="userMessage"
                class="textarea"
                rows="15"
                placeholder=""
                autocomplete="off"
                required
              />
            </label>
          </div>
        </div>

        <div class="mb-4">
          <button
            type="button"
            class="w-full btn-lg variant-soft p-2 rounded flex justify-between text-left"
            on:click={() => (parameterUiOpen = !parameterUiOpen)}
          >
            <span>Model Parameters</span>
            {parameterUiOpen ? '▲' : '▼'}
          </button>
          {#if parameterUiOpen}
            <div class="w-full mt-2">
              <label class="label">
                <span>Temperature</span>
                <input name="temperature" type="range" value="75" max="100" />
              </label>
              <label class="label mt-4">
                <span>Max Input Tokens</span>
                <input
                  name="maxInputTokens"
                  class="input"
                  title="Max Input Tokens"
                  type="number"
                  placeholder="최대 15,000 개"
                  autocomplete="off"
                />
              </label>
              <label class="label mt-4">
                <span>Max Output Tokens</span>
                <input
                  name="maxOutputTokens"
                  class="input"
                  title="Max Output Tokens"
                  type="number"
                  placeholder="최대 2,048 개"
                  autocomplete="off"
                />
              </label>
            </div>
          {/if}
        </div>
        <div>
          <button
            type="submit"
            class="btn-md variant-filled-surface p-2 rounded"
            disabled={isStreaming}
          >
            <FontAwesomeIcon icon={faCaretRight} />
            <span>{isStreaming ? 'Running...' : 'Try it!'}</span></button
          >
        </div>
      </form>
    </div>

    <div class="w-1/2 p-4">
      <h3 class="h3 mb-4">Output</h3>
      <label class="label">
        <span>Assistant message</span>
        <textarea
          class="textarea"
          readonly
          rows="20"
          placeholder="AI 응답값"
          bind:value={responseText}
        />
      </label>
    </div>
  </div>
</div>
