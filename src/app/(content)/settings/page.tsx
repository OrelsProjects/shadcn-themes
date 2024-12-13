"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { Button } from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import { toast } from "react-toastify";
import { EventTracker } from "@/eventTracker";
import { ThemeToggle } from "@/components/themeToggle";
import Divider from "@/components/ui/divider";
import CustomLink from "@/components/customLink";
import { AppUserSettings } from "@/models/appUser";

interface SettingsProps {}

const SettingsScreen: React.FC<SettingsProps> = () => {
  const { user } = useAppSelector(state => state.auth);
  const { deleteUser, signOut } = useAuth();
  const [settings, setSettings] = useState<AppUserSettings | null>(null);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  useEffect(() => {
    if (user) {
      setSettings(user?.settings);
    }
  }, [user]);

  const handleDeleteUserRequest = async () => {
    // Show alert that asks the user to insert their email. If email correct, delete user.
    // If email incorrect, show error message.
    EventTracker.track("delete_user_request");
    const email = prompt(
      `Please enter your email (${user?.email}) to confirm deletion`,
    );
    if (email === user?.email) {
      toast.promise(deleteUser(), {
        pending: "Deleting user...",
        success: "User deleted",
        error: "Failed to delete user",
      });
    } else {
      if (email) {
        alert("Email is incorrect");
      }
    }
  };

  const handleSignOut = async () => {
    EventTracker.track("sign_out");
    toast.promise(signOut(), {
      pending: "Signing out...",
      success: "Signed out",
      error: "Failed to sign out",
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <div className="flex flex-row justify-between items-center">
        <span className="text-xl font-semibold">{user?.email}</span>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Appearance</span>
          <div className="pl-2">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full justify-start">
          <span className="text-lg font-semibold">Account</span>
          <div className="flex flex-col gap-1 pl-2">
            <Button
              variant="ghost"
              className="w-fit px-1 md:hover:bg-slate-400/40"
              onClick={handleSignOut}
            >
              LOGOUT
            </Button>
            <Button
              variant="link"
              className="w-fit px-1 md:hover:bg-destructive/40 md:hover:text-destructive-foreground hover:no-underline text-destructive/60 text-sm"
              onClick={handleDeleteUserRequest}
            >
              DELETE
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-1 text-xs text-foreground font-light">
        {/* Bulleted list: By Orel , <a>privacy<a>, <a>terms of service<a> */}
        <strong>By Orel</strong> •
        <CustomLink
          href="/privacy"
          className="text-sky-600 underline dark:text-sky-400/70"
          target="_blank"
          about="Privacy"
        >
          Privacy
        </CustomLink>
        •
        <CustomLink
          href="/tos"
          className="text-sky-600 underline dark:text-sky-400/70"
          target="_blank"
          about="Terms of Service"
        >
          Terms of Service
        </CustomLink>
      </div>
    </div>
  );
};

export default SettingsScreen;
