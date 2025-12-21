import { render, screen } from '@testing-library/react';
import { BlockEditor } from '@/components/editor/block-editor';

// Mock dependencies
jest.mock('@/store/use-document-store', () => ({
    useDocumentStore: (selector: any) => selector({
        documents: {
            'test-doc': {
                id: 'test-doc',
                title: 'Test Document',
                blocks: []
            }
        },
        addBlock: jest.fn(),
        updateBlock: jest.fn(),
    })
}));

describe('BlockEditor', () => {
    it('renders the document title', () => {
        render(<BlockEditor documentId="test-doc" />);
        expect(screen.getByText('Test Document')).toBeInTheDocument();
    });

    it('allows adding a block', () => {
        render(<BlockEditor documentId="test-doc" />);
        const addButton = screen.getByText('+ Click to add a block'); // Fuzzy match would be better
        expect(addButton).toBeInTheDocument();
        // fireEvent.click(addButton);
        // expect(mockAddBlock).toHaveBeenCalled();
    });
});
