import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { Calendar, ListChecks, Wallet, Folder, Settings } from "lucide-react";


import Files from "./tabs/Files";
import Itinerary from "./tabs/Itinerary";
import Checklist from "./tabs/Checklist";
import Budget from "./tabs/Budget";
import useTripDetailsStore from "@/store/useTripDetails";
import SettingsPage from "./tabs/Settings";
import useAuthStore from "@/store/useAuthStore";
import BudgetScreen from "./budget/dashboard/BudgetDashboard";
import useBudgetStore from "@/store/useBudgetStore";

export default function TripBodyLayout() {
  const setActiveTab = useTripDetailsStore((state) => state.setActiveTab);
  const backendUser = useAuthStore((state) => state.backendUser);
  const selectedTrip = useTripDetailsStore((state) => state.selectedTrip);
  const showSettleMentScreen = useBudgetStore((s) => s.showSettleMentScreen);

  const member = selectedTrip?.members.filter((m) => m.user._id === backendUser?._id)[0];
  console.log(selectedTrip, member);
  
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-160px)] w-full mt-10 px-2">

      {/* LEFT CONTENT */}
      <div className="col-span-12 flex flex-col relative">

        <Tabs defaultValue="itinerary" className="flex flex-col h-full text-md" onValueChange={setActiveTab}>

          {/* Tabs Nav */}
          <TabsList className="w-3/4 justify-start gap-6 border-b rounded-none bg-transparent">

            <TabsTrigger
              value="itinerary"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground text-lg"
            >
              <Calendar size={16} />
              Itinerary
            </TabsTrigger>

            <TabsTrigger
              value="checklist"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground text-lg"
            >
              <ListChecks size={16} />
              Checklist
            </TabsTrigger>

            <TabsTrigger
              value="budget"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground text-lg"
            >
              <Wallet size={16} />
              Budget
            </TabsTrigger>

            <TabsTrigger
              value="files"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground text-lg"
            >
              <Folder size={16} />
              Files
            </TabsTrigger>

            {
              member?.role === "owner" && 
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:bg-primary-foreground text-lg"
            >
              <Settings size={16} />
              Settings
            </TabsTrigger>
            }

          </TabsList>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pt-6 pr-2">

            <TabsContent value="itinerary">
              <Itinerary />
            </TabsContent>

            <TabsContent value="checklist">
              <Checklist />
            </TabsContent>

            <TabsContent value="budget">
              {showSettleMentScreen ? <Budget /> : <BudgetScreen />}
            </TabsContent>

            <TabsContent value="files">
              <Files />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsPage />
            </TabsContent>

          </div>

        </Tabs>

      </div>

      {/* RIGHT SIDEBAR (NON SCROLLING) */}
      

    </div>
  );
}