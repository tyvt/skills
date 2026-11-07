# .list-container 高度塌陷技术模式
自定义「左树+右列表」两栏布局页面在全局 .list-container 高度规则变更时右列塌陷的可复用技术模式。

## 问题根因
- zhi2-web-admin 用户管理页 src/views/system/user/index.vue 为自定义「左部门树+右用户列表」两栏布局
- 右列靠 .main-box-right{height:100%} 撑开，依赖 .list-container 有确定高度
- 提交 2801389aa 去掉全局 .list-container 的 height:calc(100vh-120px)，仅对 :has(> .region-tree-layout) 页面保留
- 本页非标准区域树布局，容器高度塌陷，右列 height:100% 解析约为 0
- 搜索表单+操作按钮+用户表格整体被压扁不可见（左侧树正常），表现为「不显示用户」

## 修复方案
- 在本页 <style scoped> 补回 .list-container{height:calc(100vh-120px);overflow:hidden;}
- 恢复改动前状态；实测未修复容器73px/右列73px/表格21px，修复后680/684/632px
- 涉及提交：子模块 4a3342506 + 合并 cb854ea7b，主仓库指针 7a93899，均已推送 develop/v2.6.1

## 通用教训
- 凡自定义 .list-container 两栏/定高布局页面，全局 .list-container 高度规则变更会使其右侧列 height:100% 塌陷
- 此类页面需自带 scoped 高度或改用 region-tree-layout 布局

## 涉及文件与来源
- 文件：zhi2-web-admin/src/views/system/user/index.vue
- 来源：无锡市区G 会话（2026-11-05）
- 发布 tag：父仓库 无锡市区G `202611051818`（仅父仓打 tag，子模块不打）
- 禅道：bug 6245「用户管理不显示用户数据」已回写 status=resolved

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_container_collapse",
  "source_extraction_id": "3e5a9faa2d89494b8d41a3f53e2d3b2b",
  "version": 2,
  "memory_type": "entities"
}
-->