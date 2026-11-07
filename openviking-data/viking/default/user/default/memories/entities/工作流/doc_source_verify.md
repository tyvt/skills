# 公共组件手册源码核对工作流
编写公共组件使用手册前必须逐条按当前源码核对，文档常量可能早已不存在，目录可能空，链接需用 Test-Path 验存在性。

## 为什么
- 本仓库文档/注释存在历史残留，照抄会把不存在的东西写进新人手册（如旧弹窗宽度、已删除常量）。
- 目录存在不等于组件可用，参考分支有而本项目没有的组件易误写进可用表。

## 怎么做
- 手册内容一律以当前源码为准，历史提交只解释规则来源不照抄；失效结论保留并标注「当前源码无对应实现」。
- 每个目录确认有实际文件，0 文件只写「用途待确认」；参考分支组件逐个确认后单独成行，不列进可用表。
- 文档每条路径链接用 Test-Path 逐个校验存在性，最终报告 missing=0；写文档会话只写文档不改源码不跑构建。

## 验证与归属
- 验证证据：会话 57d32ce3-0078-4c6c-a983-06789d92189c（基线 a86bf95）产出 components-guide.md 22390 字节、8 章 5 表 54 链接、Test-Path missing=0。
- 涉及文件：docs/frontend/components-guide.md、zhi2-web-admin/src/components/README.md、zs-dialog.vue、variables.css。

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "doc_source_verify",
  "source_extraction_id": "23a9b1295c4141a4940596bbc58ceafc",
  "version": 1,
  "memory_type": "entities"
}
-->