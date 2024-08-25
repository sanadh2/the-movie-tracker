import prisma from "@/db/db";
import Review from "./review";
export default async function Reviews({ id }: { id: string | number }) {
  const reviewsNew = await prisma.review.findMany({
    where: {
      tmdbID: Number(id),
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <h3>Popular reviews</h3>
      <div className="">
        {reviewsNew.map((review) => (
          <div key={review.id} className="">
            <Review review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
