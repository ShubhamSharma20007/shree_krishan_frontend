
const ImageContainer = ({ images, className = '' }: { images: string, className: string }) => {
    return (
        <img src={images} className='w-full object-cover rounded-md ' alt=""  />
    )
}

export default ImageContainer