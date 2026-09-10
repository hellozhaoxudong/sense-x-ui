<template>
  <CommonModal title="个人中心" width="720px" :ok-text="null" :cancel-text="null" @close="emit('close')" height="auto">
    <div class="user-center">
      <!--用户信息-->
      <div class="user-info">
        <img src="@/assets/core/avatar.svg" width="48px" height="48px"/>

        <div class="user-content">
          <template v-if="editModel==='PASSWORD'" >
            <div class="user-desc">
              <span class="edit-span">旧密码:</span>
              <a-input size="small" v-model="passwordInfo.oldPassword" max-length="50" style="width: 320px"/>
            </div>
            <div class="user-desc">
              <span class="edit-span">新密码:</span>
              <a-input size="small" v-model="passwordInfo.newPassword" max-length="50" style="width: 320px"/>
            </div>
          </template>

          <template v-if="editModel !== 'PASSWORD'" >
            <div class="user-name">
              <span v-if="!editModel">{{userInfo.username}}（{{userInfo.name}}）</span>
            </div>

            <template v-if="editModel === 'USERINFO'">
              <div class="user-desc">
                <span class="edit-span">登录名:</span>
                <a-input size="small" v-model="editUserInfo.username" max-length="50" style="width: 320px"/>
              </div>
              <div class="user-desc">
                <span class="edit-span">姓名:</span>
                <a-input size="small" v-model="editUserInfo.name" max-length="50" style="width: 320px"/>
              </div>
            </template>

            <div class="user-desc">
              <span class="edit-span">邮箱:</span>
              <span v-if="!editModel">{{userInfo.email}}</span>
              <a-input v-if="editModel==='USERINFO'" size="small" v-model="editUserInfo.email" max-length="50" style="width: 320px"/>
            </div>
            <div class="user-desc">
              <span class="edit-span">手机:</span>
              <span v-if="!editModel">{{userInfo.phone}}</span>
              <a-input v-if="editModel==='USERINFO'" size="small" v-model="editUserInfo.phone"  max-length="20" style="width: 320px"/>
            </div>
          </template>
        </div>
        <div>
          <TextBtns>
            <div v-if="!editModel" @click="editModel = 'PASSWORD'">重置密码</div>
            <div v-if="editModel==='PASSWORD'" @click="onSubmitPassword()">更新密码</div>
            <div v-if="!editModel" @click="onEditUserInfo()">编辑</div>
            <div v-if="editModel==='USERINFO'" @click="onSubmit()">保存</div>
            <div v-if="editModel" @click="editModel = ''">取消</div>
          </TextBtns>
        </div>
      </div>

      <!--角色-->
      <div class="block-title">我的租户</div>
      <div class="block-items">
        <div v-for="item in userInfo.tenantList" class="block-item">{{item.tenantName}}</div>
      </div>

      <!--角色-->
      <div class="block-title">我的角色</div>
      <div class="block-items">
        <div v-for="role in userInfo.roleList" class="block-item">{{role.roleName}}</div>
      </div>
    </div>
  </CommonModal>
</template>

<script setup>
import {ref} from 'vue';
import CommonModal from "../../../core/component/CommonModal/CommonModal.vue";
import {UserStore} from "../../../store/core/UserStore.js";
import {storeToRefs} from "pinia";
import TextBtns from "../../../core/component/CommonBtn/TextBtns.vue";
import {changeMyInfo, changeMyPassword, submitUser} from "../../../api/core/user/user.js";

// 定义 emits
const emit = defineEmits(['close']);

const userStore = UserStore();
const { userInfo } = storeToRefs(userStore);

// 是否为编辑模式
const editModel = ref(null);

const editPassword = ref(false);

const passwordInfo = ref({
  oldPassword: '',
  newPassword: '',
});

// 编辑中的用户信息
const editUserInfo = ref({});

function onEditUserInfo(){
  editUserInfo.value = {
    username: userInfo.value.username,
    name: userInfo.value.name,
    email: userInfo.value.email,
    phone: userInfo.value.phone
  };
  editModel.value = 'USERINFO';
}

// 提交用户信息
function onSubmit(){
  changeMyInfo(editUserInfo.value).then(()=>{
    userStore.initUserInfo();
    editModel.value = '';
  })
}

// 提交用户信息
function onSubmitPassword(){
  changeMyPassword(passwordInfo.value).then(()=>{
    editModel.value = '';
  })
}
</script>

<style scoped lang="scss">
.user-center{
  // 用户信息
  .user-info{
    margin-bottom: 18px;
    display: flex;
    gap: 18px;

    // 用户信息
    .user-content{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .user-name{
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
      }
      .user-desc{
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgb(0 0 0 / 0.6);
        font-size: 16px;
        box-sizing: border-box;

        .edit-span{
          font-size: 14px;
          min-width: 50px;
        }
      }
    }
  }


  // 块标题
  .block-title{
    font-size: 14px;
    font-weight: 500;
    padding: 12px 0px 8px 0;
  }
  // 块排列
  .block-items{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;

    .block-item{
      padding: 4px 12px;
      background-color: #E6F4FF;
      color: #034eb5;
      border-radius: 2px;
      &:hover{
        background-color: #034eb5;
        color: #fff;
      }
    }
  }

  // 创作指数
  .log-div{
    display: flex;
    gap: 2px;
    justify-content: center;

    .log-month{
      .log-month-bolcks{
        display: flex;
        gap: 2px;

        .log-item{
          width: 14px;
          height: 14px;
          margin-bottom: 2px;
          background-color: #f4f5f5;
        }
      }
      .log-month-name{
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
      }
    }
  }

  .log-levels{
    display: flex;
    gap: 4px;
    justify-content: end;
    align-items: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 4px;

    .level-item{
      width: 14px;
      height: 14px;
      background-color: #f4f5f5;
    }
    .l2{
      background-color: #ccd7ef;
    }
    .l3{
      background-color: #a4b9ea;
    }
    .l4{
      background-color: #7c9be5;
    }
    .l5{
      background-color: #547de0;
    }
    .l6{
      background-color: #2c60db;
    }
  }

  .line-item{
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;

    // 标题
    .title{
      width: 80px;
      font-weight: 500;
      background-color: rgba(163, 163, 163, 0.15);
      border-radius: 4px;
      padding: 2px 4px;
    }

    // 内容
    .line-content{
      flex: 1;
    }
  }
}
</style>