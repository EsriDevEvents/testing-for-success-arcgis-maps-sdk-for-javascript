export const sendkeys = (element: HTMLInputElement, text: string, timer = 100): Promise<void> => new Promise((resolve) => {
    if (timer < 50) {
        element.value = text;
        return resolve();
    }

    let count = 1;
    const interval = setInterval(() => {
        if (count > text.length) {
            clearInterval(interval);
            resolve();
            return;
        }
        element.value = text.slice(0, count);
        count++;
    }, timer);
})

export const click = (element: HTMLElement): Promise<void> => new Promise((resolve) => {
    element.click();
    resolve();
});