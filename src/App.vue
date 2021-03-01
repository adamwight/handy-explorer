<template>
  <div id="nav">
    <router-link to="/">
      {{ $t("detailPage") }}
    </router-link> |
    <router-link to="/about">
      {{ $t("about") }}
    </router-link>
    <locale-changer />
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LocaleChanger from './components/LocaleChanger.vue';

export default defineComponent({
  components: {
    LocaleChanger,
  },
});
</script>

<style lang="scss">
body {
  height: 100vh;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
}

@media all and (orientation: landscape) {
  #app {
    grid-template-areas:
      'header chart chart'
      'controls chart chart'
      'controls chart chart';
  }
}

@media all and (orientation: portrait) {
  #app {
    grid-template-areas:
      'header'
      'controls'
      'chart';
  }
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  grid-area: header;
}

@media (min-width: 768px) {
  /* Target devices wider than 768px. */
  #nav {
    padding: 30px;
  }
}

@media (max-width: 767px) {
  /* Target devices narrower than 768px. */
}
</style>