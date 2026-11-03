# wx:key缺失须用全局脚本扫描并复扫归零重点在公共组件
苏住房C小程序wx:key缺失警告易忽略，但公共组件缺key会致列表项错位等真实故障，须全局扫描脚本复扫归零。

## 问题现象
- 控制台持续输出「Now you can provide attr wx:key for a wx:for to improve performance」
- 报错只指向编译产物里的直接责任页面，不含公共组件与第三方组件，逐页改会漏

## 根因
- uni-app 编译时把 :key 透传成 wx:key，缺失只是性能警告不阻塞渲染，易被当噪声忽略
- ZsPicker、FileList、houseCard 等公共组件缺 key 会致「重渲染后选项错位」「空数据时索引访问异常」

## 解决方案
- 写一次性扫描脚本 scan-missing-keys.js 覆盖 src 下全部 .vue 模板，兼容跨行多属性标签与属性内 => 误判
- 本轮扫出 8 处并修复：公共组件、template v-for 的 key 写 template 上、内容列表用 item.xxxId || index 兜底
- 改完必须复扫一次确认 0 处缺失；复扫已 0 处仍有警告则责任在第三方组件或编译产物，可停止排查

## 验证与归属
- 验证：会话 82ba9b4f 用户要求全局排查补全 wx:key，扫描 src 全部 .vue 修复 8 处，复扫 0 处缺失
- 涉及文件：scan-missing-keys.js、components/ZsPicker/ZsPicker.vue、pages_transaction/newHouse/detail.vue、pages_owner/house/detail.vue、pages_guard/guardApply/components/step3.vue
- 所属项目：苏住房C；来源会话ID：82ba9b4f-a6c5-499b-9c0c-8585ce86cdc9；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "wxkey_global_scan",
  "source_extraction_id": "fe7c48b530a64b4a9825c5f0ecbd6ae5",
  "version": 1,
  "memory_type": "entities"
}
-->