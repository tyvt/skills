# 详情页新增态勿用 $get 根路径顺带取数
产品2.0（与苏房V3同源）中详情/新增页用 $get('/module/business/') 根路径顺带取数会被规范化层改写成 POST /add 空 body，导致报错。

## 现象
- 附件配置页点「新增」、用户管理页点「新增用户」，进详情页即报错；抓包见 body 为空的 POST /system/user/add、/file/appendixConfig/add

## 根因
- detail.vue 的 created 残留 this.$get('/system/user/') 等「只传资源根路径」写法顺带拉岗位/字典前置数据
- V3 请求规范化层把「GET + 资源根路径」识别成 CRUD 动作，改写成 POST /{module}/{business}/add，method 变但 body 仍空，后端报参数校验失败
- 区别于已知记忆 983「非白名单 GET 会被改写成 POST+body」：此处是最典型表现形态——新增页自动打 add 接口

## 修复做法
- 前置数据一律用明确业务接口（/system/role/roles、/system/config/getInitialPassword），禁止 $get('/module/business/') 根路径顺带取数
- 排查看 Network 是否出现 add/update/detail 后缀且 body 为空，命中即改
- 若调用仅为取模板未用字段（如岗位 postOptions）直接删掉；密码初始化改由 getInitialPassword 返回后赋值，避免与 initPassword 异步竞态

## 验证与归属
- 会话 4f365506/4d504758：附件配置与用户管理新增页均报传参为空，根因 $get('/system/user/') 被规范化 POST /system/user/add；删多余请求并改 getInitialPassword 回填密码后修复
- 涉及文件：tool/fjflpz/components/FjDialog.vue、system/user/detail.vue
- 所属项目：产品2.0；来源会话：4f365506-e3be-4779-92c3-618489cfe3e8, 4d504758-e807-4d71-ab92-00820c1154ef；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "detailpage_post_add",
  "source_extraction_id": "7d247f9850784ea7a807d834ba19fc05",
  "version": 1,
  "memory_type": "entities"
}
-->