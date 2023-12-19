import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import FileUploader from "./_component/example-uploader";
import { db } from "~/server/db";
import Image from "next/image";
export default async function HomePage() {
  const session = await getServerAuthSession();
  const images = await db.uploadedImage.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Good Luck
        </h1>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        {session && <FileUploader />}
        {session && (
          <>
            <h1>Your Images</h1>
            <h3>Refresh page after uploading to see your images</h3>
            {images.map((image) => (
              <>
                <Image
                  key={image.image_id}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt="failed to load images"
                  src={image.image_url}
                />
              </>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
