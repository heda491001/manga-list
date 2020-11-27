<template>
  <div id="app">
    <p>update time 2020/10/27 19:24</p>
    <router-link to="/HelloWorld">HelloWorld</router-link>
    <router-link to="/test">test</router-link>
    <router-link to="/list">list</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px;
}
</style>
