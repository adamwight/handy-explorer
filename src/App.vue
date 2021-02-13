<template>
  <div id="nav">
    <router-link to="/detail">
      Detailed simulation
    </router-link> |
    <router-link to="/about">
      About
    </router-link> |
    <router-link to="/gallery">
      Gallery
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
