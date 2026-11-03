# sprite.svg合并冲突修复
合并至 develop/v2.6.2-yulin 时 public/assets/images/sprite.svg 因分支删除状态不一致产生冲突，按 develop/v2.6.2 已删该文件的方式解决。

## 现象
- 合并 develop/v2.6.2-yulin 时 public/assets/images/sprite.svg 出现冲突
- 修改完成后存于本地分支，未推送远程

## 根因
- develop/v2.6.2 已删除该文件而 yulin 分支仍有修改
- 两分支对该文件的删除/修改状态不一致导致 git 合并冲突

## 解决方案
- 按 develop/v2.6.2 的方式删除 public/assets/images/sprite.svg 并完成合并
- 涉及 article 组件多个 detail.vue 及 HeadTitle/index.vue

## 验证与归属
- 验证证据：园区物管2.0/031.md
- 涉及文件：zhi2-web-admin/src/views/article/components/enums.js、article/richTextTwo/detail.vue、article/components/detail.vue、article/problem/detail.vue、article/video/detail.vue、components/HeadTitle/index.vue
- 所属项目：园区物管2.0
- 来源会话：bd038b9a-ef1f-4ba3-bb80-f6ee7869d3ac；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "版本控制",
  "name": "sprite_svg_merge_conflict",
  "source_extraction_id": "5336140ca3d7438dbc51c1ec0fc6e624",
  "version": 1,
  "memory_type": "entities"
}
-->