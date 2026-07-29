import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const real = fs.realpathSync(cwd);

if (cwd.includes("!") || real.includes("!")) {
  console.error("\n❌ Webpack/Next.js не работает, если в пути папки есть символ «!».");
  console.error(`   Текущий путь: ${real}`);
  console.error("\n   Исправление: запустите fix-webpack-path.bat от имени администратора");
  console.error("   (переименует «Запущенные сайты!» → «Запущенные сайты»).\n");
  process.exit(1);
}
