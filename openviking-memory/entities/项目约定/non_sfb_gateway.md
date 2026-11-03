# 苏住房C非sfb分支物理移除苏服办网关
苏住房C同源复制出的非sfb分支必须物理清除苏服办网关逻辑，并在产物层验收而非仅靠代码diff。

## 问题现象
- zhi2-mobile-shimin从sfb同源复制出suzhou-shiqu-suzhufang-main-v2.1等非sfb分支后，运行时仍请求苏服办接口（gateway.do、ydzt.jszwfw.gov.cn）

## 根因
- 同源复制保留了苏服办分支的网关封装与.env.production的API base指向，用户明确非sfb分支必须清掉苏服办逻辑

## 解决方案
- grep gateway.do / jszwfw定位网关封装、请求拦截分支与env配置，一并删除恢复直连，API base回/api/v2.0
- 验收必须npm run build后对产物目录再grep同样关键字，确认dist无网关串
- 同源分支裁剪保留通用逻辑只固化分支差异值；默认关闭VConsole，仅devtool手动开启注入
- 按子模块提交先行、父仓库只更新指针提交，子模块打tag（如v2.1.0.17）并推送，部署用该tag对应dist

## 验证与归属
- 验证：会话05aecd01用户要求清除非sfb分支苏服办逻辑，产物检查无网关串、API base为/api/v2.0、VConsole默认关闭；子模块05b4b4f4+父仓0462ba4，tag v2.1.0.17
- 涉及文件：.env.production、src/main.ts、src/utils/vconsole.ts、package.json、build.sh
- 所属项目：苏住房C；来源会话ID：05aecd01-e33e-4233-a8fc-d63fe7665256；代码基线：db06361

<!-- MEMORY_FIELDS
{
  "category": "项目约定",
  "name": "non_sfb_gateway",
  "source_extraction_id": "1d9fd369a2874e6797cb9e988e9c0653",
  "version": 1,
  "memory_type": "entities"
}
-->