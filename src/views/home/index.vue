<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>楼栋管理</span>
        </div>
      </template>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="楼栋：">
          <el-select v-model="formInline.build" placeholder="请选择楼栋">
            <el-option
              v-for="item in buildList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary">下载模板</el-button>
          <el-button type="primary">导入数据</el-button>
          <!-- {{ build }}{{ buildName }} -->
        </el-form-item>
      </el-form>
      <div class="tips">
        <span style="margin-right: 20px">总计收款：{{ Data.allPrice }}元</span>
        <span style="margin-right: 20px">支出：{{ Data.cost }}元</span>
        <span>剩余：{{ Data.resetPrice }}元</span>
        <el-button class="btn" type="primary" @click="routerToFee"
          >支出明细表</el-button
        >
      </div>
      <div
        class="roomCards"
        ref="root"
        @scroll="test"
        :style="`height:calc(100vh - 300px)`"
      >
        <RoomCard
          :cardData="showList"
          :allData="Data.buildData"
          :li="li"
          :pos="pos"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { obj } from './buildData/build_20'
import { reactive, toRefs, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RoomCard from './roomCard.vue'
export default {
  name: 'home',
  components: {
    RoomCard
  },
  setup() {
    const buildList = [
      {
        name: '20栋',
        value: '20'
      },
      {
        name: '21栋',
        value: '21'
      }
    ]
    const formInline = reactive({
      build: '20'
    })

    // 虚拟列表
    const xnList = reactive({
      li: {
        // 列表项信息
        height: 350
      },
      pos: 1, // 第一排显示的元素的下标
      MAX_NUM: 1, // 在容器内最多显示几个列表项
      timer: null, // 定时器
      carriedOut: true // 能不能执行操作
    })

    const test = () => {
      // 节流
      if (xnList.carriedOut) {
        // 容器跟里面的列表项
        const { li } = xnList
        const cHeight = document.documentElement.clientHeight
        // 计算可视区域最多能显示多少个li
        xnList.MAX_NUM = Math.ceil(cHeight / li.height) * 4
        // 获取 overflow:scroll 的元素已滚动的高度
        console.log(root.value.scrollTop, 'root.value.scrollTop')
        let scrollTop = root.value.scrollTop
        // 计算当前处于第一排的元素的下标
        xnList.pos = Math.floor(scrollTop / li.height) * 4
        // 下方节流操作
        xnList.carriedOut = false
        xnList.timer = setTimeout(() => {
          xnList.carriedOut = true
          clearTimeout(xnList.timer)
        }, 50)
      }
    }

    const root = ref(null)
    let Data = ref({})
    Data.value = obj
    onMounted(() => {
      test()
    })

    const showList = computed(() => {
      // 根据计算出来的 第一排元素的下标,和最多显示多少个  用slice实现截取数组
      console.log(xnList.pos, xnList.pos + xnList.MAX_NUM)
      let arr = Data.value.buildData.slice(
        xnList.pos,
        xnList.pos + xnList.MAX_NUM
      )
      console.log(arr)
      return arr
    })

    const onSubmit = () => {
      console.log(formInline.build)
      switch (formInline.build) {
        case '20':
          Data.value = obj
          break
        case '21':
          Data.value = { buildData: [] }
          break
      }
      console.log('submit!')
    }
    const buildName = computed(() => {
      return buildList.find((ele) => ele.value === formInline.build)?.name
    })

    const router = useRouter()
    const routerToFee = () => {
      router.push({
        name: 'Fee',
        params: {
          allPrice: Data.value.allPrice
        }
      })
    }

    return {
      formInline,
      onSubmit,
      buildList,
      ...toRefs(formInline),
      buildName,
      Data,
      root,
      showList,
      test,
      ...toRefs(xnList),
      routerToFee
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  padding: 30px;
  .tips {
    margin-bottom: 10px;
    .btn {
      margin-left: 20px;
    }
  }
  .roomCards {
    overflow: scroll;
    // border: 1px solid red;
  }
}
</style>
