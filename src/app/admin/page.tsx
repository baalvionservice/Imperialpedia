
import { redirect } from 'next/navigation';

/**
 * Administrative entry point.
 * Redirects to the integrated dashboard summary.
 */
export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
