import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TeamPage from "@/components/TeamPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Game Changers - Penaxis",
  description:
    "Small team, big results. Meet the people behind Penaxis's strategy, technology, and growth work.",
  alternates: {
    canonical: "/game-changers",
  },
};

export default function GameChangersPage() {
  return (
    <>
      <Navbar />
      <main>
        <TeamPage />
      </main>
      <Footer />
    </>
  );
}
