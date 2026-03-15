// Redirecting to modular route group
import { redirect } from 'next/navigation';

export default function OutlineRootPage() {
  redirect('/(public)/outline');
}
