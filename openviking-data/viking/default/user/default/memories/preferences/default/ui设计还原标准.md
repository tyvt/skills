- 要求按设计图 100% 还原 UI，以设计稿为准进行视觉与文案对齐。
- 资产公示页设计基线：页面背景 #F7F8FA、顶部公示卡渐变 #4A90E2→#1989FA 且副标题为不透明白字、章节标题左侧黄色圆点 #FFC53D 配蓝色标题 #1989FA（去掉原长条渐变）、数据行浅蓝底 #F0F7FF 且右侧数值 #1989FA + ›、白卡片圆角约 16rpx、数据行圆角约 12rpx、停车泊位右上角胶囊按钮为 #1989FA 白字“租售情况”。
- 物业经营用房“附属房屋总数”仍绑定 leaseHouseNum，其余项固定展示（含 0）不再 v-show 隐藏；停车泊位产权/公共车位数文案为“其中场地车位数 / 其中规划停车位车位数”，字段仍为 motorParkingSpaceTotal、planningParkingSpaceTotal。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "UI设计还原标准",
  "source_extraction_id": "1c20757968514ab4a6925e230826885b",
  "version": 1,
  "memory_type": "preferences"
}
-->