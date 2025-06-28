import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { appColor } from "@/app/const";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UserProfileForm, { type userFormData } from "@/forms/profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApiRoute";

type Props= {
    onCheckout: (userFormData: userFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}


const CheckoutButton = ({onCheckout,isLoading, disabled}: Props) => {
  const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0()
  
    const {pathname} = useLocation();
    
    const {userArahaHai, isLoading: isGetUserLoading} = useGetMyUser()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }


    if(!isAuthenticated){
        return <Button onClick={onLogin} className={`${appColor} cursor-pointer flex-1`}>
            Log in to check out
        </Button>
    }

    if(isAuthLoading || !userArahaHai || isLoading ){
        return <LoadingButton/>
    }

    return (
    <Dialog>
      <DialogTrigger asChild >
        <Button disabled={disabled} className={`${appColor} flex-1 cursor-pointer`}>
            Go to checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px} md:min-w-[700px] bg-gray-50">
        <UserProfileForm currentUser={userArahaHai} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to payment" />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;