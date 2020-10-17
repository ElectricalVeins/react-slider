import React, { Component } from 'react';

class UserCard extends Component {
  handleSelect = () => {
    this.props.handleSelect(this.props.cell);
  };
  render() {
    const { picture, name, isSelected } = this.props;
    const selectedStyles = {
      backgroundColor: 'grey',
    };
    const computedStyles = isSelected ? selectedStyles : null;

    return (
      <article style={computedStyles} onClick={this.handleSelect}>
        <br />
        <p>
          {name.first} {name.last}
        </p>
        <img src={picture.medium} alt='user' />
        <br />
        {this.props.cell}
        <br />
      </article>
    );
  }
}

export default UserCard;
