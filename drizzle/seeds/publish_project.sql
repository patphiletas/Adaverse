UPDATE student_projects
SET "publishedAt" = NOW()
WHERE id = 1
  AND "publishedAt" IS NULL;
