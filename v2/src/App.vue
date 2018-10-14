<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
}
</script>
<style>
p{
  margin: 0;
  padding: 0;
  text-align: left;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
