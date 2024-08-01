// import { deleteUser } from "@/lib/actions";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       await deleteUser();
//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete user" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
