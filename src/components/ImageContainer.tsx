
const ImageContainer = ({ images,srcSet }: { images: string,srcSet:string }) => {
    return (
        <img src={images} className='w-full object-cover rounded-md ' alt="" onError={(e)=>{
            e.currentTarget.onerror = null;
            e.currentTarget.src = srcSet;
        }} />
    )
}

export default ImageContainer