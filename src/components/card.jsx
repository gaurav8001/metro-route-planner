export function Card({ children }) {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: '0.3s ease',
      }}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div
      style={{
        fontSize: '16px',
        color: '#333',
        lineHeight: '1.6',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {children}
    </div>
  );
}
