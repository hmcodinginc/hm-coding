import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally no stack traces in the UI.
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-display font-bold text-white">This page could not be displayed</h1>
        <p className="mt-4 max-w-md text-sm text-gray-400">
          Please refresh the page or return home. If the problem continues, contact HM Coding.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 text-sm font-semibold text-white"
          >
            Refresh
          </button>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false })}
            className="rounded-full border border-brand-cyan/30 px-6 py-3 text-sm font-semibold text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    );
  }
}
