export const getPosition = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ax = e.clientX - rect.left;
    const ay = e.clientY - rect.top;
    const x = round(((ax / rect.width) * 200) -100);
    const y = round(((ay / rect.height) * 200) -100);
    return {x, y};
};

const round = (value) => Math.max(Math.min(value, 100), -100);