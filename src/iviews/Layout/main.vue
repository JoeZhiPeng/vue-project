<template>
    <Content :style="{ background: 'rgb(236, 236, 236)', position: 'absolute', top: '64px', width: '100%', minHeight: mainHeight, textAlign: 'left', padding: '10px 10px 10px 210px'}">
        <div class="conbox" :style="{height: connHeight}">
          <router-view/>
        </div>
    </Content>
</template>
<script>
  export default {
    data() {
      return {
        mainHeight: '400px',
        connHeight: '400px'
      }
    },
    created() {
      this.getWindowHeight()
    },
    methods:{
      getWindowHeight() {
        this.mainHeight = window.innerHeight - 64 + 'px';
        this.connHeight = window.innerHeight - 84 + 'px';
      }
    }
  }
</script>
<style>
  .conbox{
    background: #fff;
    overflow: auto
  }
</style>
