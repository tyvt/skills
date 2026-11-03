# 全局组件下沉分包解决主包超限
uni-app小程序主包上传体积上限2048KB，仅被单个分包使用的全局组件必须下沉进分包目录，否则白占主包体积。

## 问题现象
- 构建失败主包上传预估2055.4KB，超上限约7.4KB，磁盘主包1748.7KB
- IntentionMyList只被pages_transaction/intention/list.vue使用，却因放src/components/被打进主包占约14KB

## 根因
- uni-app只要组件放全局src/components/下就无条件打进主包，与实际使用页面数无关
- 小程序分包之间不能跨包引用组件，故组件正确位置是唯一使用方所在分包目录

## 解决方案
- 将IntentionMyList从src/components/IntentionMyList/移到src/pages_transaction/intention/components/IntentionMyList.vue，list.vue改相对路径导入
- 重新构建后上传预估降至2046.0KB通过（余量约2KB）

## 结论性约定
- 新增组件先看消费者是否只在某一分包，是则放分包目录，不丢进src/components
- 主包余量近0，后续全局组件/mixin/工具函数都会直接触发超限
- 排查顺序：先量体积→再定位只被单个分包使用的全局组件→下沉，而非先删功能

## 验证与归属
- 会话1a74b0e2：构建失败日志限制2048KB/预估2055.4KB；移动后主包磁盘1748.7KB、上传预估2046.0KB通过
- 涉及文件：list.vue、IntentionMyList.vue、src/components/IntentionMyList/；所属项目苏住房C；代码基线f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "global_component_sink",
  "source_extraction_id": "cd066349e13749679f633dd45256c607",
  "version": 1,
  "memory_type": "entities"
}
-->