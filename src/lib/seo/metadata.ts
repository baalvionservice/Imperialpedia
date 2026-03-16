import { Metadata } from 'next';

export function constructMetadata({
  title = "Imperialpedia — Financial Intelligence Hub",
  description = "The world's most scalable financial intelligence engine.",
  image = "/og-image.jpg",
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@imperialpedia",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
