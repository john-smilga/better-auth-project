

```tsx
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchTodo(id, signal) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    signal ? { signal } : undefined
  );
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
```


```tsx

function BasicHoverFetch() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['hover-basic'],
    queryFn: () => fetchTodo(1),
    enabled: false, // do NOT run on mount
  });

  return (
    <div
      onMouseEnter={() => refetch()}
      style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}
    >
      <h3>Basic hover fetch</h3>
      <p>Hover to fetch.</p>

      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}


```


```tsx
import { useRef } from 'react';

function HoverWithDelay() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['hover-delayed'],
    queryFn: () => fetchTodo(2),
    enabled: false,
  });

  const timerRef = useRef<number | null>(null);

  const handleEnter = () => {
    timerRef.current = window.setTimeout(() => {
      refetch();
    }, 500); // 500ms delay
  };

  const handleLeave = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}
    >
      <h3>Hover with delay</h3>
      <p>Hover and stay ≥ 500ms to trigger fetch.</p>

      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

```

```tsx
function HoverWithCancel() {
  const queryClient = useQueryClient();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['hover-cancel'],
    queryFn: ({ signal }) => fetchTodo(3, signal), // React Query passes AbortSignal
    enabled: false,
  });

  const handleEnter = () => {
    refetch();
  };

  const handleLeave = () => {
    queryClient.cancelQueries({ queryKey: ['hover-cancel'] });
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}
    >
      <h3>Hover with cancel</h3>
      <p>Hover to start request, leave to cancel.</p>

      {isFetching && <p>Fetching… (will cancel on leave)</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

```


```tsx
function ItemHoverList() {
  const item1 = useQuery({
    queryKey: ['item', 1],
    queryFn: () => fetchTodo(4),
    enabled: false,
  });
  const item2 = useQuery({
    queryKey: ['item', 2],
    queryFn: () => fetchTodo(5),
    enabled: false,
  });
  const item3 = useQuery({
    queryKey: ['item', 3],
    queryFn: () => fetchTodo(6),
    enabled: false,
  });

  const commonStyle = {
    padding: 8,
    border: '1px solid #ddd',
    borderRadius: 6,
    cursor: 'pointer',
    minWidth: 90,
  };

  return (
    <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>Per-item hover fetch</h3>
      <p>Hover each item to lazily load its data.</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item1.data) item1.refetch();
          }}
        >
          Item 1
          {item1.isLoading && <div>Loading...</div>}
          {item1.data && <div style={{ fontSize: 12 }}>{item1.data.title}</div>}
        </div>

        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item2.data) item2.refetch();
          }}
        >
          Item 2
          {item2.isLoading && <div>Loading...</div>}
          {item2.data && <div style={{ fontSize: 12 }}>{item2.data.title}</div>}
        </div>

        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item3.data) item3.refetch();
          }}
        >
          Item 3
          {item3.isLoading && <div>Loading...</div>}
          {item3.data && <div style={{ fontSize: 12 }}>{item3.data.title}</div>}
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { useState } from 'react';

function PrefetchOnHover() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const queryKey = ['hover-prefetch'];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchTodo(8),
    enabled: open, // only subscribe when "open"
  });

  const handleHover = () => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => fetchTodo(8),
    });
  };

  return (
    <div
      onMouseEnter={handleHover}
      style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}
    >
      <h3>Prefetch on hover, show on click</h3>
      <p>Hover to prefetch, then click button to view.</p>

      <button onClick={() => setOpen(true)}>Open details</button>

      {open && (
        <div style={{ marginTop: 8 }}>
          {isLoading && <p>Loading (or resolving from cache)…</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}

```

```tsx
function ItemHoverList() {
  const item1 = useQuery({
    queryKey: ['item', 1],
    queryFn: () => fetchTodo(4),
    enabled: false,
  });
  const item2 = useQuery({
    queryKey: ['item', 2],
    queryFn: () => fetchTodo(5),
    enabled: false,
  });
  const item3 = useQuery({
    queryKey: ['item', 3],
    queryFn: () => fetchTodo(6),
    enabled: false,
  });

  const commonStyle = {
    padding: 8,
    border: '1px solid #ddd',
    borderRadius: 6,
    cursor: 'pointer',
    minWidth: 90,
  };

  return (
    <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>Per-item hover fetch</h3>
      <p>Hover each item to lazily load its data.</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item1.data) item1.refetch();
          }}
        >
          Item 1
          {item1.isLoading && <div>Loading...</div>}
          {item1.data && <div style={{ fontSize: 12 }}>{item1.data.title}</div>}
        </div>

        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item2.data) item2.refetch();
          }}
        >
          Item 2
          {item2.isLoading && <div>Loading...</div>}
          {item2.data && <div style={{ fontSize: 12 }}>{item2.data.title}</div>}
        </div>

        <div
          style={commonStyle}
          onMouseEnter={() => {
            if (!item3.data) item3.refetch();
          }}
        >
          Item 3
          {item3.isLoading && <div>Loading...</div>}
          {item3.data && <div style={{ fontSize: 12 }}>{item3.data.title}</div>}
        </div>
      </div>
    </div>
  );
}

```

```tsx
export default function HoverDemoPage() {
  return (
    <div style={{ display: 'grid', gap: 16, padding: 24 }}>
      <BasicHoverFetch />
      <HoverWithDelay />
      <HoverWithCancel />
      <ItemHoverList />
      <PrefetchOnHover />
    </div>
  );
}

```