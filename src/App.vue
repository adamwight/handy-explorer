<template>
  <div id="nav">
    <router-link to="/">
      Detailed simulation
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
  // FIXME: should be safe to leave out this script block, but to do so crashes the server.
  import { defineComponent } from 'vue';
  export default defineComponent({});
</script>

<style lang="scss">
body {
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
}

@media all and (orientation: landscape) {
  #app {
    grid-template-areas:
      'header chart'
      'controls chart';
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
