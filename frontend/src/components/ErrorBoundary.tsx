import { Result } from "antd";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Result
      status="error"
      title="Erro"
      subTitle="Desculpe pelo inconveniente."
    />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;