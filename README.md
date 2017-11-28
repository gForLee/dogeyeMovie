# 狗眼电影，欢迎star！！！！！你们的支持是我最大的动力！

> 狗眼电影第一版！

用的是vue+vue router+mint ui+sass编写的项目。
跨域用的是jsonp。

我这里说下问题哈！
第一个问题就是抓取演员头像的时候因为豆瓣的防刷浏览机制的问题请求不到演员头像！
第二个就是data里面没有写各个数据的类型。
第三个就是样式好像不太好看！
第四个求各位老哥别打！

目录结构
	src
		common
			public.sass ======>  初始化css
		components
			castsDetail ======>  演员个人信息页面
			detailMovie ======>  电影详情页面
			header      ======>  头部组件
			listMovie   ======>  电影列表
			smallComment======>  短评
			spinner     ======>  等待动画
			star        ======>  星级评价
		router
			index.js    ======>  路由
		App.vue         ======>  app入口文件
		main.js         ======>  引入了路由 mint-ui vue-resource 初始化css
		
		
## Build Setup

``` bash
# 先把项目克隆到本地
git clone https://github.com/diaosiwei/dogeyeMovie.git

# cd 到dogeyeMovie
cd dogeyeMovie 

# 安装包依赖  建议各位老哥使用淘宝镜像 因为比较快！！！
npm install

# 启动端口
npm run dev




