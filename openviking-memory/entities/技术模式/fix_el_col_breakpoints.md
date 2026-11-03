# 无断点 el-col 批量补全脚本
zhi2-web-admin 提供脚本为缺失全部断点的 <el-col> 统一补全响应式列宽。
## 问题描述
- 全局要求所有没有任何 xs/sm/md/lg/xl 的 `<el-col>` 统一响应式列宽
- 已有任意一个断点的 col 不改
## 规则
- 仅当五个断点属性全部缺失时补 `:xs="24" :sm="12" :md="12" :lg="8" :xl="8"`
## 解决方案
- 在 zhi2-web-admin 根目录执行 `node scripts/fix-el-col-breakpoints.mjs` 扫描 src 及 assets
- 新增页面漏补后可重复跑脚本
## 验证与归属
- 涉及文件：zhi2-web-admin/scripts/fix-el-col-breakpoints.mjs
- 所属项目：2-0；代码基线：none
- 验证证据：会话 48486a6a 用户要求无断点补 xl:8,lg:8,md:12,sm:12,xs:24，脚本更新约 294 个 Vue 文件
- 来源会话ID：48486a6a-ae40-4b6f-b0ae-edefd27a389c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fix_el_col_breakpoints",
  "source_extraction_id": "02b92ee3ef8445aa8281fd7042ea17fa",
  "version": 1,
  "memory_type": "entities"
}
-->