<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import PollList from "./components/PollList.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import CreatePollForm from "./components/CreatePollForm.svelte";

	//tabs
	let items = ['Current Polls', 'Add New Polls'];
	let activeItem = 'Current Polls';
	const tabChange = (e) => {
		activeItem = e.detail;
	};
	
	const handleAdd = () => {
		activeItem = 'Current Polls';
	};
</script>


<Header />
	<main>
		<Tabs {activeItem} {items} on:tabChange={tabChange}/>
		{#if activeItem === 'Current Polls'}
			<PollList />
		{:else if activeItem === 'Add New Polls'}
			<CreatePollForm on:add={handleAdd}/>
		{/if}
	</main>
<Footer />


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>