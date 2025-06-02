<template>
  <header class="header">
    <nav>
      <NuxtLink to="/">Главная</NuxtLink>
      <NuxtLink to="/posts">Посты</NuxtLink>
      <NuxtLink to="/posts/create">Создать пост</NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: #f5f5f5;
  padding: 1rem;
  nav {
    display: flex;
    gap: 1rem;
    a {
      text-decoration: none;
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>