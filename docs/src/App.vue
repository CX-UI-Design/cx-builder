<template>
  <div id="app">
    <img src="./assets/img/logo.png">
    <router-view/>
    <div style="margin-top: 30px">
      <van-button type="default" @click="login()">登录</van-button>
      <van-button type="primary" @click="clickGET()">测试GET</van-button>
      <van-button type="warning" @click="clickPOST()">测试POST</van-button>
      <van-button type="danger">other</van-button>
    </div>
  </div>
</template>

<script>
  import qs from 'querystring';
  import insertService from './insertService';
  import test from '@core'

  export default {
    name: 'App',
    created() {
      const InsertService = new insertService();
      InsertService.insert();
    },
    methods: {
      login() {
        this.$fetch({
            url: '/oauth/login',
            method: 'post',
            data: {
              username: "test-name",
              password: "LXgbEFC8kna7yznMVtmheA==",
              sex: 2
            },
            transformRequest: [function (data) {
              data = qs.stringify(data);
              console.log('登录请求发送前数据处理，处理结果：————' + data);
              return data;
            }]
          }
        ).then(res => {
          console.log(res);
        });
      },
      clickGET() {
        this.$fetch(
          {
            url: '/test/get',
            method: 'get',
            data: {
              name: 'get-name'
            },
          }
        ).then(res => {
          console.log(res);
        });
      },
      clickPOST() {
        this.$fetch(
          {
            url: '/test/post',
            method: 'post',
            data: {
              name: 'post-name'
            },
          }
        ).then(res => {
          console.log(res);
        });
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
