<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.png" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2023-3-18</span></p>
            <p>上次登录的地点：<span>成都</span></p>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px;height: 460px;">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"/>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
            <el-card class="box-card" v-for="item in countData" :key="item.name" :body-style="{display:'flex'}">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></i>
                <div class="detail">
                    <p class="price">{{ item.value }}</p>
                    <p class="desc">{{ item.name }}</p>
                </div>
            </el-card>
        </div>
        <el-card style="height: 300px;">
            <div ref="echarts1" style="height: 300px;width: 100%;"></div>
        </el-card>
        <div class="graph">
            <el-card>
                <div ref="echarts2" style="height: 280px;width: 100%;"></div>
            </el-card>
            <el-card>
                <div ref="echarts3" style="height: 260px;width: 100%;"></div>
            </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTableData,getCountData,getData } from "../api/index";
import * as echarts from 'echarts'

export default {
  data() {
    return {
      tableData: [],
      tableLabel:{ 
            name: "课程",
            todayBuy: "今日购买",
            monthBuy: "月购买",
            totalBuy: "总购买"
        },
      countData:[]  
    };
  },
  created() {
    getCountData().then(res=>{
        this.countData=res.data
    })
  },
  mounted(){
    //获取图表数据
    getData().then(({data})=>{
        console.log(data);
        this.tableData = data.tableData
        // 基于准备好的dom，初始化echarts1实例
        let echarts1 = echarts.init(this.$refs.echarts1);
        let echarts1Option = {}
        const {orderData,userData,videoData} = data
        let xAxis = Object.keys(orderData.data[0])
        echarts1Option.xAxis={data:xAxis}//x轴
        echarts1Option.legend={data:xAxis}//图例
        echarts1Option.series = []
        xAxis.forEach(key => {
            echarts1Option.series.push({
                name:key,
                type:'line',
                data:orderData.data.map(item=>item[key])
            })
        }); 
        echarts1Option.yAxis={}
        echarts1.setOption(echarts1Option);

        // echarts2实例柱状图
        let echarts2 = echarts.init(this.$refs.echarts2);
        let echarts2Option = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item=>item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [{
            name:"新增用户",
            type:'bar',
            data:userData.map(item=>item.new)
          },{
            name:"活跃用户",
            type:'bar',
            data:userData.map(item=>item.active)
          }],
        }
        echarts2.setOption(echarts2Option);

        //饼状图
        let echarts3 = echarts.init(this.$refs.echarts3);
        let echarts3Option ={
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{
            data:videoData,
            type:'pie'
          }],
        }
        echarts3.setOption(echarts3Option);
    })
  },
};
</script>

<style lang="less">
.user {
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  margin-left: 20px;
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      margin-left: 60px;
      color: #666666;
    }
  }
}

.num{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .icon{
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            margin-bottom: 10px;
            font-size: 30px;
            height: 30px;
            line-height: 30px;
        }
        .desc{
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
        .el-card__body{
            padding: 0;
        }
    }
}
.graph{
    display: flex;
    justify-content: space-between;
    .el-card{
        margin-top: 20px;
        height: 280px;
        width: 48%;
    }
}
</style>
