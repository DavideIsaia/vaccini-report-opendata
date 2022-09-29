<template>
  <footer>
    <div class="content has-text-centered">
      <a href="https://www.linkedin.com/in/davide-isaia-213b80245/">
        <img
          class="mylogo"
          src="/images/logobianco.jpg"
          alt="Logo Davide Isaia"
        />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style lang="scss" scoped>
footer {
  background-color: black;
  padding: 0.5rem 0;
  .mylogo {
    height: 6rem;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
