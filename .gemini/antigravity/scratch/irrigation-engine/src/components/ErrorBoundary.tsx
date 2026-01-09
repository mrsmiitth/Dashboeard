import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: '#fff', background: '#1e293b', minHeight: '100vh', direction: 'rtl' }}>
                    <h1>عذراً، حدث خطأ غير متوقع</h1>
                    <p>Something went wrong.</p>
                    <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', direction: 'ltr' }}>
                        {this.state.error?.message}
                    </pre>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        مسح البيانات وإعادة التشغيل (Clear Data & Reset)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
