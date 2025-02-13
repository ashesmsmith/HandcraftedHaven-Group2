-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "businessName" TEXT,
    "tax_id" INTEGER,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDesc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageSRC" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "product_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("product_id","account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;
