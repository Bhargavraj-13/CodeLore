// Consists of profile picture, username, and email display

function ProfileHeader({ user }) {
  return (
    <div className="flex items-center gap-16 p-6">
      {/* Profile Picture */}
      <div
        className="flex-shrink-0 flex items-center justify-center bg-slate-800 text-white font-semibold border-4 border-teal-400"
        style={{
          width: '5cm',
          height: '5cm',
          borderRadius: '4cm',
        }}
      >
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.username}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '4cm',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span className="text-5xl">
            {user.username.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          {user.username}
        </h2>
        <p className="text-base text-slate-300 mt-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}

export default ProfileHeader;