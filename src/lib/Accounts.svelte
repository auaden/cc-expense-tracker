<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { accounts } from "../stores";
  import type { Account } from "src/types";

  interface InputAccount extends Account {
    isEditing: boolean;
  }

  let inputAccounts: InputAccount[] = [];

  const stripEditingProp = (accounts) =>
    accounts
      .filter((acc) => acc.name !== "")
      .map((acc) => ({ id: acc.id, name: acc.name }));

  function handleAddEmptyAccount() {
    inputAccounts = [
      ...inputAccounts,
      { id: uuidv4(), name: "", isEditing: true },
    ];
  }

  function handleAddNewAccount(id) {
    inputAccounts = inputAccounts.map((acc) =>
      acc.id === id ? { ...acc, isEditing: false } : acc
    );
    accounts.set(stripEditingProp(inputAccounts));
  }

  function handleEditAccount(id) {
    inputAccounts = inputAccounts.map((acc) =>
      acc.id === id ? { ...acc, isEditing: true } : acc
    );
    accounts.set(stripEditingProp(inputAccounts));
  }

  function handleDeleteAccount(id) {
    inputAccounts = inputAccounts.filter((acc) => acc.id !== id);
    accounts.set(stripEditingProp(inputAccounts));
  }
</script>

<div class="container">
  <h2>Accounts</h2>
  {#each inputAccounts as account (account.id)}
    {#if account.isEditing}
      <div class="input-row">
        <input type="text" class="space-right" bind:value={account.name} />
        <button
          class="space-right"
          disabled={account.name === ""}
          on:click={() => handleAddNewAccount(account.id)}>Add</button
        >
        <button
          disabled={account.name === ""}
          on:click={() => handleDeleteAccount(account.id)}>Delete</button
        >
      </div>
    {:else}
      <div class="display-row">
        <p>{account.name}</p>
        <button
          class="space-right"
          on:click={() => handleEditAccount(account.id)}>Edit</button
        >
      </div>
    {/if}
  {/each}
  <button class="add-account" on:click={handleAddEmptyAccount}> + </button>
</div>

<style>
  h2 {
    margin: 0;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    border: 1px solid Grey;
  }

  .space-right {
    margin-right: 8px;
  }

  .add-account {
    width: 100%;
    margin-top: 16px;
  }

  .input-row {
    margin-top: 8px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .display-row {
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
