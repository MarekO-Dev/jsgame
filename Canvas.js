export const Setting = {
    w: 800,
    h: 660
};

export const CanvasObject = {
    $1: document.getElementById('c1'),
    $2: document.getElementById('c2'),
    $3: document.getElementById('c3'),
    $4: document.getElementById('c4'),
    $5: document.getElementById('c5')
};

export const Layer = {
    $1: CanvasObject.$1.getContext('2d'),
    $2: CanvasObject.$2.getContext('2d'),
    $3: CanvasObject.$3.getContext('2d'),
    $4: CanvasObject.$4.getContext('2d'),
    $5: CanvasObject.$5.getContext('2d')
};