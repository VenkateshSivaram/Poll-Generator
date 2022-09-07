<script>
    import Card from '../shared/Card.svelte';
    export let poll; 
    import PollStore from '../stores/PollStore.js';
    import Button from '../shared/Button.svelte';
    import { tweened } from 'svelte/motion';
    
    //reactive values
    $: totalValue = poll.VotesA + poll.VotesB;
    $: VotesAPrcnt = Math.floor(100 / totalValue * poll.VotesA) || 0;
    $: VotesBPrcnt = Math.floor(100 / totalValue * poll.VotesB) || 0;

    const VotesAPrcntTweened = tweened(0);
    const VotesBPrcntTweened = tweened(0);
    $: VotesAPrcntTweened.set(VotesAPrcnt);
    $: VotesBPrcntTweened.set(VotesBPrcnt);

    const handleVote = (option, id) => {
        let copiedPolls = $PollStore;
        let votedPoll = copiedPolls.find( (poll) => id == poll.id);

        if (option === 'a') {
          votedPoll.VotesA++;
        }
        if (option === 'b') {
          votedPoll.VotesB++;
        }

        PollStore.update((currentPolls) => {
          return copiedPolls;
        });
      };

        // dispatch('vote', {option, id});

    const handleDeletePoll = (id) => {
        let copiedPolls = $PollStore;
        copiedPolls = copiedPolls.filter((poll) => poll.id != id);
        // console.log(copiedPolls);
        PollStore.update((currentPolls) => {return copiedPolls});
        // alert('delete button clicked');

    };
</script>

<Card>
    <div class="poll">
        <h3>{ poll.question }</h3>
        <p>Total Votes:{ totalValue }</p>
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <div class="percent percent-a" style="width: {$VotesAPrcntTweened}%;"></div>
            <span>{ poll.answerA } ({ poll.VotesA }) </span>
        </div>
        <div class="answer"  on:click={() => handleVote('b', poll.id)}>
            <div class="percent percent-b" style="width: {$VotesBPrcntTweened}%;"></div>
            <span>{ poll.answerB } ({ poll.VotesB }) </span>
        </div>
        <div class="delete">
          <!-- <Button flat={true} on:click={() => handleDeletePoll(poll.id)}> -->
            <img class="img" src="./img/delete-icon.svg" alt="Delete" on:click={() => handleDeletePoll(poll.id)}/>
            <!-- </Button>           -->
      </div>
    </div>
</Card>

<style>
  h3{
    margin: 0 auto;
    color: #555;
    text-align: left;
  }
  p{
    margin-top: 6px;
    font-size: 14px;
    color: #aaa;
    margin-bottom: 30px;
    text-align: left;
  }
  .answer{
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover{
    opacity: 0.6;
  }
  span{
    display: flex;
    padding: 10px 20px;
    text-align: left;
  }
  .percent{
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .percent-a{
    background: rgba(217, 27, 66, 0.2);
    border-left: 4px solid #d91b42;
  }
  .percent-b{
    background: rgba(69, 196, 150, 0.2);
    border-left: 4px solid #45c496;
  }
  /* .delete:hover{
    opacity: 0.6;
  } */
  img{
    margin-top: 10px;
    cursor: pointer;
    max-width: 20px;
  }
</style>