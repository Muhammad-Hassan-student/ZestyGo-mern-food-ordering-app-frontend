import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApiRoute";
import UserProfileForm from "@/forms/profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { userArahaHai, isLoading: commingLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (commingLoading) {
    return <span className="text-center">Loading...</span>;
  }
  if (!userArahaHai) {
    return <span>Unable to load user profile</span>;
  }
  return (
    <div >
      <UserProfileForm
        currentUser={userArahaHai}
        onSave={updateUser}
        isLoading={isUpdateLoading}
      />
    </div>
  );
};

export default UserProfilePage;
