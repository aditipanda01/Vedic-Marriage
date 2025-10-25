"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProfileCompletion } from "../../ProfileCompletion"
import { useNavigate } from "react-router-dom"

export function MainContentSection() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the first profile section
    navigate("/profile-filling/basic-details");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileCompletion onContinue={handleContinue} />
        </TabsContent>
        <TabsContent value="matches">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Matches</h2>
            <p className="text-muted-foreground">
              Your potential matches will be displayed here.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
