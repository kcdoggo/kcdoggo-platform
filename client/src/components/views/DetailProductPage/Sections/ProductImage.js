import React,{useEffect,useState} from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        {/**만약 props.detail.images가 있고, 그 이미지 길이가 1보다 크다면  **/}
        if(props.detail.images && props.detail.images.length > 0){
        let images = [] 

        props.detail.images.map(item => {
            images.push({
                original: `http://localhost:5000/${item}`,
                thumbnail: `http://localhost:5000/${item}`,
                originalHeight: '500px',
                originalWidth:'700px'
            })
        })
        setImages(images)
    }
    },
     [props.detail])

    return (
        <div> 
           <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage
