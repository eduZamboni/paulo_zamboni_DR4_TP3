import { Avatar as MuiAvatar } from '@mui/material';
import React from 'react';

interface AvatarProps {
  name?: string;
  imageUrl?: string;
  size?: number;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = 40, onClick }) => {
  const getInitials = (fullName?: string) => {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    const initials = names.map((n) => n[0]).join('');
    return initials.toUpperCase();
  };

  const initials = React.useMemo(() => getInitials(name), [name]);

  return (
    <MuiAvatar
      alt={name}
      src={imageUrl}
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        fontSize: size / 2,
        backgroundColor: imageUrl ? 'transparent' : '#3f51b5',
        color: imageUrl ? 'inherit' : '#fff',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {!imageUrl && initials}
    </MuiAvatar>
  );
};

export default Avatar;