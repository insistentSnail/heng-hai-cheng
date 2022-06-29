<template>
  <div
    class="outBox"
    :style="`height:${(li.height * allData.length) / 4}px;padding-top:${
      (li.height * pos) / 4
    }px`"
  >
    <div
      :style="`height:${li.height}px`"
      :class="item.jfData[0].price > 0 ? 'roomCard active' : 'roomCard'"
      v-for="item in cardData"
      :key="item.roomName"
    >
      <div class="roomCardTop">{{ item.roomName }}</div>
      <div class="roomCon">
        <div class="phone">电话号码：{{ item.phone }}</div>
        <div class="roomConall">
          <div class="roomCon-l">
            维权统计
            <el-table
              border
              :data="item.wqData"
              style="width: 100%; margin-top: 10px"
            >
              <el-table-column prop="index" label="次数" />
              <el-table-column prop="isFinished" label="是否在场" />
            </el-table>
          </div>
          <div class="roomCon-r">
            缴费统计
            <el-table
              border
              :data="item.jfData"
              style="width: 100%; margin-top: 10px"
            >
              <el-table-column prop="price" label="已缴费金额(元)" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Array,
      default: () => []
    },
    allData: {
      type: Array,
      default: () => []
    },
    li: {
      type: Object,
      default: () => {}
    },
    pos: {
      type: String
    }
  },
  setup(props) {
    console.log(props.allData.length, props.li.height)
  }
}
</script>

<style scoped lang="scss">
.outBox {
  //   display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.roomCard {
  margin-top: 20px;
  margin-right: 20px;
  width: calc(25% - 15px);
  box-sizing: border-box;
  display: inline-block;
  //   height: 205px;
  background: hsla(0, 0%, 100%, 0.39);
  border: 1px solid #e4e4e4;
  box-shadow: 0 2px 4px #d5d5d5;
  border-radius: 10px;
  overflow: hidden;
  &.active {
    background: #f00;
    color: #fff;
  }
  &:nth-child(4n) {
    margin-right: 0;
  }
  .roomCardTop {
    height: 50px;
    background: #cf8d8e;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .roomCon {
    padding: 10px 20px;
    .phone {
      margin-bottom: 10px;
    }
    .roomConall {
      display: flex;
    }
    .roomCon-l {
      width: 50%;
      margin-right: 10px;
    }
    .roomCon-r {
      width: 50%;
    }
  }
}
</style>
