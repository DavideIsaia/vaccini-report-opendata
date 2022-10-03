<template>
  <footer>
    <div class="content has-text-centered">
      <a href="https://github.com/DavideIsaia">
        <img
          class="mylogo"
          src="/images/logobianco.jpg"
          alt="Logo Davide Isaia"
        />
      </a>
      <div>
        open-data disponibili su:
        <a
          class="link"
          href="https://github.com/italia/covid19-opendata-vaccini"
          >https://github.com/italia/covid19-opendata-vaccini</a
        >
      </div>
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
  .link {
    color: grey;
    &:hover {
      color: white;
    }
  }
}
</style>
