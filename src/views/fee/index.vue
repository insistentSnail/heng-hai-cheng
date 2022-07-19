<template>
  <div class="fee">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>
            <span>费用明细</span>&nbsp;&nbsp;&nbsp;
            <span>总收入：{{ allPrice }}元</span>&nbsp;&nbsp;&nbsp;
            <span>总支出：{{ allOutFee }}元</span>
          </div>

          <el-button type="primary" @click="back">返回</el-button>
        </div>
      </template>
      <div class="con">
        <el-table border :data="feeData">
          <el-table-column prop="origin" label="支出去向" />
          <el-table-column prop="price" label="支出金额（元）" />
          <el-table-column label="支出证据">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.pic"
                fit="cover"
                :preview-src-list="srcList"
                :initial-index="scope.$index"
                :preview-teleported="true"
              />
              <!-- <img
                style="width: 195px; height: 422px"
                :src="scope.row.pic"
                alt=""
              /> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: '',
  setup() {
    const feeData = [
      {
        origin: '制作贴布（已被收缴）',
        price: '22',
        pic: require('@/assets/fee/img1.jpg')
      },
      {
        origin: '定做衣服30件',
        price: '150',
        pic: require('@/assets/fee/img2.jpg')
      },
      {
        origin: '抖音推广买流量',
        price: '30',
        pic: require('@/assets/fee/img3.jpg')
      },
      {
        origin: '两箱水',
        price: '36',
        pic: require('@/assets/fee/img4.jpg')
      },
      {
        origin: '盒饭+横幅等各楼栋维权费用均摊',
        price: '412',
        pic: require('@/assets/fee/img5.jpg')
      },
      {
        origin: '被抓业主补贴',
        price: '200',
        pic: require('@/assets/fee/img6.jpg')
      },
      {
        origin: '打印资料、业主代表跑腿等',
        price: '100',
        pic: require('@/assets/fee/img7.jpg')
      }
    ]

    const allOutFee = computed(() => {
      return feeData.reduce((pre, item) => {
        return pre + Number(item.price)
      }, 0)
    })

    const srcList = computed(() => {
      return feeData.map((ele) => ele.pic)
    })

    const router = useRouter()

    const route = useRoute()

    const allPrice = route.params.allPrice

    const back = () => {
      router.back()
    }
    return {
      back,
      feeData,
      allOutFee,
      srcList,
      allPrice
    }
  }
}
</script>

<style scoped lang="scss">
.fee {
  padding: 30px;
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
