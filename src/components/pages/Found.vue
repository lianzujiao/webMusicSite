<template>
    <div class="min-width">
        <!-- <keep-alive> -->
         <router-view></router-view>
        <!-- </keep-alive> -->
      
    </div>
</template>    
<style lang="scss">
    .min-width{
        width: 1200px;
        // background: white;
        margin: 0px auto;
        padding: 20px;
        box-sizing: border-box;
    }
</style>