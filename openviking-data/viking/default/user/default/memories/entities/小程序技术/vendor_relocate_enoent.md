# vendor依赖被relocate脚本删除引发ENOENT
苏住房C市民端(H5→微信小程序)构建产物因relocate脚本删除主包依赖导致ENOENT与__route__未定义。

## 问题现象
- zhi2-mobile-shimin改造为微信小程序后，开发者工具报ENOENT找不到dist/node-modules/z-paging/.../z-paging.wxss、@dcloudio/uni-ui/lib/uni-datetime-picker/...
- 连带出现__route__ is not defined，看似首页组件出错，实际与业务组件无关

## 根因
- 构建链上relocate-z-paging/relocate-datetime-picker脚本把z-paging、uni-datetime-picker从主包挪进分包并改引用路径
- common/vendor.js仍按主包路径引用这两份依赖，删掉主包副本后引用悬空，编译WXSS/WXML阶段抛ENOENT，路由初始化失败冒出__route__未定义

## 解决方案
- relocate脚本改为只做分包侧复制+路径修正，绝不删除主包里的z-paging/uni-datetime-picker
- 新增scripts/restore-main-vendor-deps.mjs，构建后检查主包是否缺依赖，缺失则从pages_main恢复
- 挂到vite.config.ts的closeBundle与npm run build链路，保证每次构建都跑
- 排查顺序固定为先看prod dist里vendor引用路径是否真实存在，不从业务组件图片/资源入手

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话87fe1c13控制台ENOENT指向dist/node-modules/z-paging/...与@dcloudio/uni-ui/lib/uni-datetime-picker/...；结论根因是relocate脚本删主包依赖而vendor仍引用主包路径；修复后z-paging.wxss存在于主包
- 涉及文件：zhi2-mobile-shimin/vite.config.ts、scripts/restore-main-vendor-deps.mjs、package.json
- 所属项目：苏住房C；来源会话ID：87fe1c13-6937-4a04-8752-5102a7dffe63；代码基线：8520c36

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "vendor_relocate_enoent",
  "source_extraction_id": "5eb3785fb5d541bfa8151d0735437bd1",
  "version": 1,
  "memory_type": "entities"
}
-->