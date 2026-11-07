# git cherry-pick 合并冲突解决
git cherry-pick 出现 >>>>>> 合并冲突标记时需逐文件人工解决，不可直接提交。

## 解决方式
- git cherry-pick 出现 >>>>>> 合并冲突标记时需逐文件人工解决
- 示例：bug1122 首页功能模块登录弹框冲突需手动处理

## 验证与归属
- 验证证据：010.md 会话38c62c95(cherry-pick 3f96821 合并冲突解决)
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue
- 来源会话ID：38c62c95-b396-4f30-a971-710346d3c9c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "cherry_pick_conflict",
  "source_extraction_id": "d8600bf3c81e4e25b78224a443f65995",
  "version": 1,
  "memory_type": "entities"
}
-->