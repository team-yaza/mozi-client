import React from 'react';

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // console.error('ErrorBoundary:', error);
      return <>{fallback}</>;
    }

    return children;
  }
}

export default ErrorBoundary;

// export default class ErrorBoundary extends React.Component<Props, State> {
//   public state: State = {};

//   public componentDidCatch(error: Error) {
//     this.props.onError?.(error);
//     this.setState({
//       error,
//     });
//   }

//   public render() {
//     const { error } = this.state;
//     const { fallback } = this.props;

//     if (error) {
//       return <>{fallback}</>;
//     }

//     return this.props.children;
//   }
// }
