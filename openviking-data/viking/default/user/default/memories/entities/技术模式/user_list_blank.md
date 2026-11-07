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

## 客测环境Chrome 109兼容问题（2026-11-06）
- 含高度修复的构建（合并提交 cb854ea7b，linux 构建于 2026-11-05 19:23）部署到客测环境 10.10.208.25 后，客户 Chrome 109.0.5414.120 仍显示右栏空白
- 排查中曾因部署包 scope 哈希（data-v-7a1f00d2）与本地 Windows 构建（data-v-92c0ed0c）不同而怀疑部署非最新；后经 body 标签 build-info 确认即为 cb854ea7b，哈希差异源于 Windows(CRLF) 与 linux(LF) 换行符不同
- 本地用 Playwright 加载同一份 dist 并 mock 接口，Chromium（134/153 内核）渲染完全正常：搜索表单、操作按钮、表格 2 行数据、分页均显示，.list-container 780px、.main-box-right 772px、子节点 2 个
- 客户使用搜狗浏览器（Sogou）访问即正常，判定为 Chrome 109 内核渲染兼容问题，非代码缺陷
- 可疑点：页面全局样式含 :has() 选择器，或百分比高度/flex 组合在 Chrome 109 下的表现差异；具体 CSS 未最终定位
- 高度修复（scoped .list-container）经评估有效且无害，作为兜底保留，不回退
- 处置建议（用户未最终选定）：① 进一步定位并改写不依赖浏览器版本的 CSS；② 保持现状并备注「客测环境需用搜狗/新版 Chrome 访问」
- 来源会话 2026-11-06；客户 Chrome 版本 109.0.5414.120

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_list_blank",
  "source_extraction_id": "c36f9f6ce15c45dd982367d9a7692e39",
  "version": 2,
  "memory_type": "entities"
}
-->