import mongoose from "mongoose";
import { Request, Response } from "express";
import Lead from "../models/lead.model";
import { AuthRequest } from "../middlewares/auth.middleware";


export const createLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { name, email, source } = req.body;

        const lead = await Lead.create({
            name,
            email,
            status: "new",
            source: source?.toLowerCase(),
            createdBy: req.user?.id,
        });

        res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const getLeads = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      status,
      source,
      search,
      sort,
      page = "1",
    } = req.query;

    // Build filter object
    const filter: any = {};

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by source
    if (source) {
      filter.source = source;
    }

    // Search by name or email
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Pagination
    const limit = 10;

    const pageNumber = Math.max(
      1,
      parseInt(page as string) || 1
    );

    const skip =
      (pageNumber - 1) * limit;

    // Sorting
    let sortOption = {};

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    }

    else if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    // Fetch leads
    const leads = await Lead.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate(
        "createdBy",
        "name email role"
      );

    // Total count for pagination
    const totalLeads =
      await Lead.countDocuments(filter);

    res.status(200).json({
      currentPage: pageNumber,

      totalPages: Math.ceil(
        totalLeads / limit
      ),

      totalLeads,

      count: leads.length,

      leads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getLeadById = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid lead ID",
            });
        }
        const lead = await Lead.findById(
            id
        ).populate(
            "createdBy",
            "name email role"
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            lead,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

export const updateLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid lead ID",
            });
        }

        const { name, email, status } =
            req.body;

        const source =
            req.body.source?.toLowerCase();

        const lead = await Lead.findById(
            id
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        lead.name = name || lead.name;

        lead.email = email || lead.email;

        lead.status = status || lead.status;

        lead.source = source || lead.source;

        const updatedLead = await lead.save();

        res.status(200).json({
            message: "Lead updated successfully",
            lead: updatedLead,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

export const deleteLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid lead ID",
            });
        }

        const lead = await Lead.findById(
            id
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        await lead.deleteOne();

        res.status(200).json({
            message: "Lead deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};