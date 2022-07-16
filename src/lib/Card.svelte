<script lang="ts">
  export let title = "";
  export let footerButtonText = "";
  export let onFooterClick;
</script>

<div class="container">
  <div class="content">
    <h2>{title}</h2>
    <slot>
      <em>no content was provided</em>
    </slot>
  </div>

  <button class="footer-button" on:click={onFooterClick}
    >{footerButtonText}</button
  >
</div>

<style>
  h2 {
    margin: 0;
    margin-bottom: 16px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid Grey;
    height: 100%;
  }

  .content {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-button {
    width: 100%;
  }
</style>
