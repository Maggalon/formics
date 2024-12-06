interface Item {
    id: string;
    content: string;
}

export const reorderList = (items: Item[], sourceId: string, targetId: string): Item[] => {
    const result = [...items];
    const sourceIndex = result.findIndex((item) => item.id === sourceId);
    const targetIndex = result.findIndex((item) => item.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
        const [removed] = result.splice(sourceIndex, 1);
        result.splice(targetIndex, 0, removed);
    }

    return result;
};