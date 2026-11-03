# 从业人员待办按业务主体分流
同一「从业人员」有经纪备案与租赁报送两条链路，待办必须按业务主体分流，租赁走租赁报送详情且附件 busCode 用 zlcyryba。

## 问题背景
- 本项目「从业人员」一套业务代码两条主体链路：经纪机构（备案 busCode cyryba/jgcyryba）与住房租赁机构（报送 busCode zlcyryba）。
- 待办行只给业务类型不直接给路由，若跳转按泛称或备案菜单反查，会把租赁单导到备案页，页面能打开但数据错/附件空且不报错。

## 解决方案
- 将「业务主体→详情路由+接口+附件 busCode」收敛到一处映射（personnelRecordMenuConstants.js + personnel-record-menu-routes.json），跳转逻辑只查表。
- 租赁从业人员→/company/leasePersonnel/detail + 附件 busCode zlcyryba；经纪机构→备案详情 + jgcyryba/cyryba；两套详情接口与 busCode 按主体取不互用。
- 附件 busCode 不强制回退固定值，不同主体给各自编码，否则附件空或串单。
- 改完补 e2e 联调用例（如 e2e/zljg/lease-personnel-todo.spec.js）锁住「待办→租赁报送详情→附件可取」链。

## 验证与归属
- 验证证据：会话 session-75fe2027-6cc4-4094-9dce-dc3decb47360（基线 89e5947）用户诉求跳转错误，提交修复 ruoyi.js 与 e2e 用例两场景通过。
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js、src/api/company/personnelRecordMenuConstants.js、scripts/personnel-record-menu-routes.json、e2e/zljg/lease-personnel-todo.spec.js。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_todo_split",
  "source_extraction_id": "23a9b1295c4141a4940596bbc58ceafc",
  "version": 1,
  "memory_type": "entities"
}
-->