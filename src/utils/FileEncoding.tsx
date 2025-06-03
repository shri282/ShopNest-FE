export function base64ToFile(base64String: String, filename: String, mimeType: String = 'image/jpeg'): File | null {
    if (!base64String) return null;

    const byteString = atob(base64String as string);
    const byteNumbers = new Array(byteString.length).fill(0).map((_, i) => byteString.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename as string, { type: mimeType as string });
}