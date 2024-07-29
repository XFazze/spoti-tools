<div class="app">
  <main>
    <div class="navbar">
      <a href="/tools">
        <h2>Tools Menu</h2>
      </a>
      <a href="/log_out">
        <h2>Log out</h2>
      </a>
    </div>
    <div>
      <slot />
    </div>
  </main>
</div>

<style>
  .navbar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    min-width: 300px;
  }
</style>
