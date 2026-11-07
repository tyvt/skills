# docx 模板几何修复（预售单位/开户行）
苏住房项目 docx 模板（预售资金监管相关）的 document.xml 几何修复模式：块作用域替换避免 bankName 的 cy=386715 误伤 ligy 版 superviseDept 框同值，用 .NET ZipArchive 按原条目顺序重建 docx。

## 修复内容
- 「预售单位」：`测试开发企业_202610301124有限公司` 单行完整显示，不再截断「司」字
- 「开户行」：`中国工商银行股份有限公司北京怀柔支行` 折为两行完整显示，第一行不再压到右侧「预售资金监管账户」标签，第二行不与备注行冲突

## 技术要点
- 用 .NET ZipArchive 按原条目顺序重建 docx，写回 worktree 并自检
- 验证：Aspose 独立渲染（真引擎出 PDF + 同语义复制出 DOCX/PNG 用于视觉验证与占位残留检查），PDF 378KB、无占位残留
- 本机仅 Java 8，target/classes 为 Java 21 产物（class 65.0），故把引擎 Aspose 注册逻辑内联进 harness（纯反射，Java 8 可编译），不再依赖 target/classes

## 陷阱
- PowerShell Edit-Block 内 Write-Output 会污染函数返回值（输出流污染），导致 document.xml 头被加调试前缀（如「bank」4 字节）而文件损坏；须去掉函数内输出、从原始 zip 重新提取、加首尾完整性断言

## 归属与验证
- 所属项目：苏住房（预售资金监管文档模板）
- 来源会话：2026-11-06 会话，agent 自主完成
- 合入方式：重建于 origin/dev 基线（baf75e15），提交 5db26c36，fast-forward 合入 dev

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "docx_template_fix",
  "source_extraction_id": "0d53848d2d8544a3882624a8332b711c",
  "version": 1,
  "memory_type": "entities"
}
-->