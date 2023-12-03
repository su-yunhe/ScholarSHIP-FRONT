<script setup>
import httpInstance from '@/utils/http'


import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  playerName: '',
  playerAge: '',
  playerHeight: '',
  playerWeight: '',
  playerPosition: '',
})

const addPlayer = async (player) => {
  await httpInstance.post('/addplayer', player).then(res => {
    console.log(res)
  })
}
const onSubmit = () => {
  console.log('submit!')
  addPlayer(form)
}
</script>

<template>

  <div class="container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="球员姓名">
        <el-input v-model="form.playerName" />
      </el-form-item>
      <el-form-item label="球员年龄">
        <!-- <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select> -->
        <el-input v-model="form.playerAge" />
      </el-form-item>
      <el-form-item label="球员身高">
        <el-input v-model="form.playerHeight" />
      </el-form-item>
      <el-form-item label="球员体重">
        <el-input v-model="form.playerWeight" />
      </el-form-item>
      <el-form-item label="球员位置">
        <el-input v-model="form.playerPosition" />
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加球员</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <div class="zhanwei">占位</div>
  </div>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}

.zhanwei {
  height: 500px
}
</style>