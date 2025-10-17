import React from 'react';
import UserProfile from '../UserProfile';

const ProfileScreen = ({ route }) => {
  const { user, onLogout, onUserUpdate } = route.params;

  return (
    <UserProfile
      user={user}
      onLogout={onLogout}
      onUserUpdate={onUserUpdate}
    />
  );
};

export default ProfileScreen;
