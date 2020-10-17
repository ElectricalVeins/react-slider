import React, { Component } from 'react';
import UserCard from './UserCard';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      isFetching: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = (page = 1) => {
    fetch(`https://randomuser.me/api/?results=10&seed=foobar&page=${page}`)
      .then(res => res.json())
      .then(
        data =>
          this.setState({
            users: data.results.map(user => ({ ...user, isSelected: false })),
            isFetching: false,
          }),
        error => this.setState({ error, isFetching: false })
      );
  };

  handleSelect = cell => {
    this.setState({
      users: this.state.users.map(user => {
        if (cell === user.cell) {
          return {
            ...user,
            isSelected: !user.isSelected,
          };
        }
        return { ...user };
      }),
    });
  };

  render() {
    const { users } = this.state;
    const selectedUsers = users.filter(user => user.isSelected);
    return (
      <>
        <section>
          <h1>USER LIST</h1>
          <ul>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(btn => (
              <button key={btn} onClick={() => this.loadUsers(btn)}>
                {btn}
              </button>
            ))}
          </ul>
          {users.map(user => (
            <UserCard
              key={user.cell}
              handleSelect={this.handleSelect}
              {...user}
            />
          ))}
        </section>
        <section>
          <h1>Selected Users</h1>
          {selectedUsers.map(user => (
            <UserCard
              key={user.cell}
              handleSelect={this.handleSelect}
              {...user}
            />
          ))}
        </section>
      </>
    );
  }
}

export default UserList;
