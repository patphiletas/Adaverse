// fetch-contributors-frida.mjs
// Récupère les contributeurs GitHub pour tous les projets Frida sans contributeurs
// Usage : node scripts/fetch-contributors-frida.mjs

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function fetchContributors(githubUrl) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    { headers: { "User-Agent": "adaverse-script" } }
  );

  if (!res.ok) {
    console.warn(`  ⚠️  ${repo} → HTTP ${res.status}`);
    return null;
  }

  const text = await res.text();
  if (!text || text.trim() === "") return null;
  let data;
  try { data = JSON.parse(text); } catch { return null; }
  const logins = data
    .map((c) => c.login)
    .filter((login) => login !== "github-classroom[bot]");

  return logins.join(", ") || null;
}

async function main() {
  await client.connect();

  const { rows } = await client.query(`
    SELECT sp.id, sp.slug, sp."githubUrl"
    FROM student_projects sp
    JOIN promotions p ON p.id = sp."promotionId"
    WHERE p.name = 'Frida'
    AND (sp.contributors IS NULL OR sp.contributors = '')
    ORDER BY sp.id
  `);

  console.log(`${rows.length} projets Frida sans contributeurs\n`);

  let updated = 0;
  for (const row of rows) {
    process.stdout.write(`  ${row.slug} … `);
    const contributors = await fetchContributors(row.githubUrl);

    if (contributors) {
      await client.query(
        `UPDATE student_projects SET contributors = $1 WHERE id = $2`,
        [contributors, row.id]
      );
      console.log(`✓ ${contributors}`);
      updated++;
    } else {
      console.log("— aucun contributeur trouvé");
    }

    // Pause pour ne pas dépasser le rate limit GitHub (60 req/h sans token)
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\n✅ ${updated}/${rows.length} projets mis à jour`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
