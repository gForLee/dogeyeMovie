<template>
  <div>
    <div class="castsMsg" v-if="!loading">
      <div class="casts">
        <div class="castsone-background">
        </div>
        <div class="caststwo-background">
        </div>
        <div class="casts-content">
          <div class="movie-image">
            <img src="" width="130" height="170" >
          </div>
          <div class="movie-right">
            <p class="title">{{starMsg.name}}</p>
            <p>{{starMsg.name_en}}</p>
            <p>{{starMsg.gender}}</p>
          </div>
        </div>
      </div>
      <mt-cell title="他的作品" style="border-bottom: 1px solid #eee;font-size: 10px"></mt-cell>
      <div class="movieList">
        <div class="movieitem" v-for="item in starMsg.works" >
          <router-link :to="{path:'/detailMovie',query: {id: item.subject.id}}" >
          <div class="movieitem-left">
            <img :src="item.subject.images.small" width="70" height="90">
          </div>
          <div class="movieitem-right">
            <p class="title">{{item.subject.title}}</p>
            <p class="cate">{{item.roles[0]}}</p>
            <span v-for="items in item.subject.genres" class="cate">
              <span style="display: inline-block;margin-right: 4px">{{items}}</span>
            </span>
            <p class="year">{{item.subject.year}}</p>
            <p class="vist">{{item.subject.collect_count}}人看过</p>
          </div>
          </router-link>
        </div>
      </div>
    </div>
    <spinner v-if='loading'></spinner>
  </div>
</template>

<script>
import spinner from '../spinner/spinner'
export default {
  name: 'castsDetail',
  data () {
    return {
      msg: '',
      starMsg: '',
      loading: true
    }
  },
  components: {
    spinner
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/' + this.$route.params.id)
      .then(function (response) {
        this.starMsg = response.body
        this.loading = false
        console.log(response.body)
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  created: function () {
    this.id = this.$route.query.id
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .casts
    width: 100%
    height: 240px
    box-sizing: border-box
    overflow: hidden
    position: relative
    .castsone-background
      background-image: url('https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg')
      background-size: 100% 100%
      filter: blur(5px)
      z-index: 1
    .caststwo-background
      z-index: 3
      background-color: #40454d
      opacity: .55
    .castsone-background,.caststwo-background
      height: 240px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
    .casts-content
      position: absolute
      padding: 0 20px
      z-index: 100
      bottom: 0px
      display: flex
      color: #c6c6c6
      font-size: 14px
      .movie-image
        flex: 0
        width: 130px
        height: 170px
      .movie-right
        flex: 1
        margin-left: 16px
        line-height: 22px
        padding-top: 94px
        .title
          font-size: 19px
          line-height: 24px
          color: #fff
        .enTitle
          font-size: 14px
          line-height: 20px
          color: #fff
  .movieList
    .movieitem
      margin-left: 20px
      padding: 10px 0 10px 0px
      border-bottom: 1px solid #eee
      a
        display: flex
      .movieitem-left
        flex: 0
        width: 70px
      .movieitem-right
        flex: 1
        margin-left: 12px
        position: relative
        .vist
          position: absolute
          font-size: 12px
          color: #ff9334
          right: 14px
          top: 6px
        .title
          line-height: 24px
        .cate
          color: #333
          font-size: 12px
          line-height: 20px
        .year
          line-height: 24px
</style>
