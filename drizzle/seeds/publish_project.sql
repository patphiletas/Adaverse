UPDATE student_projects
SET published_at = NOW()
WHERE id = 1
  AND published_at IS NULL;
