<template>
  <div class="header">

    <mt-header title="Dog eye movie">
      <router-link to="" slot="left" v-if="routerNmae != routerIndex">
        <mt-button icon="back" @click="goBack"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      routerNmae: '',
      routerIndex: 'listMovie',
      smallComment: 'smallComment',
      title: 'Dog eye movie',
      loading: true
    }
  },
  methods: {
    getRouter: function () {
      console.log(this.$route.name)
      this.routerNmae = this.$route.name
    },
    goBack: function () {
      window.history.go(-1)
    }
  },
  mounted: function () {
    this.getRouter()
  },
  watch: {
    $route: function () {
      this.getRouter()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.header
  height: 40px
</style>
