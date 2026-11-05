# 苏服办人脸识别模块文件与信息源
无锡市区小程序嵌入H5中苏服办人脸识别无独立文档，核心逻辑分布在特定文件并由SDK支持。

## 信息来源
- 仓库内无独立Markdown文档专门描述苏服办人脸识别
- 信息主要来自代码注释、官方SDK源码（https://www.jszwfw.gov.cn/jmopen/jssdk/）及历史调试记录

## 核心文件
- `zhi2-mobile-admin-h5-c-unlimited\index.html`：加载官方SDK
- `zhi2-mobile-admin-h5-c-unlimited\src\utils\sfbFaceAuth.js`：封装 `callSfbLivenessFaceAuth()`
- `zhi2-mobile-admin-h5-c-unlimited\src\utils\h5Context.js`：token/appId读取与缓存
- `zhi2-mobile-admin-h5-c-unlimited\src\pages\face\fac...`：人脸识别页面相关

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：上述核心文件及SDK源码
- 所属项目：无锡市区小程序嵌入H5；来源会话：29e8fb63-fada-4c3c-a4c3-485a533bae2f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_auth_info",
  "source_extraction_id": "0a9fa37d68404f5d868ad49dae3ecd4d",
  "version": 1,
  "memory_type": "entities"
}
-->