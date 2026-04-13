INSERT INTO ada_projects (name) VALUES
  ('Ada Quiz'),
  ('Adapage'),
  ('Adataviz'),
  ('Adashboard'),
  ('Adalgo'),
  ('Adaverse'),
  ('Ada Check Event'),
  ('Adaopte'),
  ('Adaction'),
  ('Adaskill'),
  ('Adatabase'),
  ('AdaPatisserie'),
  ('Projet fil rouge')
ON CONFLICT (name) DO NOTHING;
