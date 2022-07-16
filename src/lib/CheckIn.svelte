<script lang="ts">
  import Card from "./Card.svelte";
  import StandardRow from "./StandardRow.svelte";
  import Title from "./Title.svelte";
  import { accounts as accountsStore } from "../stores";

  let accounts;

  accountsStore.subscribe((value) => {
    accounts = value;
  });

  console.log("accounst in app", accounts);

  function handleCheckIn() {}
</script>

<Card
  title="Check In"
  footerButtonText="Check In"
  onFooterClick={handleCheckIn}
>
  {#each accounts as account (account.id)}
    <StandardRow>
      <Title>{account.name}</Title>
    </StandardRow>
  {/each}
</Card>

<style>
  .display-row {
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
