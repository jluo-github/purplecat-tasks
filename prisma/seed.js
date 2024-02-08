const { PrismaClient } = require("@prisma/client");
const data = require("./mock-data.json");
const prisma = new PrismaClient();

async function main() {
 const clerkId = "user_2c1jnlc5WVzLI9bwy02t49ZJMEU";

 const tasks = data.map((task) => {
  return {
   ...task,
   clerkId,
  };
 });
 for (const task of tasks) {
  await prisma.task.create({
   data: task,
  });
 }
}
main()
 .then(async () => {
  await prisma.$disconnect();
 })
 .catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
 });
