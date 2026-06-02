import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "../AccessToken";

export async function GET() {
  try {
    const accessToken = await getPayPalAccessToken();
    const plansRes = await fetch(
      `${process.env.PAYPAL_API_BASE}/v1/billing/plans`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
        },
      }
    );

    const plans = await plansRes.json();

   return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json("Something went wrong!!")

  }
}
