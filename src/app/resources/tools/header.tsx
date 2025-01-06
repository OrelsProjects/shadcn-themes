"use client";

export default function Header() {
  const title = window.location.pathname
    .split("/")
    .pop()
    ?.replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return <h1 className="text-2xl font-bold">{title}</h1>;
}
