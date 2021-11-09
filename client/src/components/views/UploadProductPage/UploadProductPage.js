import React,{useState} from 'react'
import axios from 'axios';
import { axiosInstance } from '../herokuConfig';
import Dropzone from 'react-dropzone'
//import {Icon} from 'antd';
import { FaCloudUploadAlt } from "react-icons/fa";

//여기props는 uploadProduct 부모컴포넌트
function FileUpload(props) {

    //백엔드product.js서 fileName,filePath보낼건데, 이걸 먼저 state에 저장
    //이걸, 드롭존 아래에서 map으로images돌면서 이미지 출력할거.
    //여기 Images에 filePath가 저장되있음. 
    const [Images, setImages] = useState([])


    //파일을 백서버 노드에 전달.
    const dropHandler = (files) => {

        //axios는 폼형식으로데이터못보내서,formData만듦
        let formData = new FormData();

        //append로 키:값형식으로추가. formData에 보낼데이터 저장됨.
        formData.append("file",files[0]) 
       
        //어떤데이터형식보내는지서버에알려줘야함.
        const config ={
            header: {'content-type':'multipart/form-data'}
        }
       



        //axios사용해 파일 전달.보낼서버주소,보낼데이터,보낼형식
        axiosInstance.post('/api/product/image',formData,config)
            .then(response=>{//서버에서 정보전달해주는거then(response)으로 받음.
                if(response.data.success){
                    console.log(response.data)

                    //원래 있었던 이미지를 spread연산자 이용해서 넣어줌., response.data새로들어온데이터
                    setImages([...Images,response.data.filePath])

                    //uploadProductPage의 prop를 받아옴.이미지를 부모컴포넌트(업로드프로덕트)에 넘김
                    props.refreshFunction([...Images,response.data.filePath])

                }else{
                    alert('파일 저장 실패')
                }
            }) 
    }

    const deleteHandler = (image) =>{

        //이미지에대한 인덱스 알기위해
        const currentIndex = Images.indexOf(image)
        let newImages = [...Images] //현이미지 다 복사해서 새로운 배열 만들어줌.
        newImages.splice(currentIndex,1);//splice함수로,현재인덱스넘버에서,하나의아이템삭제.
        setImages(newImages)
        
        //삭제했을때도 서버에 알려줘야하니, 부모컴포넌트 prop으로 넘김(uploadProduct)
        props.refreshFunction(newImages)
    
    }


    return (
        <div style={{display:'flex', justifyContent:'space-between' }}>
           <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div 
                    style={{width:300,height:240, border: '1px solid lightgrey',display:'flex', justifyContent:'center',alignItems:'center'   }}
                     {...getRootProps()}>
                        <input {...getInputProps()} />
                        <FaCloudUploadAlt style={{fontSize:'8rem'}}/>
                        {/*<Icon type="plus" style={{fontSize:'3rem'}}/>*/}

                    </div>
            )}
            </Dropzone>
                        {/**dropzone옆 저장된사진 띄우는곳. */}
               <div style={{display:'flex', width:'350px', height:'240px',overflowX:'scroll'}}>
                  
                    {Images.map((image,index)=>(
                        //deleteHandler함수호출후,onClick에 이 함수를 지정해줌,바로 onClick={deleteHandler}해주면,이것의리턴값을onClick에지정함.
                        <div onClick={()=>deleteHandler(image)} key={index}>
                            <img style={{minWidth:'300px', width:'300px',height:'240px' }}
                            src={`http://localhost:5000/${image}`} //노드 index.jsp에서 static파일로 upload지정해줘서 거기있는 사진 출력. 
                            />
                        </div>    
                    ))}


               </div>     

        </div>
    )
}

export default FileUpload
