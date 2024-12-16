-- CreateTable
CREATE TABLE "Follow" (
    "follwerId" TEXT NOT NULL,
    "FollowingId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("follwerId","FollowingId")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follwerId_fkey" FOREIGN KEY ("follwerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_FollowingId_fkey" FOREIGN KEY ("FollowingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
