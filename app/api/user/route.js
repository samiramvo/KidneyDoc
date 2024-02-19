import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import User from "@/lib/models";

export const GET = async (request) => {
    try {
        await connectToDB();
        return new NextResponse("It was connect to the db", { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching User" + error, { status: 500 });
    }
}