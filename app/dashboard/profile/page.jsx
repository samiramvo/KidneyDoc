import { auth } from '@/app/auth';
import UserProfile from '@/components/UserProfile';
import { fetchAppointments } from '@/lib/data';

export default async function ProfilePage() {
    const { user } = await auth(); 
   console.log("USER",user);
    const userAppointments = await fetchAppointments(user._id);
  return (
    
    <div className="profile-page">
      <UserProfile user={user} userAppointments={userAppointments} />
    </div>
  );
}