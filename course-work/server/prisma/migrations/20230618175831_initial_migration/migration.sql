-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "_CityToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cities_address_key" ON "Cities"("address");

-- CreateIndex
CREATE UNIQUE INDEX "_CityToUser_AB_unique" ON "_CityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToUser_B_index" ON "_CityToUser"("B");

-- AddForeignKey
ALTER TABLE "_CityToUser" ADD CONSTRAINT "_CityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cities"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToUser" ADD CONSTRAINT "_CityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
