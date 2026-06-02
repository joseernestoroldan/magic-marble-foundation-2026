import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken } from "../AccessToken";

export async function POST(request: NextRequest) {
  try {
    // Extract the subscription ID from the request body
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Fields Missing" }, { status: 400 });
    }

    // Get the PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Cancel the subscription using the PayPal API
    const cancelResponse = await fetch(
      `${process.env.PAYPAL_API_BASE}/v1/billing/subscriptions/${id}/suspend`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          reason: "Not satisfied with the service",
        }),
      }
    );

    const cancelData = await cancelResponse.json();

    // Log the full response for debugging purposes
    console.log("PayPal API Response:", cancelData);
    console.log("Paypal response status:", cancelResponse.status);

    // Return only the relevant data in the response
    return NextResponse.json({
      message: "Subscription cancelled",
      subscriptionId: id,
      details: cancelData,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error cancelling subscription:", error);

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}