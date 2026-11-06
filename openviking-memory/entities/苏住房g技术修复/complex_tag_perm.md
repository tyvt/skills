# 综合查询标签管理按钮权限
苏住房G(zhi2-web-admin) 在 publicQuery/complex/index.vue 为「标签管理」按钮补充了权限字符控制。

## 改动要点
- 新增 extraPerms 定义权限字符 property:complex:tagManage（拼接 permsPrefix）
- 按钮 attrs 中增加 permission: [this.perms.tagManage]，写法与「导出」按钮一致
- 需在后台菜单/权限管理配置该字符，否则有权限用户看不到按钮

## 涉及文件与归属
- 文件：publicQuery/complex/index.vue、mixins/listMixins.js
- 所属项目：苏住房G；来源会话：9be9f4ff-05e2-405b-8ad5-b23dec6b243f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "complex_tag_perm",
  "source_extraction_id": "d5476054ac4b4f1daec0866a22a1a876",
  "version": 1,
  "memory_type": "entities"
}
-->