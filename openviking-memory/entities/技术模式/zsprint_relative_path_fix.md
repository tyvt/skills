# ZsPrint打印路径相对化修复
苏住房G项目zhi2-web-admin的ZsPrint组件修复了子路径部署下打印打开路径丢失部署前缀的问题。

## 问题根因
- 打印时用window.origin拼接路径，在/test/等子路径部署下会丢失部署前缀（如变成https://szf.szzfcjj.cn/zhi2-test/...而非https://szf.szzfcjj.cn/test/zhi2-test/...）

## 修复要点
- Word模板打印（printWay==2）：window.open(`${window.origin}${res.data}`)改为window.open(resolveServerAssetUrl(res.data))
- HTTP模板地址：同样通过resolveServerAssetUrl解析再拼接token等参数
- 与项目中其他资源下载（回单凭证、对账文件等）处理方式一致，根据当前页面部署目录自动拼出正确路径
- 开户申请详情页打印按钮走operation-btn-group→zs-print，该修改一并生效

## 涉及文件
- zhi2-web-admin/src/components/ZsPrint/index.vue
- 涉及路径：d:\repository\苏住房G\zhi2-web-admin\src\views\benefit\pubRegulatoryAccount、system\regionBankAuth等

## 验证与归属
- 所属项目：苏住房G；来源会话：a423ec75-91b1-4249-9830-1fd5d9f6e665；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsprint_relative_path_fix",
  "source_extraction_id": "fe0d6d2b918c4a599f472aedc212ae79",
  "version": 1,
  "memory_type": "entities"
}
-->