# Personnel Certificate Entity
The Suzhou Housing personnel main tables do not store certificate fields; certificates live in a separate T_PERSONNEL_CERTIFICATE entity.

## Description
- Personnel main tables T_PERSONNEL_RECORD, T_PERSONNEL_APPLY, T_PERSONNEL have no CERTIFICATE_TYPE / CERTIFICATE_CODE columns.
- Certificate data lives in separate entity T_PERSONNEL_CERTIFICATE with CERTIFICATE_TYPE, CERTIFICATE_CODE, CERTIFICATE_NAME, PERSONNEL_ID.

## Significance
- Frontend bug #6417 root cause: AgencyPersonnelDetail.vue loadDetail did not backfill certificateType/certificateCode from the certificate entity, so saved detail showed '-'.
- Fix backfills from top-level personnel/data fields or first valid certificateList item; this contract is a common-error pitfall for detail rendering.


<!-- MEMORY_FIELDS
{
  "category": "data_model",
  "name": "personnel_certificate_entity",
  "source_extraction_id": "ab4b9c5383674e7ba87984c9784f448b",
  "version": 1,
  "memory_type": "entities"
}
-->