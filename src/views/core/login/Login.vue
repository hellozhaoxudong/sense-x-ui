<template>
  <div class="sense-login">
    <!--产品logo-->
    <div class="product-logo">
      sense
    </div>
    <!--登录内容-->
    <div class="login-container">
      <div class="login-left">
        <div class="product-info">
          <div class="product-title">
            智能化BI分析平台
          </div>
          <div class="product-desc">
            0门槛轻松上手
          </div>
        </div>
      </div>
      <div class="login-right">
        <div class="login-box">
          <div class="login-logo">
            智能化BI分析平台
          </div>
          <div class="login-form">
            <div class="login-title">欢迎登录</div>
            <a-form ref="formRef" :model="formState" size="large" :label-col-props="{ span: 0 }" :wrapper-col-props="{ span: 24 }">
              <a-form-item field="username" required label="">
                <a-input v-model="formState.username" placeholder="用户名"><template #prefix><icon-user /></template></a-input>
              </a-form-item>
              <a-form-item field="password" required>
                <a-input v-model="formState.password" placeholder="密码"><template #prefix><icon-lock /></template></a-input>
              </a-form-item>
            </a-form>
            <div class="login-desc">
              我已阅读并同意《服务条款》和《隐私政策》，未注册手机号将自动注册为如视VR用户
            </div>
            <a-button type="primary" long size="large" @click="doLogin">登录</a-button>
            <div class="more-login">
              <a-divider :plain="true">更多登录方式</a-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--脚本-->
    <div class="footer">
      版权所有：国新健康保障服务有限公司
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {login} from "../../../api/system/login.js";
import { Notification } from '@arco-design/web-vue';
const router = useRouter();

const formRef = ref();
const formState = ref({ username: '', password: '' });

onMounted(()=>{
  sessionStorage.removeItem('sense.access_token');
})


function doLogin(){
  formRef.value.validate((err)=>{
    if (err){
      return;
    }

    login({
      username: formState.value.username,
      password: formState.value.password
    }).then(res=>{
      if (res.data && res.data['access_token']){
        Notification.success('登录成功')
        sessionStorage.setItem('sense.access_token', res.data['access_token']);

        // 跳转登录
        router.push({ path: '/' })
      }
    })
  });
}


</script>

<style scoped lang="scss">
.sense-login{
  height: 100vh;
  width: 100vw;
  min-width: 1200px;
  min-height: 665px;
  overflow-y: hidden;
  overflow-x: hidden;
  background-image: url("/src/assets/login.png");
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;

  .product-logo{
    padding: 60px 60px 0;
  }

  .login-container{
    width: 100%;
    flex: 1;

    display: flex;
    align-items: center;

    .login-left{
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 24px;

      .product-info{
        .product-title{
          color: #333;
          font-size: 36px;
          font-weight: 600;
          line-height: 42px;
          margin: 20px 0 16px;
        }

        .product-desc{
          color: rgb(0,0,0,0.65);
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          padding-bottom: 32px;
        }

        .product-tag{
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .user-div{
          background: hsla(0, 0%, 100%, .35);
          border: 1px solid hsla(0, 0%, 100%, .65);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin-top: 89px;
          padding: 24px 32px 24px 24px;

          .user-title{
            color: rgba(0,0,0,.88);
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 12px;
          }

          .user-tags{
            display: flex;
            flex-direction: column;
            gap: 8px;

            .user-tag{
              color: rgba(0,0,0,.65);
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
      }
    }
    .login-right{
      width: 50%;
      display: flex;
      align-items: center;
      padding-left: 160px;

      // 登录块
      .login-box{
        background-color: #fff;
        border-radius: 4px;
        padding: 2px;
        width: 448px;

        // 登录框logo
        .login-logo{
          display: flex;
          align-items: center;
          padding: 36px 24px;
          font-size: 24px;
          font-weight: 800;
          background-image: url("/src/assets/login-logo-bck.png");
          background-repeat: no-repeat;
          background-size: cover;
        }

        // 登录表单
        .login-form{
          padding: 32px;

          .login-title{
            padding-left: 4px;
            color: rgba(0,0,0,.88);
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 24px;
          }

          .login-desc{
            color: rgba(0,0,0,.88);
            font-size: 12px;
            line-height: 20px;
            padding-top: 12px;
            margin-bottom: 12px;
          }

          .more-login{
            margin: 16px 0;

            :deep(.ant-divider-inner-text){
              font-size: 12px;
              opacity: .45;
            }
          }
        }
      }
    }
  }

  .footer {
    padding-top: 60px;
    padding-bottom: 4px;
    font-size: 14px;
    text-align: center;
    color: #666;
  }
}
</style>