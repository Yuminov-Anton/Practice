<template>
  <div class="layout">
    <Header />
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;

  &__main {
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 2rem;
    max-width: 100%;
  }
}
</style>