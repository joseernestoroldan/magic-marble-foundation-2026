import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken } from "../../AccessToken";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const accessToken = await getPayPalAccessToken();

  const { id } = await params;

  console.log("id:", id);

  try {
    const response = await fetch(
      `${process.env.PAYPAL_API_BASE}/v1/billing/plans/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
