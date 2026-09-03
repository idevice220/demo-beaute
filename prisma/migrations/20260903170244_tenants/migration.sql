-- DropIndex
DROP INDEX "Subscriber_email_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "FaqItem" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "GalleryItem" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "GiftOrder" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Meta" DROP COLUMN "lastReset",
DROP COLUMN "seededAt",
ADD COLUMN     "lastSweep" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Rituel" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey",
ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo',
ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("tenant", "key");

-- AlterTable
ALTER TABLE "Soin" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "seedVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_tenant_idx" ON "Booking"("tenant");

-- CreateIndex
CREATE INDEX "Category_tenant_idx" ON "Category"("tenant");

-- CreateIndex
CREATE INDEX "FaqItem_tenant_idx" ON "FaqItem"("tenant");

-- CreateIndex
CREATE INDEX "GalleryItem_tenant_idx" ON "GalleryItem"("tenant");

-- CreateIndex
CREATE INDEX "GiftOrder_tenant_idx" ON "GiftOrder"("tenant");

-- CreateIndex
CREATE INDEX "Media_tenant_idx" ON "Media"("tenant");

-- CreateIndex
CREATE INDEX "Review_tenant_idx" ON "Review"("tenant");

-- CreateIndex
CREATE INDEX "Rituel_tenant_idx" ON "Rituel"("tenant");

-- CreateIndex
CREATE INDEX "Soin_tenant_idx" ON "Soin"("tenant");

-- CreateIndex
CREATE INDEX "Subscriber_tenant_idx" ON "Subscriber"("tenant");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_tenant_email_key" ON "Subscriber"("tenant", "email");

-- CreateIndex
CREATE INDEX "TeamMember_tenant_idx" ON "TeamMember"("tenant");

