<template>
  <div id="app">
    <h1>About</h1>
    <nav>
      <ul>
        <li>Go to</li>
        <li>
          <a href="../index.html">index</a>
        </li>
        <li>
          <a href="../Home/index.html">Home</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'About',
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
</style>
