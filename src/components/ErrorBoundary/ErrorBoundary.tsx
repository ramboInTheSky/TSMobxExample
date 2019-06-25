import React from "react"

export class Boundary extends React.Component {
  public state = { hasError: false }

  public componentDidCatch(error: Error, info: any) {
    this.setState({ hasError: true })
    //   logErrorToMyService(error, info)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong with this component</h1>
    }
    return this.props.children
  }
}

export default Boundary;
