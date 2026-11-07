- In `src/constants/companyOrgan.js`, define `COMPANY_ADMIN_BUS_CODE_BY_ORGAN_TYPE` and `COMPANY_ADMIN_CHANGE_BUS_CODE_BY_ORGAN_TYPE` lookup tables and implement `resolveCompanyAdminBusCode`/`resolveCompanyAdminChangeBusCode` as table lookups by organization type.
- Add `resolveCompanyAdminContextBusCode(route, organType, isChange)` to match by menu `meta.busCode` and context, falling back to organization-type lookup; complete lease `filePath` and route path inference.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "admin_bus_code_lookup",
  "source_extraction_id": "e200e187630443f8843d3946fdef9396",
  "version": 1,
  "memory_type": "preferences"
}
-->