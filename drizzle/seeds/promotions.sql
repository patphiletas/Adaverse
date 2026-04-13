INSERT INTO promotions (name, start_date) VALUES
  ('Frida', '2023-09-01'),
  ('Grace', '2024-02-01')
ON CONFLICT (name) DO NOTHING;
