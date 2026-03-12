function extractUrl(input) {
    if (input.includes('<iframe')) {
        const match = input.match(/src="([^"]+)"/);
        return match ? match[1] : '';
    }
    return input;
}
export { extractUrl };