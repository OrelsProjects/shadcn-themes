import React from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { UserAvatar } from "@/components/ui/avatar";
import CustomLink from "@/components/customLink";

interface SettingsComponentProps {}

const SettingsComponent: React.FC<SettingsComponentProps> = () => {
  const { user, state } = useAppSelector(state => state.auth);

  return (
    state === "authenticated" && (
      <div className="p-2 rounded-lg w-full flex flex-col items-end">
        <CustomLink href="/settings" className="w-fit h-fit" preserveQuery>
          <UserAvatar
            photoURL={user?.photoURL || "/images/default-profile.png"}
            displayName={user?.displayName}
            imageClassName="rounded-full hover:cursor-pointer !w-12 !h-12 shadow-md"
            className="w-12 h-12 md:hover:shadow-lg md:hover:cursor-pointer rounded-full"
            hideTooltip
          />
        </CustomLink>
      </div>
    )
  );
};

export default SettingsComponent;
