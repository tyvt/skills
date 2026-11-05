# 用户管理列表空白高度塌陷排查
用户管理页右栏用户列表、搜索表单与操作按钮整体不可见，根因为全局 .list-container 高度被移除导致自定义两栏布局右侧塌陷。

## 根因
- 本页为自定义「左部门树 + 右用户列表」两栏布局，右侧列靠 .main-box-right { height: 100% } 撑开，依赖 .list-container 有确定高度
- 提交 2801389aa（列表外框高度随内容收缩）把全局 .list-container 固定高度 calc(100vh - 120px) 去掉，仅对 :has(> .region-tree-layout) 页面保留
- 本页非标准区域树布局，容器高度塌陷使右侧列 height:100% 解析为约 0，搜索表单、按钮、表格被压扁不可见

## 修复方案
- 在本页 style scoped 补回容器高度：.list-container { height: calc(100vh - 120px); overflow: hidden; }
- 该改动最小精准，等价于恢复 2801389aa 之前的状态

## 验证与归属
- verifier 实测：未修复时 .list-container 高 73px、右列 73px、表格区 21px（空白）；修复后 680px / 684px / 632px 正常渲染
- vite build 退出码 0，规则已编译进页面 chunk
- 修复提交 4a3342506 与合并 cb854ea7b 已推送 zhi2-web-admin develop/v2.6.1
- 涉及文件 src/views/system/user/index.vue；所属项目 无锡市区G；来源会话 2026-11-05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_list_blank",
  "source_extraction_id": "d537103301824c2381174d65dd5ba3dc",
  "version": 1,
  "memory_type": "entities"
}
-->