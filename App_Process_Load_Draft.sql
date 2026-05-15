--Create Application Process

-- Point - Ajax Callback

DECLARE
  l_data  CLOB;
BEGIN
  BEGIN
    SELECT draft_data INTO l_data
    FROM   apex_form_drafts
    WHERE  app_id   = :APP_ID
    AND    page_id  = :APP_PAGE_ID
    AND    app_user = :APP_USER;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN l_data := NULL;
  END;

  apex_json.open_object;
  IF l_data IS NOT NULL THEN
    apex_json.write('hasDraft', TRUE);
    apex_json.write('data', l_data);
  ELSE
    apex_json.write('hasDraft', FALSE);
  END IF;
  apex_json.close_object;
END;
