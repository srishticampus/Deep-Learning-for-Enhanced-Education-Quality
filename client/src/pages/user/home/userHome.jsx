import { CallToAction } from "../../../components/landing/callToAction"
import { ExploreOpportunities } from "../../../components/landing/explore"
import { Footer } from "../../../components/landing/footer"
import { LandingHeader } from "../../../components/landing/header"
import { HowItWorks } from "../../../components/landing/howItWorks"
import { UserNavbar } from "../../../components/user/navbar/userNavbar"
import { ProfileData } from "../../../components/user/profile/profileData"

export const UserHome = () => {
    return (
     <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-to-white">
           <UserNavbar />
           <LandingHeader />
           <ProfileData/>
           <HowItWorks />
           <ExploreOpportunities />
           <CallToAction />
           <Footer />
         </div>
    )
}