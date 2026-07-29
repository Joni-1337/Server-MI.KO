import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const safeRoot = process.env.MIKODEV_DEV_DIR ?? "C:\\dev\\mikodev-dev";

function hasExclamation(dir) {
  try {
    return dir.includes("!") || fs.realpathSync(dir).includes("!");
  } catch {
    return dir.includes("!");
  }
}

function run(command, args, cwd, { allowRobocopy = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else if (allowRobocopy && code !== null && code < 8) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function syncProject() {
  fs.mkdirSync(safeRoot, { recursive: true });

  const excludes = [".next", "node_modules", ".git"];
  const args = [
    projectRoot,
    safeRoot,
    "/MIR",
    ...excludes.flatMap((name) => ["/XD", name]),
    "/NFL",
    "/NDL",
    "/NJH",
    "/NJS",
    "/nc",
    "/ns",
    "/np",
  ];

  console.log(`\n→ Синхронизация проекта в ${safeRoot}`);
  await run("robocopy", args, projectRoot, { allowRobocopy: true });

  const envLocal = path.join(projectRoot, ".env.local");
  if (fs.existsSync(envLocal)) {
    fs.copyFileSync(envLocal, path.join(safeRoot, ".env.local"));
  }

  const nodeModules = path.join(safeRoot, "node_modules");
  if (!fs.existsSync(nodeModules)) {
    console.log("\n→ Установка зависимостей (первый запуск)...");
    await run("npm", ["install"], safeRoot);
  }
}

async function main() {
  if (hasExclamation(projectRoot)) {
    console.log("\n⚠ В пути проекта есть «!» — Webpack не поддерживает такой путь.");
    console.log("  Запуск через безопасную копию (изменения синхронизируются при каждом npm run dev).\n");
    await syncProject();
    console.log("\n→ Next.js dev server\n");
    await run("npm", ["run", "dev:direct"], safeRoot);
    return;
  }

  await run("npm", ["run", "dev:direct"], projectRoot);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
