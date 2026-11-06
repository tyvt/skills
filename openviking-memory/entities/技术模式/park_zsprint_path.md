# ZsPrint打印路径相对化修复
园区公共收益项目zhi2-web-admin的ZsPrint组件修复了子目录部署下打印打开路径丢失部署前缀的问题。

## 问题根因
- 打印（Word模板，printWay==2）时接口返回的data是站内绝对路径，原代码用window.origin拼接：window.open(`${window.origin}${res.data}`)
- 在子目录部署（如https://domain.com/sz/）时会跳到https://domain.com/zhjz/...，而非https://domain.com/sz/zhjz/...

## 修复要点
- 改用项目已有的resolveServerAssetUrl，按当前页面地址解析相对路径，子目录部署自动带上正确前缀
- window.open(resolveServerAssetUrl(res.data))；该工具在附件预览、图片加载等场景已广泛使用，行为一致

## 涉及文件
- zhi2-web-admin/src/components/ZsPrint/index.vue
- 涉及路径：d:\repository\园区公共收益\zhi2-web-admin\src\utils\resolveServerAssetUrl.js、d:\repository\园区公共收益\zhi2-web-admin\src\api\system.js

## 验证与归属
- 所属项目：园区公共收益；来源会话：23bed992-7395-4a7a-9fa6-d6b2cbf58e24；验证证据：extracted source=cursor project=园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "park_zsprint_path",
  "source_extraction_id": "a1f19bf299fc4ba097b3d4df83e400e1",
  "version": 1,
  "memory_type": "entities"
}
-->