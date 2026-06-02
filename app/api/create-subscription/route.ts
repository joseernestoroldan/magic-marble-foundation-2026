import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "../AccessToken";

export async function POST(request: Request) {
  try {
    const {
      planId,
      firstName,
      secondName,
      email,
      amount,
      telephone,
      country,
      address,
    } = await request.json();


    if (!planId || !email || !firstName || !secondName || !amount) {
      return NextResponse.json({ error: "Fields Missing" }, { status: 400 });
    }
    const accessToken = await getPayPalAccessToken();

    const urlSuccess = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/success-subscription`
    );
    urlSuccess.searchParams.append("email", email);
    urlSuccess.searchParams.append("first_name", firstName);
    urlSuccess.searchParams.append("second_name", secondName);
    urlSuccess.searchParams.append("plan_id", planId);
    urlSuccess.searchParams.append("amount", amount);
    urlSuccess.searchParams.append("telephone", telephone);
    urlSuccess.searchParams.append("country", country);
    urlSuccess.searchParams.append("address", address);

    const subscriptionResponse = await fetch(
      `${process.env.PAYPAL_API_BASE}/v1/billing/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          application_context: {
            brand_name: "Magic Marble Foundation",
            locale: "en-US",
            shipping_preference: "NO_SHIPPING",
            user_action: "SUBSCRIBE_NOW",
            return_url: urlSuccess,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-subscription`,
          },
          subscriber: {
            name: {
              given_name: firstName,
              surname: secondName,
            },
            email_address: email,
          },
        }),
      }
    );

    const subscriptionData = await subscriptionResponse.json();

    return NextResponse.json(
      {
        success: true,
        subscription: subscriptionData,
        message: "Subscription completed",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create subscription aqui", success: false },
      { status: 500 }
    );
  }
}
