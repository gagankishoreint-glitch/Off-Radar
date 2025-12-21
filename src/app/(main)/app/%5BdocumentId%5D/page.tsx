"use client";

import { BlockEditor } from "@/components/editor/block-editor";
import { useParams } from "next/navigation";

export default function DocumentPage() {
    const params = useParams();
    const documentId = params?.documentId as string;

    return <BlockEditor documentId={documentId} />;
}
