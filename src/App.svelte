<script lang="ts">
  import Accounts from "./lib/Accounts.svelte";
  import CheckIn from "./lib/CheckIn.svelte";
  import { accounts as accountsStore } from "./stores";

  let accounts;

  accountsStore.subscribe((value) => {
    accounts = value;
  });

  console.log("accounst in app", accounts);
</script>

<h1>CC Expense Tracker</h1>

<div class="main-container">
  <div class="container">
    <CheckIn />
  </div>
  <div class="container">
    <Accounts />
  </div>
</div>

<style>
  .main-container {
    display: flex;
    align-items: stretch;
  }
  .container {
    width: 400px;
    margin: 0 16px;
  }
</style>
