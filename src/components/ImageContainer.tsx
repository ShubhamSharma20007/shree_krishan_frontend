
const ImageContainer = ({ images }: { images: string }) => {
    return (
        <img src={images} className='w-full object-cover rounded-md ' alt=""  />
    )
}

export default ImageContainer