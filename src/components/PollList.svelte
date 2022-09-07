<script>
    import PollStore from '../stores/PollStore.js';
    import PollDetails from './PollDetails.svelte';
    import { fade, scale, slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    // export let polls = [];

    // PollStore.subscribe((data) => {
    //     polls = data;
    // });
</script>

<div class="poll-list">
    {#each $PollStore as poll (poll.id)}
        <div class="poll" in:fade out:scale|local animate:flip={{duration: 500}}>
            <PollDetails {poll} />
        </div>    
    {/each}
</div>

<style>
    .poll-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20ox;
    }
</style>