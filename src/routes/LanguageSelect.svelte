<script lang="ts">
import type { Language } from './+page.svelte';
  export let currentLanguage: Language;
  export let onChangeLanguage: (lang: Language) => void;

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "uk", label: "Українська" }
  ] as const;


  const handleChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    onChangeLanguage(select.value as Language);
  };
</script>

<div class="language-selector">
  <select id="language-select" bind:value={currentLanguage} on:change={handleChange}>
    {#each languages as { code, label }}
      <option value={code} selected={currentLanguage === code}>{label}</option>
    {/each}
  </select>
</div>

<style>
  .language-selector {
    display: flex;
    align-items: center;
  
  }

  .language-selector select {
    padding: 8px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

  .language-selector select:hover {
    border-color: #4caf50;
  }
</style>
