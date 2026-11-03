# 苏住房C市民端网关文件上传契约
苏住房C市民端所有上传走苏服办网关专用上传接口，二进制multipart独立字段+精简header，禁止base64塞进biz_content。
## 契约要点
- 接口interface_id=szffluzm-wjsc、version=v2.1；api.file()/ImageUploader/ZsUploader/签字板复用同链路
- 文件通过formData.append(fileField, fileBlob, fileName)以二进制字段提交，biz_content只放业务参数JSON
- 上传header走独立buildUploadGatewayHeader，仅留zs-authorization、zs-path、zs-source三头
- 绝手动设Content-Type:multipart/form-data（boundary须运行时自动生成），httpInstance不再透传多余Authorization
## 错误根因
- 早期base64写进biz_content并带全套zs-sign/zs-param/zs-method头，网关期望不符
- 文件未进FormData时网关降级普通POST(szffluzm-whyhxx)报请求异常；传files而非file致config.file为undefined
## 同源适用
- 泰兴小程序/苏住房G若接苏服办网关，上传一律按此契约，不退base64
## 验证与归属
- 所属项目：苏住房C；来源会话ID：0b56ec32-ad5b-4d9a-918c-7580d24e744d；代码基线：e04432d
- 涉及文件：src/api/gateway.js、httpInstance.js、file.js、src/pages_owner/repair/add.vue

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gateway_upload_contract",
  "source_extraction_id": "81d7f40afe12428c8e47232291933096",
  "version": 1,
  "memory_type": "entities"
}
-->