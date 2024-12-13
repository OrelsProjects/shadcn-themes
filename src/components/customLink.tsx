import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

export interface CustomLinkProps {
  href?: string;
  rel?: string;
  target?: string;
  about?: string;
  className?: string;
  onClick?: () => void;
  preserveQuery?: boolean;
  children?: React.ReactNode;
}

export default function CustomLink({
  preserveQuery = true,
  ...props
}: CustomLinkProps) {
  const searchParams = useSearchParams();

  const searchParamsString = useMemo(() => {
    const searchParamsString = new URLSearchParams();
    searchParams.forEach((val, key) => {
      searchParamsString.append(key, val);
    });
    return searchParamsString.toString();
  }, [searchParams]);

  return (
    <Link
      {...props}
      href={{
        pathname: props.href,
        search: preserveQuery ? searchParamsString : undefined,
      }}
    />
  );
}
