# 门户 G 端 admin 首页业务板块为空排查
门户登录后首页中间业务板块显示「暂无可办理的业务板块」且为对内 admin 布局时的根因与排查约定。

## 根因
- 根因通常是 POST /portal/menu/listPerms 返回的权限里没有任何 portal:bizSection:{functionCode}
- homeDataMixin 用 perms.includes('portal:bizSection:'+flow.functionCode) 得到 authorizedSectionCodes；三码为 commodityHouseTrade、secondHandHouseTrade、housingRental
- resolveHomeLayoutVariant 在 G 端（terminalType A/G）、无 kfqy_/jjjg_/zljg_ 等企业角色时走 admin
- homeLayout.mergeBusinessFlows 在 admin 下只保留有权限的板块，permitted 为空则 businessFlows=[]

## 排查要点
- 排查权限配置，勿误查统计/常用功能接口
- 右侧常用功能、顶部 4 项统计不依赖业务板块权限，有内容属正常

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：账号 6001164（相城区）界面为 admin 版，中间三大板块被前端全部过滤；右侧常用功能、顶部统计不依赖业务板块权限
- 涉及文件：zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；代码基线：8c17ba3；来源会话：954a92a5-1315-448d-9cd7-528b5055b21c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "门户G端admin业务板块为空排查",
  "source_extraction_id": "62fc301bc6864bb894572ac62ef8afce",
  "version": 1,
  "memory_type": "entities"
}
-->