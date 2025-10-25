import { ProfileSection } from "@/screens/ProfileFilling/sections/ProfileSection/ProfileSection"
import { NavigationProvider } from "@/lib/context/NavigationContext"
// import { HeaderSection } from "@/screens/ProfileFilling/sections/HeaderSection/HeaderSection"
import { Header } from "@/components/Header";
export default function ProfileFilling() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />
      <NavigationProvider>
        <ProfileSection />
      </NavigationProvider>
    </div>
  )
} 