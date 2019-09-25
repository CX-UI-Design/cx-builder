<template>
  <div id="app">
    <h1>Home</h1>
    <nav>
      <ul>
        <li>Go to</li>
        <li>
          <a href="../index.html">index</a>
        </li>
        <li>
          <a href="../About/index.html">About Us</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import HelloWorld from "@/components/HelloWorld.vue";

  export default {
    name: "Home",
    components: {
      HelloWorld
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/css/common';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .short-it {
    position: relative;

    overflow-x: hidden;
    overflow-y: auto;
    max-height: 300px;

    + div {
      position: absolute;
      bottom: 0;
      z-index: 1;

      display: block;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(to bottom, transparent, #fff);
    }
  }

  nav ul {
    margin-top: 30px;
  }
</style>
