<template>
    <div class="play-list">
        <div class="list-tit">
            <i class="iconfont iconplayingList"></i>
            <span>播放列表</span>
        </div>
        <div class="list-del text-right">清空</div>
        <div class="list-box">
            <div class="song-box">
                <i class="iconfont iconplay"></i>
                <p class="song-name text-left">歌曲名</p>
                <Icon type="like" @click="collectSong()"/>
                <Icon type="delete" @click="delSong()"/>
                    <p>3:15</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'playList',
    data(){
        return{

        }
    },
    methods:{
        collectSong(){},
        delSong(){},
    }
}
</script>
<style lang="scss">
// .iconfont {
//   font-family: "iconfont" !important;
//   font-size: 16px;
//   font-style: normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }
@import "scss/index.scss";
    .play-list{
       padding: 0 15px ;
        .list-tit{
            i{
                font-size: 24px;
                // line-height: px;
                // padding: 0 5px;
                transform: translateY(3px);
            }
            font-size: 16px;
            border-bottom: 1px solid $color-main;
            line-height: 45px;
        }
        .list-del{
            color:$color-text-actived;
            line-height: 35px;
        }
        .list-box{
            // line-height: 40px;
            .song-box{
                line-height: 42px;
                display: flex;
                // justify-content: space-around;
                i{
                    font-size: 26px;
                    color:$color-text-actived;
                    width: 30px;
                    transform: translateY(5px);
                    // translate: transform;
                }
                .song-name{
                    width: 300px;
                    padding:0 5px;

                }
                p{
                }
            }
        }
    }
</style>