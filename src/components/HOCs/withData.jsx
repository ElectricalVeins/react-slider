import React from 'react';

function withData(WrappedComponent, getData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isFetching: false,
        error: null,
      };
    }
    componentDidMount() {
      getData().then(
        data =>
          void this.setState({
            data,
            isFetching: false,
          })
      );
    }
    render() {
      const { data, error } = this.state;
      if (error) {
        return <div>{JSON.stringify(error)}</div>;
      }
      console.log(data)
      return <WrappedComponent data={data} />;
    }
  };
}

export default withData;
