<template>

  <div>
    <div v-if="!loading">
    <div id="detailMovie">
      <div class="movie">
        <div class="movieone-background">
        </div>
        <div class="movietwo-background">
        </div>
        <div class="movie-content">
          <div class="movie-cover">
            <img :src='detail.images.medium' :alt="detail.images.alt" width="130" height="170" >
          </div>
          <div class="movie-right">
            <p class="title">{{detail.title}}</p>
            <p class="enTitle">{{detail.original_title}}</p>
            <p class="ratings">
              <star :score="detail.rating.average" style="display: inline-block"></star>
              {{detail.rating.average}}
            </p>
            <p class="score-num">({{detail.ratings_count}}人评分)</p>
            <p><span v-if="detail.genres.length === 0">未知</span>
              <span v-else-if="detail.genres">
                <span v-for="item in detail.genres" style="margin-right: 4px">{{item}}</span>
              </span>
            </p>
            <p>
              <span v-for="item in detail.countries">
                 {{item}}
              </span>
             </p>
            <p>{{detail.year}}</p>
          </div>
        </div>
      </div>
      <div class="movieDes">
        <div class="minDes" :class="{ moreDes: showAll }">
          <p>{{detail.summary}}</p>
        </div>
        <div class="arrowDwon" :class="{ topArrow: showAll }">
            <div class="bottom-arrow" @click="showAll = !showAll"></div>
        </div>
      </div>
      <div class="actorsList">
        <div class="container-wrap">
          <div class="container">
            <div class="box" v-for="item in detail.casts" @click="starMsg(item.id)">
              <div class="img">
                <img :src='item.avatars.small'  width="80" height="100" >
              </div>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
        <mt-cell title="更多演员"  is-link class="border-bottom"></mt-cell>
      </div>
      <div class="comment">
        <mt-cell title="短评" style="border-bottom: 1px solid #e5e5e5"></mt-cell>
        <div class="commentlist" v-for="item in detail.popular_comments">
          <div class="commentitem" >
            <div class="msg-rating">
              <star :score="detail.rating.average" style="display: inline-block"></star>
              <span>{{item.created_at}}</span>
            </div>
            <div class="content">
              <p class="author-content">{{item.content}}</p>
            </div>
            <div class="author-img">
              <img :src="item.author.avatar" :alt="item.author.alt">
              <span>{{item.author.name}}</span>
              <div class="thinkyes">
                <div class="yes"></div><span>{{item.useful_count}} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="moreComment">
          <div class="comments" @click="smallComment(detail.id)">
            <p>更多短片</p>
          </div>
          <div class="comments">
            <p>更多影评</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <spinner v-if='loading'></spinner>
  </div>
</template>

<script type="text/ecmascript-6">
import spinner from '../spinner/spinner'
import star from '../star/star'
export default {
  data () {
    return {
      id: '',
      detail: [],
      photos: [],
      showAll: false,
      comments: [],
      ids: '',
      loading: true
    }
  },
  components: {
    spinner, star
  },
  methods: {
    getDetail: function (ids) {
      this.$http.jsonp(ids)
        .then(function (response) {
          this.detail = response.body
          this.loading = false
          console.log(this.detail)
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    smallComment: function (str) {
      const path = '/smallComment/' + str
      this.$router.push({path: path})
    },
    starMsg: function (str) {
      const path = '/castsDetail/' + str
      this.$router.push({path: path})
    }
  },
  mounted: function () {
    this.id = this.$route.query.id
    this.ids = 'https://api.douban.com/v2/movie/subject/' + this.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
    this.getDetail(this.ids)
  }
}
</script>

<style lang="sass">
  .movie
    width: 100%
    height: 204px
    box-sizing: border-box
    overflow: hidden
    position: relative
    .movieone-background
      background-image: url('https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg')
      background-size: 100% 100%
      filter: blur(5px)
      z-index: 1
    .movietwo-background
      z-index: 3
      background-color: #40454d
      opacity: .55
    .movieone-background,.movietwo-background
      height: 204px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
    .movie-content
      position: absolute
      z-index: 100
      padding: 16px
      display: flex
      color: #c6c6c6
      font-size: 14px
      .movie-cover
        flex: 0
        width: 130px
        height: 170px
      .movie-right
        flex: 1
        margin-left: 10px
        line-height: 22px
        .title
          font-size: 16px
          line-height: 24px
          color: #fff
        .enTitle
          font-size: 14px
          line-height: 20px
          color: #fff
        .ratings
          font-size: 18px
          font-weight: bold
          font-family: "Microsoft New Tai Lue"
          color: #FFB400

  .movieDes
    font-size: 15px
    border-bottom: 10px solid #e5e5e5
    .minDes
      padding: 16px 16px 0px 16px
      height: 75px
      overflow: hidden
    .moreDes
      height: auto
      transition: all 1s
    .bottom-arrow
      background: url("../../components/detailMovie/arrow.png")
      width: 16px
      height: 16px
      display: block
      margin: 5px auto
    .topArrow
      transform: rotate(-180deg)
      transition: all 0.5s
  .actorsList
    .container-wrap
      width: 100%
      white-space: nowrap
      overflow: hidden
      overflow-x: scroll
      -webkit-backface-visibility: hidden
      -webkit-perspective: 1000
      -webkit-overflow-scrolling: touch
      text-align: justify
      &::-webkit-scrollbar
        display: none
      .container
        padding: 14px 0
        .box
          display: inline-block
          width: 100px
          color: #000
          font-size: 8px
          text-align: center
          margin-right: 10px
          line-height: 24px
          .img
            width: 80px
            height: 100px
            display: block
            margin: 0 auto
    .border-bottom
      border-bottom: 10px solid #d9d9d9
    .mint-cell-wrapper
      padding: 0 0px
      .mint-cell-text
        padding-left: 10px
        font-size: 14px
  .comment
    .commentlist
      padding: 6px 0px
      margin-left: 10px
      border-bottom: 1px solid #e5e5e5
      font-size: 13px
      .msg-rating
        line-height: 16px
      .content
        padding: 10px 10px 10px 0
      .author-img
        position: relative
        img
          border-radius: 50%
          width: 28px
          height: 28px
        span
          font-size: 14px
          color: #999
          line-height: 20px
          vertical-align: top
        .yes
          background: url("../../components/detailMovie/yes.png")
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
        .thinkyes
          position: absolute
          right: 20px
          top: 10px
    .commentlist:last-child
      border-bottom: none
    .moreComment
      display: flex
      line-height: 46px
      text-align: center
      color: #e54847
      .comments
        flex: 1
        text-align: center
        &:first-child
          border-right: 1px solid #eee
</style>
