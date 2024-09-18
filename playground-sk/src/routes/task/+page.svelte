<script lang="ts">
  import {
    faCaretRight,
    faExclamationTriangle,
    faQuestionCircle,
    faTimesCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { popup, RangeSlider, SlideToggle, type PopupSettings } from '@skeletonlabs/skeleton';
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

  const systemPromptPopup: PopupSettings = {
    event: 'hover',
    target: 'systemPromptPopup',
    placement: 'bottom',
  };

  const userPromptPopup: PopupSettings = {
    event: 'hover',
    target: 'userPromptPopup',
    placement: 'bottom',
  };

  const temperaturePopup: PopupSettings = {
    event: 'hover',
    target: 'temperaturePopup',
    placement: 'bottom',
  };

  const maxInputTokenPopup: PopupSettings = {
    event: 'hover',
    target: 'maxInputTokenPopup',
    placement: 'bottom',
  };

  const maxOutputTokenPopup: PopupSettings = {
    event: 'hover',
    target: 'maxOutputTokenPopup',
    placement: 'bottom',
  };

  let temperatureValue = 0.2;
  let maxTemperatureValue = 1.0;
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
              <label for="systemMessage" class="label">
                <div class="flex items-center">
                  <span>System message (optional)</span>
                  <button
                    class="btn [&>*]:pointer-events-none p-2"
                    type="button"
                    use:popup={systemPromptPopup}
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </button>
                </div>
                <textarea
                  name="systemMessage"
                  class="textarea"
                  rows="4"
                  placeholder="(Optional)"
                  autocomplete="off"
                />
                <div data-popup="systemPromptPopup">
                  <div class="card p-4 variant-filled-secondary">
                    <h3 class="h3">시스템 프롬프트</h3>
                    <p>default <code class="code">null</code></p>
                    <p>시스템 프롬프트는 이번 세션동안 유지되는 특성을 부여하는데 사용됩니다.</p>
                    <p>
                      예를 들어 말투/성격, 역할, AI의 이름, 대화 가능한 범위 등을 지정하거나 제한할
                      수 있으며,
                    </p>
                    <p>
                      특히 구체적이고 현실에 존재하는 역할이나 직무를 지정할 시 기대에 부합하는
                      결과가 나올 확률이 올라갑니다.
                    </p>
                    <ul>
                      <li>ex) "Act as a stock market analyst."</li>
                      <li>ex) "Your role is a public relations officer."</li>
                      <li>ex) "You are a career counselor.""</li>
                    </ul>
                  </div>
                </div>
              </label>
            </div>
          {/if}
        </div>

        <div class="mb-4 variant-soft rounded">
          <button type="button" class="w-full btn-lg variant-soft p-2 rounded text-left"
            >User Prompt</button
          >
          <div class="w-full mt-2 p-4">
            <label class="label">
              <div class="flex items-center">
                <span>User message</span>
                <button
                  class="btn [&>*]:pointer-events-none p-2"
                  type="button"
                  use:popup={userPromptPopup}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
              </div>
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
              <div data-popup="userPromptPopup">
                <div class="card p-4 variant-filled-secondary">
                  <h3 class="h3">시용자 프롬프트</h3>
                  <p>사용자 프롬프트는 AI가 생성할 텍스트의 기준점이 되는 데이터입니다.</p>
                  <p>사용자 프롬프트가 질문이라면 AI는 답변을 하고,</p>
                  <p>사용자 프롬프트가 지시사항이라면 AI는 수행 결과를 출력합니다.</p>
                  <p>
                    지시사항이 길어질수록/복잡해질수록, 사람이 쓴 글처럼 구조를 갖추면 결과가 더
                    좋아집니다.
                  </p>
                  <p>ex)</p>
                  <pre class="pre mt-2">
    Instruction
    -----------
    (첫번째 지시사항)
    (두번째 지시사항)
    (n번째 지시사항)

    Input Data
    ----------
    (사용자 입력 데이터)
    (참조를 위한 부가 데이터)

    Output Data
    ----------
    (출력할 데이터 포맷, 규칙 등 제시)
  </pre>
                </div>
              </div>
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
                <RangeSlider
                  name="range-slider"
                  bind:value={temperatureValue}
                  max={maxTemperatureValue}
                  step={0.1}
                  ticked
                >
                  <div class="flex justify-between items-center">
                    <div class="flex items-center">
                      <span>Temperature</span>
                      <button
                        class="btn [&>*]:pointer-events-none p-2"
                        type="button"
                        use:popup={temperaturePopup}
                      >
                        <FontAwesomeIcon icon={faQuestionCircle} />
                      </button>
                    </div>
                    <div class="text-xs">{temperatureValue} / {maxTemperatureValue}</div>
                    <div data-popup="temperaturePopup">
                      <div class="card p-4 variant-filled-secondary">
                        <h3 class="h3">Temperature</h3>
                        <p>LLM이 생성할 텍스트의 랜덤성을 설정하는 값입니다.</p>
                        <p>
                          0에 가까울 수록 객관적/분석적인 텍스트가 생성되며, 1에 가까울수록 창의적인
                          텍스트가 생성됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </RangeSlider>
              </label>
              <label class="label mt-4">
                <div class="flex items-center">
                  <span>Max Input Tokens</span>
                  <button
                    class="btn [&>*]:pointer-events-none p-2"
                    type="button"
                    use:popup={maxInputTokenPopup}
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </button>
                </div>
                <input
                  name="maxInputTokens"
                  class="input"
                  title="Max Input Tokens"
                  type="number"
                  placeholder="최대 15,000 개"
                  autocomplete="off"
                />
                <div data-popup="maxInputTokenPopup">
                  <div class="card p-4 variant-filled-secondary">
                    <h3 class="h3">입력 토큰 최대 개수</h3>
                    <p>시스템 프롬프트 + 사용자 프롬프트의 토큰 합산 값입니다.</p>
                    <p>
                      실제 토큰 사용량이 설정한 최대 값을 초과할 경우, 모델에 따라 처리 방법이
                      달라집니다
                    </p>
                    <p>ex) 앞에서부터 자른 뒤 요청</p>
                  </div>
                </div>
              </label>
              <label class="label mt-4">
                <div class="flex items-center">
                  <span>Max Output Tokens</span>
                  <button
                    class="btn [&>*]:pointer-events-none p-2"
                    type="button"
                    use:popup={maxOutputTokenPopup}
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </button>
                </div>
                <input
                  name="maxOutputTokens"
                  class="input"
                  title="Max Output Tokens"
                  type="number"
                  placeholder="최대 2,048 개"
                  autocomplete="off"
                />
                <div data-popup="maxOutputTokenPopup">
                  <div class="card p-4 variant-filled-secondary">
                    <h3 class="h3">출력 토큰 최대 개수</h3>
                    <p>LLM이 생성할 응답의 최대 토큰 수 입니다.</p>
                    <p>
                      생성 예정인 토큰이 설정한 최대 값을 초과할 경우 응답이 잘리고, 상태값이
                      "stop"이 아닌 "length"가 됩니다.
                    </p>
                  </div>
                </div>
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
