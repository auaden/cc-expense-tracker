<script lang="ts">
  import Accounts from "./lib/Accounts.svelte";
  import { accounts as accountsStore } from "./stores";

  let accounts;

  accountsStore.subscribe((value) => {
    accounts = value;
  });

  console.log("accounst in app", accounts);
</script>

<h1>CC Expense Tracker</h1>

{#each accounts as account}
  <div>{account.name}</div>
{/each}

<div class="container">
  <Accounts />
</div>

<style>
  .container {
    width: 400px;
  }
</style>
