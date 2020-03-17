<template>
  <el-container class="app">
    <el-header class="header">
      <div class="title">xxx后台管理系统</div>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less">
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  font-family: "Microsoft Yahei", sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 2px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #cccccc;
}

input[type="button"],
input[type="submit"],
input[type="search"],
input[type="reset"] {
  -webkit-appearance: none;
}

textarea {
  -webkit-appearance: none;
}

html,
body {
  height: 100%;
  color: #242424;
}
.app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.header {
  background: #3a499a;
  font-size: 20px;
  line-height: 1.2;
  color: #ffffff;
  .title {
    padding-left: 20px;
    margin-top: 18px;
    letter-spacing: 2px;
  }
}
</style>