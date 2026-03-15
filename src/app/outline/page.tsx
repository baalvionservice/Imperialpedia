// This file is neutral to resolve parallel route conflicts with /(public)/outline/page.tsx
// All routing is handled by the src/app/(public) route group.
export const dynamic = 'force-static';
export default function Placeholder() { return null; }
