# 上传组件四类边界缺陷修复
zs-upload 需修正 5MB 边界、单对象回显、扩展名大小写、在途计数收敛四处异常路径问题。

## 问题现象
- 体积校验用 `<` 致正好 5MB 文件被拒
- 回显按数组处理，接口返单对象时显示不出
- 扩展名匹配区分大小写，.JPG/.Pdf 判非法
- 在途上传计数不收敛，失败/并发后计数残留致后续上传被拦

## 解决方案
- 体积校验写 `size <= 5 * 1024 * 1024` 或统一常量+明确比较符
- 回显兼容单对象/数组：`const list = Array.isArray(data) ? data : (data ? [data] : [])`
- 扩展名校验先 toLowerCase() 再比允许列表（jpg/jpeg/png/pdf…）
- 上传计数必须在 finally 统一递减，失败/超时/取消都走到；禁用按钮基于在途数>0 而非曾发起

## 验证与归属
- 验证：会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189 交付记录「上传组件：5MB 边界 <=、单对象回显、扩展名大小写匹配、在途上传计数与失败收敛」
- 涉及文件：zhi2-web-admin/src/components/zs-upload/zs-upload.vue、zhi2-web-admin/src/views/flood/components/CheckPage.vue
- 所属项目：zhi2-web-admin（防汛）；来源会话：session-9126d917-b8a3-4db0-b250-80e5b6c5d189；代码基线：c35a24a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_upload_fixes",
  "source_extraction_id": "930bccb7cb144d8c9eea94018298599d",
  "version": 1,
  "memory_type": "entities"
}
-->