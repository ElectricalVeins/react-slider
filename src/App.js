import React from 'react';
import Carousel from './components/Carousel';
import DataLoader from './components/DataLoader';
import withData from './components/HOCs/withData';
import UserList from './components/UserList';
import slides from './components/Carousel/slides.json';

console.log(slides);

function App() {

  /*   const loadUsers = () => fetch('https://randomuser.me/api').then(res => res.json());
    const renderUsers = (users) => <div>{JSON.stringify(users)}</div>;
   */
  return (
    <>
      <UserList />
    </>
  );
}

export default withData(App, () => fetch('https://randomuser.me/api').then(res => res.json()));
