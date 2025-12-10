import React from "react";
import RedeemClient from "./RedeemClient";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  
  const getFirst = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";

  const initialSecret = getFirst(searchParams.secret);
  const initialDealId = getFirst(searchParams.dealId);
  const initialMerchant = getFirst(searchParams.merchant);

  return (
    <main>
      <RedeemClient
        initialSecret={initialSecret}
        initialDealId={initialDealId}
        initialMerchant={initialMerchant}
      />
    </main>
  );
}
