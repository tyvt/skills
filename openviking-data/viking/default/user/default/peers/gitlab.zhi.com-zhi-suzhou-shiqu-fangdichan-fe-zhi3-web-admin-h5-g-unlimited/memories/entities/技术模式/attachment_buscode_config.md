# 附件业务码 busCode 命名与后端配置约定
园区房产 zhi3-web-admin-h5-g 附件组件依赖后端 T_APPENDIX_CONFIG 表的 BUS_CODE 配置，业务码命名需严格对齐。

## 命名规范
- 现有可用业务码均为小写拼音缩写：ysxksq=预售许可申请、xsbasq=现售备案申请、jjjgxx=经纪机构信息、jgjbxx=机构基本信息
- 预售资金四个详情页（监管主账户、监管账户、监管机构、监管协议）采用小写拼音缩写业务码：zfzjjgxx、zfzjzzh、zfzjzh、zfjgxy，已在提交 f9f10a393 落地
- 新增页面若使用大写英文名（如 MAIN_ACCOUNT）会与后端配置不匹配，永远拉不到要件数据
- 业务码必须与 T_APPENDIX_CONFIG.BUS_CODE 字段完全一致，否则返回空数组、显示"暂无附件"

## 配置现状
- T_APPENDIX_CONFIG 中预售资金相关（主账户、监管账户、监管机构、监管协议）四个 busCode 配置数均为 0
- 此为业务侧待配置项，非前端代码缺陷；前端 AppendixPackageSection 行为正常

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachment_buscode_config",
  "source_extraction_id": "4fc07c171e674656967b133bd938014a",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->