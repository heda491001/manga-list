<template>
  <div class="hello">
    <h1>this is a test</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import editPopup from './editPopup.vue'
export default {
  name: 'HelloWorld',
  components: { editPopup },
  data () {
    return {
      msg: 'hello world',
      showEdit: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
