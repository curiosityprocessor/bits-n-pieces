<script lang="ts">
  import {
    faCaretRight,
    faExclamationTriangle,
    faTimesCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { SlideToggle } from '@skeletonlabs/skeleton';
  export let form;
  import markdownit from 'markdown-it';
  import { full as emoji } from 'markdown-it-emoji';

  let systemPromptUiOpen = false;
  let parameterUiOpen = false;

  let responseText = '';
  let htmlText = '';
  let isStreaming = false;

  let metadata: Record<string, any> = {};

  const handleStreamResponse = async (reader: ReadableStreamDefaultReader) => {
    const decoder = new TextDecoder('utf-8');
    const startAt = performance.now();
    const timeout = 1000 * 60 * 2; // 2 minutes

    const md = markdownit({
      html: true,
      xhtmlOut: true,
      breaks: true,
      linkify: true,
      typographer: true,
    });
    md.use(emoji);
    md.linkify.set({ fuzzyLink: false });

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        metadata = {
          duration: Math.floor((performance.now() - startAt) / 10) / 100,
          promptTokens: 1542,
          outputTokens: 123,
          stopReason: 'stop',
        };
        break;
      }
      if (performance.now() - startAt > timeout) {
        break;
      }

      responseText += decoder.decode(value, { stream: true });
      htmlText = md.render(responseText);
    }
  };

  const handleSumbit = async (event: SubmitEvent) => {
    event.preventDefault();
    isStreaming = true;
    responseText = '';
    htmlText = '';

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
      htmlText = 'No response from the server';
    }
    isStreaming = false;
  };
</script>

<div class="flex flex-col h-full">
  <header class="flex justify-between items-center p-4 border-b">
    <h1 class="h1">Task</h1>
    <SlideToggle name="help" checked>HELP</SlideToggle>
  </header>

  <div class="flex flex-grow">
    <div class="flex flex-col w-1/2 min-w-[200px] resize-x overflow-auto border-r p-4">
      <form method="post" on:submit={handleSumbit}>
        <h3 class="h3 mb-4">Input</h3>

        <div class="mb-4 variant-soft rounded">
          <button
            type="button"
            class="w-full btn-lg variant-soft p-2 rounded flex justify-between text-left"
            on:click={() => (systemPromptUiOpen = !systemPromptUiOpen)}
          >
            <span>System Prompt</span>
            {systemPromptUiOpen ? '▲' : '▼'}
          </button>
          {#if systemPromptUiOpen}
            <div class="w-full mt-2 p-4">
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

        <div class="mb-4 variant-soft rounded">
          <button type="button" class="w-full btn-lg variant-soft p-2 rounded text-left"
            >User Prompt</button
          >
          <div class="w-full mt-2 p-4">
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
              />
            </label>
          </div>
        </div>

        <div class="mb-4 variant-soft rounded">
          <button
            type="button"
            class="w-full btn-lg variant-soft p-2 rounded flex justify-between text-left"
            on:click={() => (parameterUiOpen = !parameterUiOpen)}
          >
            <span>Model Parameters</span>
            {parameterUiOpen ? '▲' : '▼'}
          </button>
          {#if parameterUiOpen}
            <div class="w-full mt-2 p-4">
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
        <div class="flex justify-end">
          {#if isStreaming}
            <button type="submit" class="btn-md variant-soft p-2 rounded" disabled>
              <div class="spinner-container flex justify-center items-center">
                <div
                  class="spinner-border animate-spin border-4 border-solid border-blue-500 border-t-transparent rounded-full h-4 w-4"
                ></div>
                <span class="ml-2">Running...</span>
              </div>
            </button>
          {:else}
            <button type="submit" class="btn-md variant-filled-secondary p-2 rounded">
              <FontAwesomeIcon icon={faCaretRight} />
              <span>Try it!</span></button
            >
          {/if}
        </div>
      </form>
    </div>

    <div class="w-1/2 p-4">
      <h3 class="h3">Output</h3>
      <label class="label mt-4">
        <span>Assistant message</span>
        <textarea
          class="textarea"
          readonly
          rows="20"
          placeholder="AI 응답값"
          bind:value={responseText}
        />
        <div
          class="textarea min-h-[15vh] mt-4 p-4 whitespace-prewrap"
          contenteditable
          bind:innerHTML={htmlText}
        />
      </label>
      <h4 class="h4 mt-4">Metadata</h4>
      <div class="variant-soft mt-2 table-container">
        <table class="table table-compact table-auto">
          <colgroup>
            <col class="variant-soft w-[12vw]" />
            <col class="variant-ringed" />
          </colgroup>
          <tbody>
            <tr>
              <td class="font-bold">소요시간</td>
              <td>
                <div class="spinner-container flex items-center">
                  {#if isStreaming}
                    <div
                      class="spinner-border animate-spin border-4 border-solid border-blue-500 border-t-transparent rounded-full h-4 w-4"
                    />
                  {/if}
                  <span class="ml-2">{metadata?.duration ?? ''} s</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>프롬프트 토큰 수</td>
              <td>
                <div class="spinner-container flex items-center">
                  {#if isStreaming}
                    <div
                      class="spinner-border animate-spin border-4 border-solid border-blue-500 border-t-transparent rounded-full h-4 w-4"
                    />
                  {/if}
                  <span class="ml-2">{metadata?.promptTokens ?? ''} tokens</span>
                </div></td
              >
            </tr>
            <tr>
              <td>결과 토큰 수</td>
              <td>
                <div class="spinner-container flex items-center">
                  {#if isStreaming}
                    <div
                      class="spinner-border animate-spin border-4 border-solid border-blue-500 border-t-transparent rounded-full h-4 w-4"
                    />
                  {/if}
                  <span class="ml-2">{metadata?.outputTokens ?? ''} tokens</span>
                </div></td
              >
            </tr>
            <tr>
              <td>상태</td>
              <td>
                <div class="spinner-container flex items-center">
                  {#if isStreaming}
                    <div
                      class="spinner-border animate-spin border-4 border-solid border-blue-500 border-t-transparent rounded-full h-4 w-4"
                    />
                  {/if}
                  <span class="ml-2">{metadata?.stopReason ?? ''}</span>
                </div></td
              >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
