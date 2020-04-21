<template>
  <div class="self-msg text-left">
    <h2>编辑个人资料</h2>
    <div class="upload">
      <p class="left-tips">头像</p>
      <el-upload
        class="avatar-uploader"
        :action="uploadAvator"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="img"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="90px" :label-position="labelPosition" class="msg-form">
        <el-form-item label="昵称" class="form-input-common">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市" class="form-input-common">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" class="form-input-textare">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
 import * as user from "api/user"
 import {uploadImg} from "api/uploadImg"
import { mapGetters } from 'vuex';
export default {
   
  data() {
    return {
        labelPosition:"left",
        uploadAvator:uploadImg,
        imageUrl:'',
      form: {
        name: "",
        sex: "",
        address: "",
        intro: ""
      }
    };
  },
  computed:{
      ...mapGetters({user:"user"})
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.url;
    
      this.$store.dispatch('setUser',{
        email:this.user.email,
        name:this.form.name,
        avator:this.imageUrl,
      })
    },
    beforeAvatarUpload(file) {
     
      const isLt2M = file.size / 1024 / 1024 < 2;

     
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return  isLt2M;
    },
    onSubmit(){
        user.updateMsg({
            email:this.user.email,
            avator:this.imageUrl,
            sex:this.form.sex,
            address:this.form.address,
            intro:this.form.intro
        }).then(res=>{
            if(res.code==200){
                this.$message({
                    type:'success',
                    message:"资料修改成功"
                })
               

            }
        })
    },
    getMsg(){
        user.getMsg({email:this.user.email}).then(res=>{
            if(res.code==200){
                this.form.name=res.data.name||'',
                this.form.sex=res.data.sex||'',
                this.form.address=res.data.address||'',
                this.form.intro=res.data.intro||''
                this.imageUrl=res.data.avator
                
            }
        })
    }
  },
  mounted(){
      this.getMsg()
  },
};
</script>
<style lang="scss">
@import "scss/index.scss";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
.self-msg {
  padding: 50px;
  .left-tips {
    font-size: 18px;
  }
  h2 {
    font-size: 20px;
  }
  .upload {
    display: flex;
    margin: 20px 0;
    p {
      line-height: 40px;
      margin-right: 52px;
    }
  }
  .msg-form{
      .el-form-item__label{
          font-size: 18px;
      }
      .form-input-common{
          padding-right: 220px;
      }
      .form-input-textare{
          padding-right: 100px;
          textarea{
              min-height: 100px !important;
          }
      }
  }
  .submit-btn{
      padding-left: 90px;
      .el-button--primary{
          
          background-color:$color-text-actived;
          border-color:$color-text-actived;
          span{
              color:white;
              font-size: 18px;
          }
      }
  }
}
</style>
</style>