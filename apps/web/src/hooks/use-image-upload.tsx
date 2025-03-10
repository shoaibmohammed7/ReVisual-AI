import { useCallback, useEffect, useRef, useState } from "react";

interface UploadedImage {
    url: string;
    name: string;
}

interface UseMultiImageUploadProps {
    onUpload?: (urls: string[]) => void;
}

export function useMultiImageUpload({ onUpload }: UseMultiImageUploadProps = {}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<UploadedImage[]>([]);

    const handleThumbnailClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files ?? []);

            const newImages: UploadedImage[] = files.map((file) => {
                const url = URL.createObjectURL(file);
                return { url, name: file.name };
            });

            setImages((prev) => {
                const updatedImages = [...prev, ...newImages];
                onUpload?.(updatedImages.map((img) => img.url));
                return updatedImages;
            });
        },
        [onUpload],
    );

    const handleRemove = useCallback((index: number) => {
        setImages((prev) => {
            const updatedImages = prev.filter((_, i) => i !== index);
            updatedImages.forEach((img) => URL.revokeObjectURL(img.url));
            onUpload?.(updatedImages.map((img) => img.url));
            return updatedImages;
        });
    }, [onUpload]);

    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.url));
        };
    }, [images]);

    return {
        images,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    };
}