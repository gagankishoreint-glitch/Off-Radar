import { Company } from './company-data';

// Default role templates based on company characteristics
const DEFAULT_ROLES = {
    TIER1_PRODUCT: [
        { role: "Software Engineer I", level: "Entry" },
        { role: "Software Engineer II", level: "Mid" },
        { role: "Senior Software Engineer", level: "Senior" },
        { role: "Staff Engineer", level: "Staff" }
    ],
    INDIAN_PRODUCT: [
        { role: "SDE-1", level: "Entry" },
        { role: "SDE-2", level: "Mid" },
        { role: "SDE-3", level: "Senior" },
        { role: "Lead Engineer", level: "Lead" }
    ],
    STARTUP: [
        { role: "Software Engineer", level: "Entry" },
        { role: "Senior Software Engineer", level: "Senior" },
        { role: "Lead Engineer", level: "Lead" }
    ],
    SERVICE: [
        { role: "Assistant System Engineer", level: "Trainee" },
        { role: "System Engineer", level: "Entry" },
        { role: "Senior System Engineer", level: "Mid" },
        { role: "Technical Lead", level: "Lead" }
    ]
};

const DEFAULT_INTERN_ROLES = {
    TECH: ["Software Development Intern", "Engineering Intern"],
    STARTUP: ["Engineering Intern", "Full Stack Intern"],
    SERVICE: ["Intern - Software Development"]
};

/**
 * Get roles for a company, either from explicit data or generated intelligently
 */
export function getRolesForCompany(company: Company) {
    // If company has explicit roles, use them
    if (company.availableRoles && company.availableRoles.length > 0) {
        return company.availableRoles;
    }

    // Generate based on company characteristics
    if (company.companyType === 'Service') {
        return DEFAULT_ROLES.SERVICE;
    }

    if (company.companyType === 'Startup') {
        return DEFAULT_ROLES.STARTUP;
    }

    if (company.tier === 'Tier 1' && company.companyType === 'Product') {
        return DEFAULT_ROLES.TIER1_PRODUCT;
    }

    // Default to Indian product company pattern
    return DEFAULT_ROLES.INDIAN_PRODUCT;
}

/**
 * Get internship roles for a company
 */
export function getInternRolesForCompany(company: Company): string[] {
    // If company has explicit intern roles, use them
    if (company.internshipRoles && company.internshipRoles.length > 0) {
        return company.internshipRoles;
    }

    // If company has internship data, use that role
    if (company.internship?.role) {
        return [company.internship.role];
    }

    // If not intern friendly, return empty
    if (!company.internFriendly) {
        return [];
    }

    // Generate based on company type
    if (company.companyType === 'Service') {
        return DEFAULT_INTERN_ROLES.SERVICE;
    }

    if (company.companyType === 'Startup') {
        return DEFAULT_INTERN_ROLES.STARTUP;
    }

    return DEFAULT_INTERN_ROLES.TECH;
}
