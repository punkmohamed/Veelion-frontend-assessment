'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="stack" style={{ padding: '2rem' }}>
      <div style={{
        backgroundColor: '#fee',
        border: '1px solid #f88',
        borderRadius: '0.5rem',
        padding: '1.5rem',
      }}>
        <h2 style={{ color: '#c00', marginTop: 0 }}>Something went wrong!</h2>
        <p style={{ color: '#600', marginBottom: '1rem' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="button"
          style={{ padding: '0.5rem 1rem' }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
