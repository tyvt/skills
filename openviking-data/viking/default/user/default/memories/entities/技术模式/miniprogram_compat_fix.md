# 苏住房C小程序端兼容修复
小程序端处理guardApply表单缓存与StatisticsCard图表适配问题，确保跨端正常运行。

## 云守护申请guardApply
- 新增utils/form-cache.js，用uni.getStorageSync/setStorageSync/removeStorageSync替代sessionStorage做跨端暂存
- 更新pages_guard/guardApply/index.vue、step1.vue、step2.vue
- 步骤间表单缓存(step2Form、previousStep2Form)在小程序中可正常使用

## 收支统计StatisticsCard图表适配
- H5继续用div+echarts.init
- 微信小程序改用canvas type="2d"+createSelectorQuery初始化
- 图表初始化改为async/await，避免数据先于图表加载导致setOption无效

## 涉及文件与归属
- 涉及utils/form-cache.js、pages_guard/guardApply/index.vue、step1.vue、step2.vue
- 所属项目：苏住房C(zhi2-mobile-shimin)；来源会话ID：4b82f232-7ddb-41e7-b369-187d3bfea551

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "miniprogram_compat_fix",
  "source_extraction_id": "96ccac645cc742a1b882af762db6e9aa",
  "version": 1,
  "memory_type": "entities"
}
-->
