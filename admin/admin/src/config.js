const getImgUrl = (imageName) => {
    const endpoint = 'posts'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
};

export default getImgUrl;