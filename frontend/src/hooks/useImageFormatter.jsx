const useImageFormatter = () => {
    const formatImage = (url) => {
        return url.replace('..\\frontend\\public', '').replace(/\\/g, '/');
    };

    return { formatImage };
};

export default useImageFormatter;