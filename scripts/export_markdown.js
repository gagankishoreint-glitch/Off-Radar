const fs = require('fs');

// Example blocks data
const sampleData = require('../seed/sample-data.json');

function blocksToMarkdown(blocks) {
    return blocks.map(block => {
        switch (block.type) {
            case 'heading-1': return `# ${block.content}`;
            case 'heading-2': return `## ${block.content}`;
            case 'heading-3': return `### ${block.content}`;
            case 'bullet-list': return `- ${block.content}`;
            case 'numbered-list': return `1. ${block.content}`;
            case 'quote': return `> ${block.content}`;
            case 'code': return `\`\`\`${block.properties?.language || ''}\n${block.content}\n\`\`\``;
            case 'todo': return `- [${block.properties?.checked ? 'x' : ' '}] ${block.content}`;
            case 'divider': return `---`;
            default: return block.content;
        }
    }).join('\n\n');
}

const markdown = blocksToMarkdown(sampleData.pages[0].blocks);
console.log(markdown);

// In a real app, this would be an API route handler.
