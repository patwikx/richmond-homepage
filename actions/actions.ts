"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// The interface should match the one in your component and the Prisma schema.
interface InvestmentInquiry {
  companyName: string;
  companyAddress: string;
  contactPerson: string;
  contactLandline: string;
  contactMobile: string;
  contactEmail: string;
  businessType: string;
  productsServices: string;
  projectedEmployees: string;
  operationsTimeline: string;
  spaceRequirements: string;
  utilityNeeds: string;
  needsAndExpectations: string;
}

// Define the structure for the server action's return value
interface ActionResult {
    success: boolean;
    message: string;
}

/**
 * Server action to create a new investment inquiry.
 * @param data The investment inquiry data from the form.
 * @returns An object indicating success or failure.
 */
export async function createInvestmentInquiry(data: InvestmentInquiry): Promise<ActionResult> {
  try {
    // Basic validation to ensure required fields are not empty
    if (!data.companyName || !data.contactPerson || !data.contactEmail) {
        return { success: false, message: "Validation failed: Required fields are missing." };
    }

    // Use Prisma Client to create a new record in the database
    const newInquiry = await prisma.investmentInquiry.create({
      data: {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        contactPerson: data.contactPerson,
        contactLandline: data.contactLandline || null, // Handle optional field
        contactMobile: data.contactMobile,
        contactEmail: data.contactEmail,
        businessType: data.businessType,
        productsServices: data.productsServices,
        spaceRequirements: data.spaceRequirements,
        needsAndExpectations: data.needsAndExpectations || null, // Handle optional field
        // These fields are in the interface but not the form, so we'll pass null or default values
        projectedEmployees: data.projectedEmployees || null,
        operationsTimeline: data.operationsTimeline || null,
        utilityNeeds: data.utilityNeeds || null,
      },
    });

    // Optional: Revalidate the path if you have a page that lists inquiries
    revalidatePath('/admin/inquiries'); // Example path

    console.log("Successfully created inquiry:", newInquiry);
    return { success: true, message: "Inquiry submitted successfully!" };

  } catch (error) {
    console.error("Error creating investment inquiry:", error);
    
    // Handle potential Prisma-specific errors, like unique constraint violation
    if (error instanceof Error && 'code' in error && (error).code === 'P2002') {
         return { success: false, message: "An inquiry with this email address already exists." };
    }

    return { success: false, message: "An unexpected error occurred. Please try again later." };
  }
}