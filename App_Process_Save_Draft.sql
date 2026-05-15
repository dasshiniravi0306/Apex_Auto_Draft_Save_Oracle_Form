--Create Application Process
--Point : Ajax Callback

DECLARE
  l_data  CLOB := apex_application.g_x01;
BEGIN
  MERGE INTO apex_form_drafts d
  USING DUAL
  ON (
    d.app_id   = :APP_ID
    AND d.page_id  = :APP_PAGE_ID
    AND d.app_user = :APP_USER
  )
  WHEN MATCHED THEN
    UPDATE SET
      draft_data = l_data,
      updated_on = SYSTIMESTAMP
  WHEN NOT MATCHED THEN
    INSERT (app_id, page_id, app_user, draft_data)
    VALUES (:APP_ID, :APP_PAGE_ID, :APP_USER, l_data);

  COMMIT;

  apex_json.open_object;
  apex_json.write('status',  'saved');
  apex_json.write('savedAt', TO_CHAR(SYSTIMESTAMP, 'HH24:MI:SS'));
  apex_json.close_object;
END;
