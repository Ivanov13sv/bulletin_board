export const getArrImages = (limit) =>{
    let arrImages = [];
    let imageCount = 1;
    for (let i = 1; i <= limit; i++) {
        let newImage = [];
        for (let i = 1; i <= 3; i++) {
            newImage.push(`https://picsum.photos/300/300?random=${imageCount}`);
            imageCount++;
        }
        arrImages.push(newImage);
    }
    return arrImages;
}
