<template>
  <div class="comment">
    <spinner v-if='loading'></spinner>
    <div class="commentlist"  v-if="!loading" v-for="item in commentsMsg.comments">
      <div class="commentitem">
        <div class="msg-rating">
          <star :score="item.rating.value"></star>

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
  </div>
</template>

<script type="text/ecmascript-6">
import spinner from '../spinner/spinner'
import star from '../star/star'
export default {
  data () {
    return {
      id: '',
      commentsMsg: [],
      loading: true
    }
  },
  components: {
    spinner, star
  },
  methods: {
    getComment: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd')
        .then(function (response) {
          this.commentsMsg = response.body
          this.loading = false
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  },
  mounted: function () {
    this.getComment()
  }
}
</script>

<style lang="sass">
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
