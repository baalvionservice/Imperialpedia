import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirecting to ensure the (public) group version is used or to avoid collisions
  redirect('/');
}
