import { buildMetadata } from "@/lib/seo";
import { LatestNewsClient } from "./components/LatestNewsClient";

export const metadata = buildMetadata({
  title: "Latest News — Live Financial Intelligence",
  description:
    "Stream live financial news across markets, stocks, crypto, economy, banking, and more. Powered by real-time AI enrichment.",
});

export default function LatestPage() {
  return <LatestNewsClient initialCategory="All" />;
}