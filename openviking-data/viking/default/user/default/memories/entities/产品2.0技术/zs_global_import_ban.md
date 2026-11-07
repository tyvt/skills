# 已全局注册 zs 组件禁止局部 import
页面复制粘贴时把全局注册的 zs 组件写成不存在路径做局部 import，会引发 Vite resolve 失败，应删除多余本地 import。

## 问题现象
- 模板用 <zs-tencent-map> 有效，但局部 import 写成不存在路径（如 '@/views/.../zsTencentMap/index.vue'）
- Vite 报 Failed to resolve import，构建/启动失败，整页编译不过

## 根因分析
- main.js 已用 import.meta.glob 按「父目录名即标签名」把 src/components 下组件全局注册
- ZsTencentMap 真实位置是 @/components/ZsTencentMap/index.vue；对全局组件再写局部 import 引入会被静态分析的假路径
- 与已知「Unknown custom element 时用 import.meta.glob 全局注册修复」(#529/#553) 反方向，属不同根因

## 解决方案
- 模板用全局注册标签（zs-* 小写）时，删除多余的本地 import 与 components 注册，与 venueDialog.vue 等写法对齐
- 排查此类报错先核对组件真实目录，再确认是否已全局注册

## 验证与归属
- 来源会话 0ce851e8：ParcelDialog.vue 与 BaseProjectForm.vue 错误 import 不存在的 zsTencentMap 路径，删除后错误消失
- 涉及文件：ParcelDialog.vue、ZsTencentMap/index.vue、src/main.js
- 所属项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "zs_global_import_ban",
  "source_extraction_id": "d6fff46e82c345f0a1fd71b1f6da4fd9",
  "version": 1,
  "memory_type": "entities"
}
-->