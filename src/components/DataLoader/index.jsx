import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isFetching: false,
      error: null,
    };
  }

  load = () => {
    const { getData } = this.props;

    this.setState({
      isFetching: true,
    });
    
    getData()
      .then(
        data =>
          void this.setState({
            data,
            isFetching: false,
          })
      )
      .catch(
        error =>
          void this.setState({
            error,
            isFetching: false,
          })
      );
  };

  componentDidMount() {
    this.load();
  }

  render() {
    const { render } = this.props;
    const { error, data } = this.state;
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    }
    return render(data);
  }
}

DataLoader.propTypes = {
  render: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default DataLoader;
