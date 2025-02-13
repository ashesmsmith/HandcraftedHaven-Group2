import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { accounts, products, orders, order_products, reviews } from "../app/lib/placeholder-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ✅ Insert Users
  await prisma.user.createMany({
    data: [
      {
        id: "1",
        firstName: "Jonathan",
        lastName: "Doe",
        email: "jonathan@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        password: await bcrypt.hash("SecurePassword123", 10),
      },
      {
        id: "2",
        firstName: "Kelly",
        lastName: "Clark",
        email: "kelly@example.com",
        phone: "987-654-3210",
        address: "456 Oak Ave, Somewhere, USA",
        password: await bcrypt.hash("AnotherSecurePass", 10),
      },
    ],
    skipDuplicates: true, // Prevents duplicates
  });

  // ✅ Insert Accounts
  for (const account of accounts) {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    await prisma.account.upsert({
      where: { account_id: account.account_id },
      update: {},
      create: { ...account, password: hashedPassword },
    });
  }

  // ✅ Insert Seller Profiles (Only for Sellers)
  for (const account of accounts) {
    if (account.account_type === "Seller") {
      await prisma.sellerProfile.upsert({
        where: { account_id: account.account_id },
        update: {},
        create: {
          account_id: account.account_id,
          businessName: account.businessName!,
          tax_id: account.tax_id!,
        },
      });
    }
  }

  // ✅ Insert Products
  for (const product of products) {
    await prisma.product.upsert({
      where: { product_id: product.product_id },
      update: {},
      create: product,
    });
  }

  // ✅ Insert Orders
  for (const order of orders) {
    await prisma.order.upsert({
      where: { order_id: order.order_id },
      update: {},
      create: {
        order_id: order.order_id,
        account_id: order.account_id,
        date: new Date(order.date), // ✅ Convert string date to Date object
        shipping: order.shipping,
        tax: order.tax,
        final_total: order.final_total,
        status: order.status,
      },
    });
  }

  // ✅ Insert Order Products
  for (const orderProduct of order_products) {
    await prisma.orderProduct.upsert({
      where: {
        order_id_product_id: {
          order_id: orderProduct.order_id,
          product_id: orderProduct.product_id,
        },
      },
      update: {},
      create: {
        order_id: orderProduct.order_id,
        product_id: orderProduct.product_id,
        price: orderProduct.price,
        quantity: orderProduct.quantity,
        total: orderProduct.total,
      },
    });
  }

  // ✅ Insert Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { 
        product_id_account_id: { 
          product_id: review.product_id, 
          account_id: review.account_id 
        } 
      },
      update: {},
      create: {
        product_id: review.product_id,
        account_id: review.account_id,
        stars: review.stars,
        review: review.review,
        date: new Date(review.date), // ✅ Ensures correct Date format
      },
    });
  }

  console.log("✅ Seeding completed!");
}

// Run the seed function
main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
