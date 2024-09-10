<script lang="ts">
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';

  // Highlight JS
  import hljs from 'highlight.js/lib/core';
  import 'highlight.js/styles/github-dark.css';
  import { storeHighlightJs } from '@skeletonlabs/skeleton';
  import xml from 'highlight.js/lib/languages/xml'; // for HTML
  import css from 'highlight.js/lib/languages/css';
  import javascript from 'highlight.js/lib/languages/javascript';
  import typescript from 'highlight.js/lib/languages/typescript';

  hljs.registerLanguage('xml', xml); // for HTML
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
  storeHighlightJs.set(hljs);

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">Playground</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a
          class="btn btn-sm variant-ghost-surface"
          href="link-to-some-service-1.com"
          target="_blank"
          rel="noreferrer"
        >
          Link1
        </a>
        <a
          class="btn btn-sm variant-ghost-surface"
          href="link-to-some-service-2.com"
          target="_blank"
          rel="noreferrer"
        >
          Link2
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <!-- Sidebar -->
  <svelte:fragment slot="sidebarLeft">
    <!-- Insert the list: -->
    <nav class="list-nav">
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/task">Task</a></li>
        <li><a href="/prompt">Prompts</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/dev">Dev</a></li>
      </ul>
    </nav>
  </svelte:fragment>

  <!-- Page Route Content -->
  <slot />
</AppShell>
