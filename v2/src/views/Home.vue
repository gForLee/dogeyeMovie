<template>
  <div class="home">
    <Spinner v-if="loading"></Spinner>
    <van-tabs v-model="active"  v-if="!loading">
      <van-tab title="正在热映">
        <div id="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
      <van-tab title="即将上映">
         <div id="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
      <van-tab title="Top250">
        <div id="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import {Action, Mutation, State} from 'vuex-class';
import { Tab, Tabs, Toast } from 'vant';
import MovieItem from '@/components/MovieItem.vue';
import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    MovieItem,
    Spinner,
  },
})
export default class Home extends Vue {
      private cate: string = 'in_theaters';
      private active: number =  0;
      private movieListData = null;
      private loading: boolean = true;
      @Action private movieList!: (cate: string) => any;
      @Watch('active')
      private onActiveChanged( val: number ) {
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
          this.loading = false;
        });
      }

      private changeType(active: number, name: string) {
        this.cate = name;
        this.loading = true;
        this.movieList( this.cate ).then( (res: any) => {
          this.movieListData = res.subjects;
          this.loading = false;
        });
      }
}
</script>
<style lang="sass">

  #listMovieBox
    padding: 0 16px
    p
      text-align: left;
</style>