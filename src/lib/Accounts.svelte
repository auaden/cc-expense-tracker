<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import type { Account } from "src/types";

  import Card from "./Card.svelte";
  import StandardRow from "./StandardRow.svelte";
  import Title from "./Title.svelte";
  import { accounts } from "../stores";

  interface InputAccount extends Account {
    isEditing: boolean;
  }

  let inputAccounts: InputAccount[] = [];

  const processAccounts = (accounts: InputAccount[]) =>
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
    accounts.set(processAccounts(inputAccounts));
  }

  function handleEditAccount(id) {
    inputAccounts = inputAccounts.map((acc) =>
      acc.id === id ? { ...acc, isEditing: true } : acc
    );
    accounts.set(processAccounts(inputAccounts));
  }

  function handleDeleteAccount(id) {
    inputAccounts = inputAccounts.filter((acc) => acc.id !== id);
    accounts.set(processAccounts(inputAccounts));
  }
</script>

<Card
  title="Accounts"
  footerButtonText="+"
  onFooterClick={handleAddEmptyAccount}
>
  {#each inputAccounts as account (account.id)}
    {#if account.isEditing}
      <StandardRow>
        <div class="input-row">
          <input type="text" class="space-right" bind:value={account.name} />
          <button
            class="space-right"
            disabled={account.name === ""}
            on:click={() => handleAddNewAccount(account.id)}>Add</button
          >
          <button on:click={() => handleDeleteAccount(account.id)}
            >Delete</button
          >
        </div>
      </StandardRow>
    {:else}
      <StandardRow>
        <div class="display-row">
          <Title>{account.name}</Title>
          <button on:click={() => handleEditAccount(account.id)}>Edit</button>
        </div>
      </StandardRow>
    {/if}
  {/each}
</Card>

<style>
  input {
    width: 100%;
  }

  .space-right {
    margin-right: 8px;
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
