--Create Application Process
-- Point - Ajax Callback

BEGIN
  DELETE FROM apex_form_drafts
  WHERE  app_id   = :APP_ID
  AND    page_id  = :APP_PAGE_ID
  AND    app_user = :APP_USER;
  COMMIT;

  apex_json.open_object;
  apex_json.write('status', 'cleared');
  apex_json.close_object;
END;
