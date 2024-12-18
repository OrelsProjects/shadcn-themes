import { CardsActivityGoal } from "@/components/cards/activity-goal";
import { CardsCalendar } from "@/components/cards/calendar";
import { CardsChat } from "@/components/cards/chat";
import { CardsCookieSettings } from "@/components/cards/cookie-settings";
import { CardsCreateAccount } from "@/components/cards/create-account";
import { CardsDataTable } from "@/components/cards/data-table";
import { CardsMetric } from "@/components/cards/metric";
import { CardsPaymentMethod } from "@/components/cards/payment-method";
import { CardsReportIssue } from "@/components/cards/report-issue";
import { CardsShare } from "@/components/cards/share";
import { CardsStats } from "@/components/cards/stats";
import { CardsTeamMembers } from "@/components/cards/team-members";
import { cn } from "@/lib/utils";

export function CardsDemo() {
  return (
    <div className="md:grid grid-cols-1 lg:grid-cols-10 xl:grid-cols-11 gap-4 w-full">
      <div className="space-y-4 lg:col-span-4 xl:col-span-6 w-full">
        <CardsStats />
        <div className="flex flex-col sm:grid-cols-[1fr] md:hidden w-full">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4 w-full">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-4 w-full">
            <CardsMetric />
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col md:grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 w-full",
          )}
        >
          <div className={cn("space-y-4 xl:space-y-4 w-full")}>
            <CardsTeamMembers />
            <CardsCookieSettings />
            <CardsPaymentMethod />
          </div>
          <div className="space-y-4 xl:space-y-4">
            <CardsChat />
            <CardsCreateAccount />
            <div className="hidden xl:block">
              <CardsReportIssue />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4 w-full">
        <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid w-full">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3 w-full">
            <CardsActivityGoal />
          </div>
          <div className="pt-3 sm:col-span-2 xl:pt-3 w-full">
            <CardsMetric />
          </div>
        </div>
        <div className="hidden md:block">
          <CardsDataTable />
        </div>
        <CardsShare />
        <div className="xl:hidden">
          <CardsReportIssue />
        </div>
      </div>
    </div>
  );
}
