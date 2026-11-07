# 我的房屋样式修复
苏住房C小程序修复「我的房屋」相关页面因重构导致的样式失效问题。

## 问题根因
- house/index.vue 将背景图改为内联 :style 绑定，微信小程序支持不好导致背景不显示
- TypeChoose_Suzhufang.vue 重构移除 ZsNav 自定义导航栏，蓝色弧形表头背景未渲染

## 修复内容
- house/index.vue 用 PageBg 加载 Bg-szf.png 城市背景与 history-szf.png 白色胶囊底图
- TypeChoose_Suzhufang.vue 恢复 ZsNav 透明导航栏，用 PageBg 加载蓝色弧形 Bg.svg
- tenant/index.vue 同步采用相同 PageBg 方案

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：house/index.vue、TypeChoose_Suzhufang.vue、tenant/index.vue
- 所属项目：苏住房C；来源会话ID：41740334-7cda-42d7-b1c3-97712e6c8e6a

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "house_style_fix",
  "source_extraction_id": "630b378ab64046fd979a5f252bb10a6b",
  "version": 1,
  "memory_type": "entities"
}
-->