import React from 'react'
import {Card,Row,Col,Carousel} from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                    {props.images.map((image,index)=>(
                        
                        <div key={index}>
                            <img style={{width:'100%', maxHeight:'380px', objectFit:'contain'}} src={`http://localhost:5000/${image}`}/>
                        
                        
                        
                        </div>
                    ))}
                </Carousel>
        </div>
    )
}

export default ImageSlider
