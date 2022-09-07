<script>
    import Button from "../shared/Button.svelte";
    import { createEventDispatcher } from 'svelte';
import { update_await_block_branch } from "svelte/internal";
    import PollStore from "../stores/PollStore.js";

    let dispatch = createEventDispatcher();
    let fields = { question: '',
        answerA: '',
        answerB: ''};
    
    let errors = { question: '',
        answerA: '',
        answerB: ''};

    let valid = false;

    const handleSubmit = () => {
        
        valid = true;
        //validate question
        if (fields.question.trim().length < 5) {
            valid = false;
            errors.question = 'Question must be greater that 5 characters.';
        }
        else {
            errors.question = '';    
        }

        //validate answerA
        if (fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = 'answerA must not be empty.';
        }
        else {
            errors.answerA = '';
        }
        
        //validate answerB
        if (fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = 'answerB must not be empty.';
        }
        else {
            errors.answerB = '';
        }

        //add new Poll
       if (valid) {
        let poll = {...fields, VotesA: 0, VotesB: 0, id: Math.random()}
        // save poll to store
        PollStore.update(currentPolls => {
            return [poll, ...currentPolls];
        });
        dispatch('add');
       }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="form-field">
       <label for="question">Question:</label>
       <input type="question" id="question" bind:value={fields.question}>
       <div class="errors">{ errors.question }</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="errors">{ errors.answerA }</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B:</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="errors">{ errors.answerB }</div>
    </div>
    <Button type='secondary' inverse={true}>Add Poll</Button>
</form>

<style>
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    .form-field{
        margin: 18px auto;
    }

    input{
        width: 100%;
        border-radius: 5px;
    }

    label{
        margin: 10px auto;
        text-align: left;
    }

    .errors{
        color: red;
        font-size: 12px;
        font-weight: bold;
    }
</style>