import { connectToDB } from "@/lib/utilsconnection";
import { User } from "@/lib/models";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      await connectToDB();
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
