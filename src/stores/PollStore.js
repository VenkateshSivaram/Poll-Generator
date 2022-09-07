import { writable } from "svelte/store";

const PollStore = writable([
    {
        id: 1,
        question: 'Python or Java ?',
        answerA: 'Python',
        answerB: 'Java',
        VotesA: 9,
        VotesB: 7
    }
]);

export default PollStore;