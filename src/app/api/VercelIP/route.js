import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
    const vercelId = req.headers['x-vercel-id'];
    NextResponse.json({ ipVercel: vercelId})
}