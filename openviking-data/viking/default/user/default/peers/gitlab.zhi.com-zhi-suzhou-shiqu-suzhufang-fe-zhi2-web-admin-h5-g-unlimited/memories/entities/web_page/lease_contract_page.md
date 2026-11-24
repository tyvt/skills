# 其他租赁合同 (Other Lease Contracts page)
A list page in the Suzhufang admin front end that shows other lease contracts together with four action buttons.
## Permissions
- Base permission prefix: `benefit:pubRevenueContract`.
- Buttons and characters: 忽略预警 = `ignore`, 新增既有合同维护 = `already`, 删除 = `remove`, plus 新增.
- From 2026-11-24 the 新增 button uses its own character `benefit:otherRevenueContract:add` through `extraPerms.add`; the other three buttons and the prefix are unchanged.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "web_page",
  "name": "lease_contract_page",
  "source_extraction_id": "988798ff7e4b4ac2bd1b3aa16ff2890c",
  "version": 1,
  "memory_type": "entities"
}
-->