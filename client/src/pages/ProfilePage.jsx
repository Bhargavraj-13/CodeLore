import { useEffect, useState } from 'react';
import AppHeader from '../components/layout/AppHeader.jsx';
import AppFooter from '../components/layout/AppFooter.jsx';
import {ProfileHeader, ProfileStats, MyTopics} from '../components/profile';
import api from '../lib/api.jsx';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
  <AppHeader showProfile={false}/>

  <main className="flex-1 px-6 md:px-10 py-10">
    <div className="max-w-5xl mx-auto">

      {/* Full profile container */}
      <div className="border border-white/10 rounded-2xl bg-slate-900/40 backdrop-blur-md p-8 space-y-8">

        <ProfileHeader user={profile.user} />
        <ProfileStats myTopics={profile.myTopics} />

        <section>
          <h3 className="text-lg font-semibold mb-4">My Topics</h3>
          <MyTopics topics={profile.myTopics} />
        </section>

      </div>
    </div>
  </main>

  <AppFooter />
</div>
  );
}

export default ProfilePage;