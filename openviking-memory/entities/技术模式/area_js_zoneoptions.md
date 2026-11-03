# area.js getZoneNameByCode 读不存在的 this.zoneOptions
area.js 的 getZoneNameByCode 方法内部读取了本 mixin 及其依赖中根本不存在的 this.zoneOptions，任何调用路径都会抛出 TypeError。

## 问题根因
- getZoneNameByCode 内部读取 this.zoneOptions，但该属性在 area.js mixin 及其依赖里根本不存在
- 全仓近乎零引用，页面上不发作，躲过运行时与常规回归
- 直到逐行读源码或写文档时才暴露，属潜伏缺陷

## 影响与风险
- 下次有人「顺手用一下」该导出方法时会直接抛 TypeError: Cannot read properties of undefined
- 没被调用 ≠ 没问题，潜伏缺陷会在新调用方接入时爆掉

## 核对结论与上报
- 本项目核对 src/mixins 全部 18 个文件，产出 4 条待裁决结论（任务文本写 19 个文件但实际 18 个）
- bTerminalProjectMixin/approval 全仓零引用；area.js getZoneNameByCode 读不存在的 this.zoneOptions
- dialog-form-mode → dialogMode 映射无源码确证
- 核对结论已作为独立产出上报 Lead（session-dd2640d3），不直接改源码

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/mixins/area.js、bTerminalProjectMixin.js、approval.js、docs/frontend/mixins-guide.md
- 来源会话：session-dd2640d3-2200-4bc4-8109-659264d6ff88、207843bf-0a68-4693-b234-2fc82bfa727b；代码基线：a86bf95

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_js_zoneoptions",
  "source_extraction_id": "fbafd4fd1605421ead8749279bdeff62",
  "version": 1,
  "memory_type": "entities"
}
-->