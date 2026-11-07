# 资产公示页 UI 还原
i淮安H5 资产公示页已按设计稿 100% 还原视觉与结构。

## 视觉与布局
- 页面背景改为 `#F7F8FA`（原 `#f7f7f7`）
- 顶部公示卡渐变 `#4A90E2 → #1989FA`，主标题 `{项目名}项目资产公示`，副标题不透明白字
- 白卡片圆角约 `16rpx`，内边距接近设计
- 章节标题左侧黄色圆点 `#FFC53D` + 蓝色标题 `#1989FA`（去掉原长条渐变）
- 数据行浅蓝底 `#F0F7FF`、圆角约 `12rpx`，左侧 `#323233`，右侧数值 `#1989FA` + `›`
- 停车泊位右上角胶囊按钮 `#1989FA` 白字「租售情况」

## 结构与文案
- 物业经营用房：附属房屋总数绑定 `leaseHouseNum`，其余项固定展示（含 0），不再 `v-show` 隐藏
- 停车泊位：产权车位数 / 公共车位数 为一块卡片 + 两行子项；公共车位子项文案「其中场地车位数 / 其中规划停车位车位数」（字段 `motorParkingSpaceTotal`、`planningParkingSpaceTotal`）
- 增加私人产权、已租用、可售等展示项

## 验证与归属
- 验证证据：extracted source=cursor session=a28b87a1-ed57-4574-8330-165e03b3ff8d
- 涉及文件：src/pages_benefit/assetsPublicity/index.vue
- 所属项目：i淮安公版；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "assets_publicity_ui",
  "source_extraction_id": "6b6b7a1e838b47d5a987671a16add438",
  "version": 1,
  "memory_type": "entities"
}
-->