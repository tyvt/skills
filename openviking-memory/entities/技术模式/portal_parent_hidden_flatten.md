# 门户 listRouters 父 Layout 隐藏阻断扁平化
门户后端把菜单拆成多个 path:"/" 的 Layout 节点时，父 Layout hidden 须阻断 buildNavbarChildrenMenus 对 children 的扁平化。

## 现象
- 菜单管理标记父 Layout hidden、子路由 hidden:false 的详情页（如应用管理详情 application/:tableid）仍被推进侧栏且常排在最前
- 验证证据：用户贴 listRouters JSON，父 hidden:true、子 application/:tableid hidden:false，侧栏仍展示应用管理详情

## 根因与修复
- buildNavbarChildrenMenus（menuVisibility.js）仅用 isRouteHidden 判断子节点，忽略父 Layout 的 hidden:true
- 修复：父级路由 hidden 时不再扁平化其 children，与若依「隐藏目录下不进导航」一致
- 已在 buildNavbarChildrenMenus 增加父 hidden 时不扁平化 children
- 根治还需 listRouters 子节点 hidden/visible 与 sys_menu 一致

## 涉及文件
- zhi2-web-admin/src/utils/menuVisibility.js
- zhi2-web-admin/src/layout/components/Sidebar/index.vue

## 关联信息
- 所属项目：门户；来源会话 ID：92104882-f56a-49cf-931b-814063421ad6、f244d50e-db76-4027-b64b-fdc47bdf7a0c；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_parent_hidden_flatten",
  "source_extraction_id": "edf38fe4ee324ea4ba2b9502ab8058e8",
  "version": 1,
  "memory_type": "entities"
}
-->