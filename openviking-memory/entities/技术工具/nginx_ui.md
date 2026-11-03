# nginx UI
nginx-ui 是本地前端项目部署管理程序，运行于 D:\nginx-ui，Web 端口 9000。
## 部署架构
- 站点模型：sites-available/<名称> 存配置 + sites-enabled/<名称>.conf 软链接
- 站点登记库：D:\nginx-ui\database.db 的 sites 表，path 指向 sites-available 文件
- 配置目录指向 D:/nginx/conf，真实 nginx 运行于 D:\nginx
- 启用状态由 sites-enabled 目录文件存在性判断，不仅靠数据库字段
## 关键事实
- 全局规则要求所有前端项目统一通过 nginx UI 创建部署，禁止手工写 sites-enabled 实体文件
- 手工建站会导致 UI 面板看不到该站点（数据库无记录），但 nginx 仍加载生效
- 可用 auth_tokens 表有效 token 访问 API（端口 9000）/api/sites 列出站点
## 已知站点
- UI 已登记 10 个：苏州市房地产监测V3、产品2.0、苏州市房地产监测、太仓一网通办H5、门户、惠山物管V1、苏住房G、江阴智慧物业H5、昆山物管、苏州市房地产监测V3-bug6073

<!-- MEMORY_FIELDS
{
  "category": "技术工具",
  "name": "nginx_ui",
  "source_extraction_id": "ba60ef6d565b491cbf2d548c42ebd22e",
  "version": 1,
  "memory_type": "entities"
}
-->