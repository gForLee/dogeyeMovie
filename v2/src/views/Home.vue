<template>
  <div class="home">
    <van-tabs v-model="active">
      <van-tab title="正在热映">
        <div id="listMovieBox">
          <div class="item" v-for="(item, index) in movieListData"  :key = 'index'>
            <a>
              <Movie :movie="item"></Movie>
            </a>
          </div>
        </div>
      </van-tab>
      <van-tab title="即将上映">
         <div id="listMovieBox">
          <div class="item" v-for="(item, index) in movieListData"  :key = 'index'>
            <a>
              <Movie :movie="item"></Movie>
            </a>
          </div>
        </div>
      </van-tab>
      <van-tab title="Top250">
        <div id="listMovieBox">
          <div class="item" v-for="(item, index) in movieListData"  :key = 'index'>
            <a>
              <Movie :movie="item"></Movie>
            </a>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import {Action, Mutation, State} from 'vuex-class';
import { Tab, Tabs, Toast } from 'vant';
import Movie from '@/components/MovieItem.vue';

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Movie,
  },
})
export default class Home extends Vue {
      private cate = 'in_theaters';
      private active =  0;
      private movieListData = [];
      @Action private movieList!: (cate: string) => any;
   
      @Watch('active')
      private onActiveChanged( val: number ) {
        console.log(val)
        if ( val === 0 ) {
          this.changeType(0, 'in_theaters');
        } else if (val === 1) {
          this.changeType(1, 'coming_soon');
        } else if (val === 2) {
          this.changeType(2, 'top250');
        }
      }

      private created() {
        this.movieList( this.cate ).then( (res: any) => {
          this.movieListData = res.subjects;
        });
      }

      private changeType(active: number, name: string) {
        this.cate = name;
        Toast.loading({
          mask: true,
          message: '加载中...',
        });
        this.movieList( this.cate ).then( (res: any) => {
          this.movieListData = res.subjects;
          Toast.clear();
        });
      }
}
</script>
<style lang="sass">
  #listMovieBox
    padding: 0 16px
</style>