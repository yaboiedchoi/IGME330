export const randomWord = (array) => {
    // pick random word from arrays with 1 random operator
    // math.round can round up or down, which may cause a very 
    // rare out of range exception
    // return array[Math.round(Math.random() * array.length)]
        
    // math.floor will always round down
    return array[Math.floor(Math.random() * array.length)];
}