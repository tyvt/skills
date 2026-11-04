# 小区公告粘贴图片自动上传
园区V0 小区公告新增粘贴图片自动上传能力，将 base64 转为 FormData 上传到现有接口，单张上限 10MB。

## 实现方式
- 粘贴图片后在 afterPasteCallback 里把图片转成 FormData 上传到 version/1/i.froala.com/upload
- 上传成功正文只保留服务器 URL，避免 base64 膨胀触发「请更新到最新版本」
- 走 multipart 二进制上传，比 base64 表单提交更省体积

## 修改文件
- 新增 policy/js/policy_froalaPasteUpload.js：粘贴自动上传逻辑，单张上限 10MB，失败弹提示
- 更新 policy_SmPolicyCommunityRecordAdd.shtml（新增页）
- 更新 policy_SmPolicyCommunityRecordEdit.shtml（编辑页）

## 使用与验证
- 部署后在「新增/修改小区公告」Ctrl+V 粘贴图片自动上传替换链接；工具栏插入图片同接口
- 单张超 10MB 提示「图片大小不能超过 10MB」
- 所属项目：园区V0；来源会话ID：5e09b260-67d2-4210-bc34-31daca30276b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "froala_paste_upload",
  "source_extraction_id": "3b01b994d2274aec966ad5632121ebeb",
  "version": 1,
  "memory_type": "entities"
}
-->