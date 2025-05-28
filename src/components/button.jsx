export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s ease',
        margin: '5px',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#1565c0')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#1976d2')}
    >
      {children}
    </button>
  );
}
