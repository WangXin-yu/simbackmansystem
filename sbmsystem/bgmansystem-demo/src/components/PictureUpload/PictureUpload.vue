<template>
  <div>
    <el-card class="box-card">
      <div style="line-height: 60px;font-size:30px;">支持拖拽</div>
      <div style="line-height: 60px;background: #f0f2f5;margin-bottom:20px;">
        ElementUI自带上传组件
      </div>
      <el-upload class="upload-demo" drag action="api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div style="line-height: 60px;font-size:30px;">支持裁剪</div>
      <div style="line-height: 60px;background: #f0f2f5">
        vue-image-crop-upload
      </div>
      <el-button type="primary" style="margin-top:20px;" @click="toggleShow">
        上传图片
      </el-button>
      <myUpload field="file"
                 :width="300"
                 :height="300"
                 url="/api/upload"
                 :params="params"
                 :headers="headers"
                  v-model="show"
                 :value.sync="show"
                 img-format="png">
      </myUpload>
      <img :src="imgDataUrl">
    </el-card>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';
export default {
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: ""
    };
  },
  components: {
    myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },

  },
  events:{
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
      this.imgDataUrl = imgDataUrl;
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      // this.imgDataUrl = jsonData.files.Avatar1;
      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    }
  }
};
</script>
<style scoped lang="scss">
.box-card {
  margin: 20px;
}
</style>
