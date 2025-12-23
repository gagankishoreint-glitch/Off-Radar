// Role mapping templates based on company type and tier

const ROLE_TEMPLATES = {
    // Tech Giants (Google, Microsoft, Meta, etc.)
    FAANG: {
        fullTime: [
            { role: "SWE I / L3", level: "Entry" },
            { role: "SWE II / L4", level: "Mid" },
            { role: "SWE III / L5", level: "Senior" },
            { role: "Staff Engineer / L6", level: "Staff" },
            { role: "Senior Staff / L7", level: "Senior Staff" }
        ],
        intern: ["Software Engineering Intern", "STEP Intern", "Research Intern"]
    },

    // Amazon specific
    AMAZON: {
        fullTime: [
            { role: "SDE-1", level: "Entry" },
            { role: "SDE-2", level: "Mid" },
            { role: "SDE-3", level: "Senior" },
            { role: "Principal SDE", level: "Principal" },
            { role: "Senior Principal", level: "Senior Principal" }
        ],
        intern: ["SDE Intern", "Applied Science Intern"]
    },

    // Microsoft specific  
    MICROSOFT: {
        fullTime: [
            { role: "Software Engineer (59)", level: "Entry" },
            { role: "Software Engineer II (60)", level: "Entry+" },
            { role: "Senior SWE (61)", level: "Mid" },
            { role: "Senior SWE (62)", level: "Senior" },
            { role: "Principal SWE (63)", level: "Principal" },
            { role: "Partner / 64+", level: "Partner" }
        ],
        intern: ["Software Engineering Intern", "Explore Intern"]
    },

    // Indian Product Companies
    INDIAN_PRODUCT: {
        fullTime: [
            { role: "SDE-1", level: "Entry" },
            { role: "SDE-2", level: "Mid" },
            { role: "SDE-3 / Senior SDE", level: "Senior" },
            { role: "Lead Engineer", level: "Lead" },
            { role: "Engineering Manager", level: "Manager" }
        ],
        intern: ["Software Developer Intern", "Product Intern"]
    },

    // Startups
    STARTUP: {
        fullTime: [
            { role: "Software Engineer", level: "Entry" },
            { role: "Senior Software Engineer", level: "Senior" },
            { role: "Lead Engineer", level: "Lead" },
            { role: "Engineering Manager", level: "Manager" }
        ],
        intern: ["Engineering Intern", "Full Stack Intern"]
    },

    // Service Companies (TCS, Infosys, etc.)
    SERVICE: {
        fullTime: [
            { role: "Assistant System Engineer", level: "Entry" },
            { role: "System Engineer", level: "Mid" },
            { role: "Senior System Engineer", level: "Senior" },
            { role: "Technical Lead", level: "Lead" },
            { role: "Project Manager", level: "Manager" }
        ],
        intern: ["Intern - Software Development"]
    },

    // Finance/Quant
    FINANCE: {
        fullTime: [
            { role: "Quantitative Researcher", level: "Entry" },
            { role: "Quantitative Developer", level: "Entry" },
            { role: "Senior Quant", level: "Senior" },
            { role: "VP - Quant", level: "VP" }
        ],
        intern: ["Quant Research Intern", "Trading Technology Intern"]
    },

    // PSU/Government
    PSU: {
        fullTime: [
            { role: "GET", level: "Entry" },
            { role: "Engineer", level: "Mid" },
            { role: "Senior Engineer", level: "Senior" },
            { role: "Assistant Manager", level: "Manager" }
        ],
        intern: ["Graduate Engineer Trainee"]
    }
};

export const COMPANY_ROLE_MAPPINGS: Record<string, { template: keyof typeof ROLE_TEMPLATES }> = {
    // Tier 1 - FAANG
    "google-india": { template: "FAANG" },
    "meta-india": { template: "FAANG" },
    "microsoft-india": { template: "MICROSOFT" },
    "amazon-india": { template: "AMAZON" },
    "netflix-india": { template: "FAANG" },
    "apple-india": { template: "FAANG" },

    // Tier 1 - Finance
    "tower-research": { template: "FINANCE" },
    "graviton": { template: "FINANCE" },
    "de-shaw": { template: "FINANCE" },
    "worldquant": { template: "FINANCE" },

    // Tier 2 - Indian Product
    "rubrik-india": { template: "INDIAN_PRODUCT" },
    "atlassian-india": { template: "INDIAN_PRODUCT" },
    "flipkart": { template: "INDIAN_PRODUCT" },
    "phonepe": { template: "INDIAN_PRODUCT" },
    "swiggy": { template: "INDIAN_PRODUCT" },
    "zomato": { template: "INDIAN_PRODUCT" },
    "ola": { template: "INDIAN_PRODUCT" },
    "paytm": { template: "INDIAN_PRODUCT" },
    "meesho": { template: "INDIAN_PRODUCT" },
    "cred": { template: "INDIAN_PRODUCT" },
    "razorpay": { template: "INDIAN_PRODUCT" },
    "zerodha": { template: "INDIAN_PRODUCT" },
    "groww": { template: "INDIAN_PRODUCT" },

    // Tier 2 - Startups
    "postman": { template: "STARTUP" },
    "hashedin": { template: "STARTUP" },
    "dunzo": { template: "STARTUP" },
    "sharechat": { template: "STARTUP" },
    "urban-company": { template: "STARTUP" },

    // Tier 3 - Service
    "tcs": { template: "SERVICE" },
    "infosys": { template: "SERVICE" },
    "wipro": { template: "SERVICE" },
    "hcl": { template: "SERVICE" },
    "cognizant": { template: "SERVICE" },
    "accenture": { template: "SERVICE" },
    "capgemini": { template: "SERVICE" },
    "ltimindtree": { template: "SERVICE" },

    // PSUs
    "ongc": { template: "PSU" },
    "ntpc": { template: "PSU" },
    "bhel": { template: "PSU" },
    "iocl": { template: "PSU" },
    "bharat-petroleum": { template: "PSU" },
    "gail": { template: "PSU" }
};

export function getRolesForCompany(companyId: string) {
    const mapping = COMPANY_ROLE_MAPPINGS[companyId];
    if (!mapping) return ROLE_TEMPLATES.STARTUP; // Default fallback
    return ROLE_TEMPLATES[mapping.template];
}
