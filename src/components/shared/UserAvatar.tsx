import type { User } from 'firebase/auth';

interface UserAvatarProps {
  user: User | null;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
          referrerPolicy="no-referrer" // Важно для Google-аватарок
        />
      )}
    </div>
  );
}
