# 清理src/api死代码判定口径
园区物管2.0 中清理 src/api 死代码的唯一口径是全量扫描 import/require 引用，页面存在不代表 api 模块被引用。

## 问题根因
- 清理 zhi2-web-admin/src/api 下未被引用文件，删掉 191/253 个，其中不少（如 pubExpenditureContract.js）对应业务页面仍在线上使用
- 本项目的页面有两种调接口方式：import 具体 api 模块，或用 businessName + 通用 request 直接拼路径调接口
- 后者不会 import api 文件，因此「该业务的页面存在」不能作为 api 模块被引用的证据，反之 api 模块存在也不代表被引用

## 解决方案
- 判定 api 文件是否死代码的唯一口径是全量扫描 src 下 .vue/.js/.ts 文件中对 @/api/... 的 import/require 引用，而不是按业务模块名对应关系推断
- 保留 index.js（请求基础封装）与确实被引用的模块
- 删除前先做引用扫描脚本（scripts/find-unused-api.cjs），并告知用户可 git 还原兜底
- 清理这类文件时不要顺手删业务页面

## 验证与归属
- 验证：253→62 个文件，明确「页面通过 businessName + 通用 request 直接调接口，并未 import 这些 API 模块，因此属于死代码」
- 涉及文件：zhi2-web-admin/scripts/find-unused-api.cjs、zhi2-web-admin/src/api
- 所属项目：园区物管2.0；代码基线：已知 #788 记录用户删除 api 文件「按模块点名」偏好，但「页面存在不代表 api 被引用」判定口径未记录；来源会话：4dcb3aac-8c69-43f1-a70b-6dfffc8c42c7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_deadcode_judgment",
  "source_extraction_id": "21155a3ba2ee488fb8dc6fd1a92e34f7",
  "version": 1,
  "memory_type": "entities"
}
-->