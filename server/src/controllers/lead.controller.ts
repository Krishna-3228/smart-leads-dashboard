import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Lead from "../models/lead.model";
import { AuthRequest } from "../types/auth.types";

export const createLead = asyncHandler(
    async (req: AuthRequest, res: Response) => {
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
    }
);

export const getLeads = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const {
            status,
            source,
            search,
            sort,
            page = "1",
        } = req.query;

        // Build filter object
        const filter: any = {};

        if (status) filter.status = status;
        if (source) filter.source = source;
        

        // Search by name or email
        if ( typeof search === "string" && search.trim()) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        // Pagination
        const limit = Math.min(
            100,
            req.query.limit
                ? parseInt(
                    req.query.limit as string
                )
                : 10
        );

        const pageNumber = Math.max(1, parseInt(page as string) || 1);
        const skip = (pageNumber - 1) * limit;

        // Sorting
        let sortOption = {};
        if (sort === "latest") sortOption = { createdAt: -1 };
        else if (sort === "oldest") sortOption = { createdAt: 1 };

        // Fetch leads
        const leads = await Lead.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name email role");

        // Total count for pagination
        const totalLeads = await Lead.countDocuments(filter);

        res.status(200).json({
            currentPage: pageNumber,
            totalPages: Math.ceil(totalLeads / limit),
            totalLeads,
            count: leads.length,
            leads,
        });
    }
);

export const getLeadById = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid lead ID");
        }

        const lead = await Lead.findById(id).populate(
            "createdBy",
            "name email role"
        );

        if (!lead) {
            res.status(404);
            throw new Error("Lead not found");
        }

        res.status(200).json({ lead });
    }
);

export const updateLead = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid lead ID");
        }

        const { name, email, status } = req.body;
        const source = req.body.source?.toLowerCase();

        const lead = await Lead.findById(id);

        if (!lead) {
            res.status(404);
            throw new Error("Lead not found");
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
    }
);

export const deleteLead = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid lead ID");
        }

        const lead = await Lead.findById(id);

        if (!lead) {
            res.status(404);
            throw new Error("Lead not found");
        }

        await lead.deleteOne();

        res.status(200).json({
            message: "Lead deleted successfully",
        });
    }
);