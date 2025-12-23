// Script to automatically add role data to all companies in company-data.ts
// This will read the file, parse companies, add roles based on templates, and write back

const fs = require('fs');
const path = require('path');

const ROLE_TEMPLATES = {
    FAANG: {
        fullTime: [
            { role: "L3 - Software Engineer", level: "Entry" },
            { role: "L4 - Software Engineer II", level: "Mid" },
            { role: "L5 - Senior Software Engineer", level: "Senior" },
            { role: "L6 - Staff Software Engineer", level: "Staff" },
            { role: "L7+ - Senior Staff+", level: "Senior Staff" }
        ],
        intern: ["Software Engineering Intern", "STEP Intern", "Research Intern"]
    },
    AMAZON: {
        fullTime: [
            { role: "SDE-1", level: "Entry" },
            { role: "SDE-2", level: "Mid" },
            { role: "SDE-3", level: "Senior" },
            { role: "Principal SDE", level: "Principal" }
        ],
        intern: ["SDE Intern", "Applied Science Intern"]
    },
    MICROSOFT: {
        fullTime: [
            { role: "Software Engineer (59)", level: "Entry" },
            { role: "Software Engineer II (60)", level: "Entry+" },
            { role: "Senior SWE (61)", level: "Mid" },
            { role: "Senior SWE (62)", level: "Senior" },
            { role: "Principal SWE (63/64)", level: "Principal" }
        ],
        intern: ["Software Engineering Intern", "Explore Intern"]
    },
    INDIAN_PRODUCT: {
        fullTime: [
            { role: "SDE-1", level: "Entry" },
            { role: "SDE-2", level: "Mid" },
            { role: "SDE-3 / Senior SDE", level: "Senior" },
            { role: "Lead Engineer", level: "Lead" }
        ],
        intern: ["Software Developer Intern", "Product Intern"]
    },
    STARTUP: {
        fullTime: [
            { role: "Software Engineer", level: "Entry" },
            { role: "Senior Software Engineer", level: "Senior" },
            { role: "Lead Engineer", level: "Lead" }
        ],
        intern: ["Engineering Intern", "Full Stack Intern"]
    },
    SERVICE: {
        fullTime: [
            { role: "Assistant System Engineer", level: "Trainee" },
            { role: "System Engineer", level: "Entry" },
            { role: "Senior System Engineer", level: "Mid" },
            { role: "Technical Lead", level: "Lead" }
        ],
        intern: ["Intern - Software Development"]
    },
    FINANCE: {
        fullTime: [
            { role: "Quantitative Researcher", level: "Entry" },
            { role: "Quantitative Developer", level: "Entry" },
            { role: "Senior Quant", level: "Senior" }
        ],
        intern: ["Quant Research Intern", "Trading Technology Intern"]
    },
    PSU: {
        fullTime: [
            { role: "Graduate Engineer Trainee (GET)", level: "Trainee" },
            { role: "Engineer", level: "Mid" },
            { role: "Senior Engineer", level: "Senior" }
        ],
        intern: ["Summer Intern"]
    }
};

const COMPANY_TEMPLATES = {
    // Already done
    "google-india": "DONE",

    // FAANG
    "meta-india": "FAANG",
    "netflix-india": "FAANG",
    "apple-india": "FAANG",

    // Amazon/Microsoft get their own
    "amazon": "AMAZON",
    "microsoft-india": "MICROSOFT",

    // Finance
    "tower-research": "FINANCE",
    "graviton": "FINANCE",
    "de-shaw": "FINANCE",
    "worldquant": "FINANCE",
    "goldman-sachs": "FINANCE",
    "morgan-stanley": "FINANCE",
    "optiver": "FINANCE",
    "qube-research": "FINANCE",

    // Indian Product - defaults for most startups
    DEFAULT: "INDIAN_PRODUCT"
};

function getRolesForCompany(companyId, companyType, tier) {
    // Check explicit mapping
    if (COMPANY_TEMPLATES[companyId]) {
        const template = COMPANY_TEMPLATES[companyId];
        if (template === "DONE") return null; // Skip already processed
        return ROLE_TEMPLATES[template];
    }

    // Infer from company attributes
    if (companyType === "Service") return ROLE_TEMPLATES.SERVICE;
    if (companyType === "PSU") return ROLE_TEMPLATES.PSU;
    if (tier === "Tier 1" && companyType === "Product") return ROLE_TEMPLATES.FAANG;
    if (companyType === "Startup") return ROLE_TEMPLATES.STARTUP;

    // Default
    return ROLE_TEMPLATES.INDIAN_PRODUCT;
}

console.log("Role templates ready. Manual application recommended for accuracy.");
console.log("Total templates:", Object.keys(ROLE_TEMPLATES).length);
