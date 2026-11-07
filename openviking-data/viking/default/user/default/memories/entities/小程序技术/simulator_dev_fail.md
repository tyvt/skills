# 模拟器启动失败因导入dev产物主包超限
苏住房C微信开发者工具模拟器启动失败、页面路径为空，因导入dev产物且主包超2048KB，并非代码问题。

## 问题现象
- 开发者工具一打开模拟器就失败、页面路径显示为空，提示「清除工具及手机授权数据失败 [object Object]」
- 用户怀疑代码报错，实际是dist被删后退查dev产物主包约4095KB超2048KB上传限制

## 根因
- 生产构建产物苏住房C/dist不存在，体积脚本退查dev产物dist/dev/mp-weixin主包4095KB超限
- 「清除工具及手机授权数据失败」是微信开发者工具清缓存自身缺陷，失败时只显[object Object]导致旧产物未清

## 解决方案
- 先npm run build生成生产产物（主包2037.3KB过validate-dist），日常开发导入dist/dev/mp-weixin，模拟器/上传导入苏住房C/dist，绝不导入源码或dev产物
- 手动清缓存：关工具删%APPDATA%\Tencent\微信开发者工具\Default Cache下Simulator_*与BaseLib；本地设置勾选4M上限
- 排查提问固定看「编译面板」红色报错而非Console

## 验证与归属
- 验证：会话73fa7d59用户报模拟器失败附清除失败提示，定位dist删→dev产物4095KB超限制；重建主包2037.3KB通过；给手动清缓存与目录分工表
- 涉及文件：src/pages_vote/elect/ResultRecord.vue、src/pages_vote/decision、src/pages_transaction/intention
- 所属项目：苏住房C；来源会话ID：73fa7d59-b87a-43f4-8979-be31b7024446；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "simulator_dev_fail",
  "source_extraction_id": "1d9fd369a2874e6797cb9e988e9c0653",
  "version": 1,
  "memory_type": "entities"
}
-->