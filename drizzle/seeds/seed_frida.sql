-- ============================================================
-- ADAVERSE — SEED PROMOTION FRIDA
-- 33 repos confirmés (source : adaverse_repos_grace_frida.pdf)
-- À exécuter dans Neon > SQL Editor
-- ============================================================


-- ------------------------------------------------------------
-- PROJETS ÉTUDIANTS — Promotion Frida
-- (tous non publiés par défaut : "publishedAt" = NULL)
-- ------------------------------------------------------------

INSERT INTO student_projects (title, slug, "githubUrl", "demoUrl", "promotionId", "adaProjectId") VALUES

  -- Adaverse (15 repos)
  ('Adaverse Florian Guillaume Xinzhu Ursula',  'adaverse-florian-guillaume-xinzhu-ursula',  'https://github.com/adatechschool/frida-adaverse-2-0-florian-guillaume-xinzhu-ursula',      '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Felix Matteo Vincent Yannick',     'adaverse-felix-matteo-vincent-yannick',     'https://github.com/adatechschool/frida-adaverse-2-0-felix_matteo_vincent_yannick',         '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Nasra Meriem Salem Abdel',         'adaverse-nasra-meriem-salem-abdel',         'https://github.com/adatechschool/frida-adaverse-2-0-nasra-meriem-salem-abdel',             '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Alexis Samir Josephine Sofia',     'adaverse-alexis-samir-josephine-sofia',     'https://github.com/adatechschool/frida-adaverse-2-0-alexis-samir-josephine-sofia',         '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse PEYREGuillaume34',                 'adaverse-peyregui34',                       'https://github.com/adatechschool/frida-adaverse-PEYREGuillaume34',                         '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse ValotKzm',                         'adaverse-valotkzm',                         'https://github.com/adatechschool/frida-adaverse-ValotKzm',                                 '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse ThePhenixBlack',                   'adaverse-thephenixblack',                   'https://github.com/adatechschool/frida-adaverse-ThePhenixBlack',                           '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Mamoru',                           'adaverse-mamoru-fr',                        'https://github.com/adatechschool/frida-adaverse-Mamoru-fr',                                '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Sosow20',                          'adaverse-sosow20',                          'https://github.com/adatechschool/frida-adaverse-Sosow20',                                  '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Niouk971',                         'adaverse-niouk971',                         'https://github.com/adatechschool/frida-adaverse-Niouk971',                                 '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Abdelcrks',                        'adaverse-abdelcrks',                        'https://github.com/adatechschool/frida-adaverse-Abdelcrks',                                '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Samir3200',                        'adaverse-samir3200',                        'https://github.com/adatechschool/frida-adaverse-Samir3200',                                '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse FPrud',                            'adaverse-fprud',                            'https://github.com/adatechschool/frida-adaverse-FPrud',                                    '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse VincentComier',                    'adaverse-vincentcomier',                    'https://github.com/adatechschool/frida-adaverse-VincentComier',                            '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),
  ('Adaverse Xinzhu99',                         'adaverse-xinzhu99',                         'https://github.com/adatechschool/frida-adaverse-Xinzhu99',                                 '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaverse')),

  -- Ada Check Event (2 repos)
  ('Ada Check Event Josephine Sofia',           'adacheckevent-josephine-sofia',             'https://github.com/adatechschool/frida-adaCheckEvent-Josephine-Sofia',                     '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Check Events')),
  ('Ada Check Event Ursula Florian',            'adacheckevent-ursula-florian',              'https://github.com/adatechschool/frida-paris-projet-AdaCheckEvent--ursula_florian',        '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Check Events')),

  -- Adataviz (5 repos)
  ('Adataviz Iris Xinzhu Abdel',                'adataviz-iris-xinzhu-abdel',                'https://github.com/adatechschool/frida-paris-dataviz-iris_xinzhu_abdel',                   '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adataviz')),
  ('Adataviz Florian Meyko Matteo',             'adataviz-florian-meyko-matteo',             'https://github.com/adatechschool/frida-paris-dataviz-florian-meyko-matteo-1',              '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adataviz')),
  ('Adataviz Sofia Samir Salem',                'adataviz-sofia-samir-salem',                'https://github.com/adatechschool/frida-paris-dataviz-sofia-samir-salem',                   '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adataviz')),
  ('Adataviz Josephine Vincent Nasra',          'adataviz-josephine-vincent-nasra',          'https://github.com/adatechschool/frida-paris-dataviz-josephine-vincent-nasra',             '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adataviz')),
  ('Adataviz Felix Ursula Guillaume',           'adataviz-felix-ursula-guillaume',           'https://github.com/adatechschool/frida-paris-dataviz-projet-api-felix_ursula_guillaume',   '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adataviz')),

  -- Ada Quiz (5 repos)
  ('Ada Quiz Jofexin',                          'adaquiz-jofexin',                           'https://github.com/adatechschool/frida-quiz-jofexin',                                      '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Quiz')),
  ('Ada Quiz Ursula Matteo Samir',              'adaquiz-ursula-matteo-samir',               'https://github.com/adatechschool/frida-quiz-quizz_ursula-matteo-et-samir',                 '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Quiz')),
  ('Ada Quiz Vincent Iris Guillaume',           'adaquiz-vincent-iris-guillaume',            'https://github.com/adatechschool/frida-quiz-vincent_iris_guillaume',                       '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Quiz')),
  ('Ada Quiz Sofia Salem Florian',              'adaquiz-sofia-salem-florian',               'https://github.com/adatechschool/frida-quiz-sofia_salem_florian',                          '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Quiz')),
  ('Ada Quiz Meyko Nasra Abdel',                'adaquiz-meyko-nasra-abdel',                 'https://github.com/adatechschool/frida-quiz-meyko-nasra-abdel',                            '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Ada Quiz')),

  -- Adaopte (3 repos)
  ('Adaopte Josephine Goursaud',                'adaopte-josephinegoursaud',                 'https://github.com/adatechschool/frida-adaopte-adaence-josephinegoursaud',                 '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaopte')),
  ('Adaopte Xinzhu99',                          'adaopte-xinzhu99',                          'https://github.com/adatechschool/frida-adaopte-adaence-Xinzhu99',                          '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaopte')),
  ('Adaopte Sosow20',                           'adaopte-sosow20',                           'https://github.com/adatechschool/frida-adaopte-adaence-Sosow20',                           '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaopte')),

  -- Adaction (3 repos)
  ('Adaction Sophia Ursula Xinzhu',             'adaction-sophia-ursula-xinzhu',             'https://github.com/adatechschool/frida-adaction-sophia_ursula_xinzhu',                     '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaction')),
  ('Adaction Vincent Iris Guillaume',           'adaction-vincentirisguillaume',             'https://github.com/adatechschool/frida-adaction-vincentirisguillaume',                     '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaction')),
  ('Adaction Samir Meriem Josephine',           'adaction-samirmeriemjosephine',             'https://github.com/adatechschool/frida-adaction-samirmeriemjosephine',                     '', (SELECT id FROM promotions WHERE name = 'Frida'), (SELECT id FROM ada_projects WHERE name = 'Adaction'))

ON CONFLICT (slug) DO NOTHING;
