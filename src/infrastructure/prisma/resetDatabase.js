
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();

  try {
    // Delete all data from each table in the schema
    await prisma.user.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.save.deleteMany({});



    // Repeat for all tables in your schema

    console.log('All data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    throw new Error('Failed to delete data');
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });