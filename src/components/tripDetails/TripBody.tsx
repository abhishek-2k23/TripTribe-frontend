import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { Calendar, ListChecks, Wallet, Folder } from "lucide-react";


import Files from "./tabs/Files";
import Itinerary from "./tabs/Itinerary";
import Checklist from "./tabs/Checklist";
import Budget from "@/page/Budget";
import TripSummary from "./sidebar/TripSummary";
import DiscussionPanel from "./sidebar/DiscussionPanel";
import useTripDetailsStore from "@/store/useTripDetails";

export default function TripBodyLayout() {
  const setActiveTab = useTripDetailsStore((state) => state.setActiveTab);
  
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-160px)] mt-10 px-2">

      {/* LEFT CONTENT */}
      <div className="col-span-8 flex flex-col relative">

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
              <Budget />
            </TabsContent>

            <TabsContent value="files">
              <Files />
            </TabsContent>

          </div>

        </Tabs>

      </div>

      {/* RIGHT SIDEBAR (NON SCROLLING) */}
      <div className="col-span-4 space-y-6">
        <TripSummary />
        <DiscussionPanel />
      </div>

    </div>
  );
}