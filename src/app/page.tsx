import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Welcome to Mini CRM Platform
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/segments"
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Audience Segments
                </h2>
                <p className="text-gray-600">
                  Create and manage customer segments for targeted campaigns
                </p>
              </Link>
              <Link
                href="/campaigns"
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Campaigns
                </h2>
                <p className="text-gray-600">
                  Create and track marketing campaigns
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
