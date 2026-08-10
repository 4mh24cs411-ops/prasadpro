import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FitGen Application Error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '32rem', width: '100%', background: '#121212', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5rem', borderRadius: '20px', margin: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif' }}>FitGen Recovery Mode</h1>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1rem', lineHeight: '1.5' }}>
              The application encountered a runtime error. Click below to clear cache or inspect details.
            </p>
            {this.state.error && (
              <div style={{ textAlign: 'left', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', fontSize: '0.75rem', color: '#FCA5A5', marginBottom: '1.5rem', overflowX: 'auto', fontFamily: 'monospace' }}>
                <strong>Error Details:</strong>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '0.5rem', margin: 0 }}>
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            <button
              onClick={this.handleReset}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                background: 'linear-gradient(135deg, #39FF14 0%, #00CFFF 100%)',
                color: '#050505',
                fontWeight: 'bold',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Reset Cache & Launch FitGen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
