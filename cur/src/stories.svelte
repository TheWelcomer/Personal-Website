<script lang="ts">
  import { run } from 'svelte/legacy';

  import { getContext } from "svelte";
  // import { ascending, descending } from "d3";
  import inView from "../actions/inView.js";
  import Story from "$components/Story.svelte";

  export const jump = () => {
    const { top } = sectionEl.getBoundingClientRect();
    const y = window.scrollY + top - 64;
    window.scrollTo(0, y);
  };

  let { highlight } = $props();

  const { stories, copy } = getContext("Home");

  let sectionEl = $state();

  let sortedStories = $state(stories.map((d) => ({ ...d })));

  const reSort = () => {
    sortedStories.sort(
      (a, b) =>
        descending(highlight.indexOf(a.slug), highlight.indexOf(b.slug)) ||
        descending(a.date, b.date)
    );

    sortedStories = sortedStories;
  };

  run(() => {
    highlight, reSort();
  });
</script>

<section id="stories" bind:this={sectionEl}>
  <h2 class="column-wide upper">{copy.storiesHed}</h2>
  <ul>
    {#each sortedStories as { tease, url, url_alt, slug, month } (slug)}
      <li>
        <Story {tease} {url} {url_alt} {slug} {month} collapse={!highlight.includes(slug)} />
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    margin-top: 4em;
  }

  li {
    margin: 0;
  }
</style>
