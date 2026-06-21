import connectToDatabase from "../../../lib/mongodb";
import Keyword from "../../../models/Keyword";

function escapeRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const {
        page = "1",
        limit = "10",
        search = "",
        sortBy = "createdAt",
        order = "desc",
      } = req.query;

      const currentPage = Math.max(parseInt(page, 10) || 1, 1);
      const pageLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
      const skip = (currentPage - 1) * pageLimit;

      const allowedSortFields = ["createdAt", "updatedAt", "keyword", "name"];
      const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";

      const sortOrder = order === "asc" ? 1 : -1;

      const filter = {};

      if (search.trim()) {
        const searchRegex = new RegExp(escapeRegex(search.trim()), "i");

        filter.$or = [
          { keyword: searchRegex },
          { name: searchRegex },
          { title: searchRegex },
        ];
      }

      const [keywords, totalKeywords] = await Promise.all([
        Keyword.find(filter)
          .sort({ [safeSortBy]: sortOrder })
          .skip(skip)
          .limit(pageLimit)
          .lean(),

        Keyword.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(totalKeywords / pageLimit);

      return res.status(200).json({
        success: true,
        data: keywords,
        pagination: {
          totalItems: totalKeywords,
          currentPage,
          totalPages,
          limit: pageLimit,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      });
    } catch (error) {
      console.error("Failed to fetch keywords:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch keywords",
        error: error.message,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const keyword = await Keyword.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Keyword created successfully",
        data: keyword,
      });
    } catch (error) {
      console.error("Failed to create keyword:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to create blog keyword",
        error: error.message,
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    success: false,
    message: `Method ${req.method} Not Allowed`,
  });
}