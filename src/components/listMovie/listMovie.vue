<template>
  <div class="">

    <div v-if="!loading">
    <mt-navbar v-model="selected">
      <mt-tab-item id="in_theaters">正在热映</mt-tab-item>
      <mt-tab-item id="coming_soon">即将上映</mt-tab-item>
      <mt-tab-item id="top250">Top250</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" id="listMovieBox">
      <mt-tab-container-item id="in_theaters">
        <div class="item" v-for="(item, index) in val_data_body_subjects" >
          <router-link :to="{path:'/detailMovie',query: {id: item.id}}" >
            <div class="movie-cover">
              <img :src="item.images.small" :alt="item.alt" width="88" height="110">
            </div>
            <div class="movie-des">
              <p class="title">{{item.title}}</p>
              <p class="genres"><span>类别:</span><span v-if="item.genres.length === 0">未知</span><span v-else-if="item.genres">{{item.genres}}</span></p>
              <p class="cast">
                主演:<span v-for="items in item.casts" style="margin-right: 4px;">{{ items.name}}</span>
              </p>
              <p class="director">导演:<span v-if="item.casts[1]">{{ item.casts[1].name }}</span></p>
              <p class="ratings">{{item.rating.average}} <span>分</span></p>
            </div>
          </router-link>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="coming_soon">
        <div class="item" v-for="(item, index) in val_data_body_subjects" >
          <router-link :to="{path:'/detailMovie',query: {id: item.id}}" >
            <div class="movie-cover">
              <img :src="item.images.small" :alt="item.alt" width="88" height="110">
            </div>
            <div class="movie-des">
              <p class="title">{{item.title}}</p>
              <p class="genres"><span>类别:</span><span v-if="item.genres.length === 0">未知</span><span v-else-if="item.genres">{{item.genres}}</span></p>
              <p class="cast">
                主演:<span v-for="items in item.casts" style="margin-right: 4px;">{{ items.name}}</span>
              </p>
              <p class="director">导演:<span v-if="item.casts[1]">{{ item.casts[1].name }}</span></p>
              <p class="ratings">{{item.rating.average}} <span>分</span></p>
            </div>
          </router-link>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="top250">
        <div class="item" v-for="(item, index) in val_data_body_subjects" >
          <router-link :to="{path:'/detailMovie',query: {id: item.id}}" >
            <div class="movie-cover">
              <img :src="item.images.small" :alt="item.alt" width="88" height="110">
            </div>
            <div class="movie-des">
              <p class="title">{{item.title}}</p>
              <p class="genres"><span>类别:</span><span v-if="item.genres.length === 0">未知</span><span v-else-if="item.genres">{{item.genres}}</span></p>
              <p class="cast">
                主演:<span v-for="items in item.casts" style="margin-right: 4px;">{{ items.name}}</span>
              </p>
              <p class="director">导演:<span v-if="item.casts[1]">{{ item.casts[1].name }}</span></p>
              <p class="ratings">{{item.rating.average}} <span>分</span></p>
            </div>
          </router-link>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
    <spinner v-if='loading'></spinner>
  </div>
</template>

<script>
import spinner from '../spinner/spinner'
export default {
  name: 'listMovie',
  data () {
    return {
      selected: 'in_theaters',
      val_data_body_subjects: [],
      in_theaters: 'in_theaters',
      loading: true
    }
  },
  components: {
    spinner
  },
  mounted: function () {
    this.getCate(this.in_theaters)
  },
  methods: {
    getCate: function (cate) {
      this.$http.jsonp('https://api.douban.com/v2/movie/' + cate)
        .then(function (response) {
          this.val_data_body_subjects = response.body.subjects
          this.loading = false
          console.log(this.val_data_body_subjects)
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  },
  watch: {
    selected: function (val, oldVal) {
      this.loading = true
      this.getCate(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  #listMovieBox
    padding: 0 16px
    .item
      padding: 10px 0
      border-bottom: 1px solid #eee
      a
        position: relative
        display: flex
        .movie-cover
          width: 88px
          flex: 0
          height: 110px
          color: #000
        .movie-des
          flex: 1
          padding-left: 10px
          vertical-align: top
          .ratings
            position: absolute
            font-size: 20px
            font-weight: bold
            font-family: "Microsoft New Tai Lue"
            color: #FFB400
            right: 0px
            top: 16px
            span
              font-size: 14px
          .title
            line-height: 1.5rem
            padding-top: 4px
            font-size: 16px
          .genres
            font-size: 12px
            color: #666
            line-height: 24px
          .cast
            font-size: 12px
            width: 200px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            color: #666
            line-height: 24px
          .director
            font-size: 14px
            color: #999
            line-height: 26px
</style>
