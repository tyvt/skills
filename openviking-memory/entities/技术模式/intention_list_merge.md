# 苏找房求购信息页面合并修复
苏住房C「苏找房」安卓端求购信息空白，根因是 intention/my/list 页面路径仍存在但组件已抽走，安卓端加载报错。

## 问题根因
- 上次只把组件抽到 components 目录，intention/my/list 页面路径仍存在，安卓端仍尝试加载并报错

## 本次改动
- 删除 intention/my/list 页面（从 pages.json 移除，并删除 my/list.vue）
- 合并为单一页面 intention/list，参数区分：求购信息 /pages_transaction/intention/list（4_3_11）；我的求购 /pages_transaction/intention/list?mode=mine（4_3_10）
- 共享组件移到主包 @/components/IntentionMyList/IntentionMyList.vue，避免分包嵌套引用问题
- 同步更新 menuRouteMap.js 和构建脚本 merge-main-leaks.mjs

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：pages.js、my/list.vue、@/components/IntentionMyList/IntentionMyList.vue、menuRouteMap.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：e0538ad3-fc2d-43a5-8b21-e951b74289dd；代码基线：none
- 验证要求：清理 dist/unpackage 等构建产物后重新打包，验证苏找房→求购信息、我的→我的求购

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "intention_list_merge",
  "source_extraction_id": "7078ae91ae8c4d12956f0dcd2e68e7a4",
  "version": 1,
  "memory_type": "entities"
}
-->