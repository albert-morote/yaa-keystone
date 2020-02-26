// Helper to remove scripts from our page
const useRemoveScript = (id, parentElement) => {
    const script = document.getElementById(id);
    if (script) {
        parentElement.removeChild(script);
    }
};