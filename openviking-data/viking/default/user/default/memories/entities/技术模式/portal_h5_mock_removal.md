# 门户H5移除mock代码
门户H5 项目移除 mock 逻辑并关闭测试打包 mock，应用列表与登录均走真实接口。

## 修改内容
- 新增 .env.test 配置 VITE_DATA_MODE=remote、VITE_API_BASE_URL=/api、VITE_PROJECT_ID=suzhufang，关闭 npm run test 的 mock 回落（默认 demo）
- 删除 src/pages/systems/index.vue 的 demoSystems 静态数据与所有 isRemote 分支，应用列表固定走 /apps 接口，跳转固定现取新票
- 删除 src/pages/login-design/index.vue 的 demo 模式假发码、假登录分支，密码登录统一提示走验证码登录
- 清理 src/utils/request.ts 注释
- 移除 .env / .env.example / .env.test 中的 VITE_DATA_MODE 配置项

## 验证与归属
- 验证：npm run test 构建成功（产物含 VITE_DATA_MODE:"remote"、无 demoSystems 引用）；npm run build 成功，src 内 isRemote/VITE_DATA_MODE 引用清零
- 涉及文件：src/pages/systems/index.vue、src/pages/login-design/index.vue、src/utils/request.ts、.env、.env.example、.env.test
- 所属项目：门户H5；来源会话：gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-mobile-admin-h5-b-unlimited；代码基线：none

## 提交记录
- 关闭测试mock：提交 0063c5d 推送 origin/main
- 删除mock代码：提交 49c2370 推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_h5_mock_removal",
  "source_extraction_id": "b0f3e84cf6da47f181eda9967ae5d0cd",
  "version": 1,
  "memory_type": "entities"
}
-->